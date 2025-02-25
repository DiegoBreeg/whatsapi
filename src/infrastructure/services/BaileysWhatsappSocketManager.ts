import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket, ConnectionState }     from "@whiskeysockets/baileys";
import pino                                                                                     from 'pino'
import { WhatsAppSocketManagerService }                                                         from "../../core/services/WhatsAppSocketManagerService";
import { Boom }                                                                                 from '@hapi/boom';
import QRCode                                                                                   from 'qrcode';
import fs                                                                                       from 'fs';
import { WhatsAppConnectionRepository }                                                         from "../../core/repositories/WhatsAppConnectionRepository";
import { State, WhatsAppConnection }                                                            from "../../core/entities/WhatsAppConnectionEntity";

export class BaileysWhatsappSocketManager implements WhatsAppSocketManagerService {
    #whatsAppConnectionRepository: WhatsAppConnectionRepository

    constructor(whatsAppConnectionRepository: WhatsAppConnectionRepository) {
        this.#whatsAppConnectionRepository = whatsAppConnectionRepository;
    }

    async createSocket(connectionId: string): Promise<WASocket> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${connectionId}/`);

        const sock = makeWASocket({
            auth                    : state,
            printQRInTerminal       : false,
            logger                  : pino({ level: 'warn' })
        });

        sock.ev.on('connection.update', async (update) => this.handleConnectionUpdate(connectionId, update));
        sock.ev.on('creds.update', saveCreds);

        return sock;
    }

    private async handleConnectionUpdate(connectionId: string, update: Partial<ConnectionState>): Promise<void> {
        console.log(`[CONNECTION.UPDATE]: Event occurred`);
        console.log(update);

        const {
            connection,
            lastDisconnect,
            isNewLogin,
            qr,
            receivedPendingNotifications,
            isOnline
        } = update;

        const whatsAppConnection = this.#whatsAppConnectionRepository.find(connectionId);

        if(!whatsAppConnection) {
            console.log(`[CONNECTION.UPDATE]: Connection not found ${connectionId}`);
            return;
        }

        if (connection === "connecting") {
            this.handleConnectionConnecting(whatsAppConnection);
        }

        if (qr) {
            await this.handleQRUpdate(whatsAppConnection, qr);
        }

        if (connection === 'close') {
            const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;
            await this.handleConnectionClose(whatsAppConnection, disconnectReason);
        }

        if (connection === "open") {
            await this.handleConnectionOpen(whatsAppConnection);
        }
    }

    private async handleConnectionConnecting(whatsAppConnection: WhatsAppConnection): Promise<void> {
        console.log(`[CONNECTING]: Connection type connecting`);
        whatsAppConnection.updatedAt    = new Date();
        whatsAppConnection.state        = State.connecting;
        this.#whatsAppConnectionRepository.save(whatsAppConnection);
    }
    
    private async handleQRUpdate(whatsAppConnection: WhatsAppConnection, qr: string): Promise<void> {
        console.log(`[QR]: An qr ccurred!`);

        if (whatsAppConnection.attempts >= 3) {
            whatsAppConnection.socket.logout();
            return;
        }

        whatsAppConnection.incrementAttempts();
        whatsAppConnection.updatedAt    = new Date();
        whatsAppConnection.qrCode       = await QRCode.toDataURL(qr);
        whatsAppConnection.state        = State.waitingForQRCodeScan;

        this.#whatsAppConnectionRepository.update(whatsAppConnection);
        return ;
    }

    private async handleConnectionOpen(whatsAppConnection: WhatsAppConnection): Promise<void> {
        console.log(`[OPEN]: Connection type open`);

        whatsAppConnection.updatedAt        = new Date();
        whatsAppConnection.state            = State.open;
        this.#whatsAppConnectionRepository.update(whatsAppConnection);
    }


    private async handleConnectionClose(whatsAppConnection: WhatsAppConnection, disconnectReason: number): Promise<void> {
        console.log(`[CLOSE]: Connection type close`);
        console.log(`[REASON] ${disconnectReason}`);

        if (disconnectReason === DisconnectReason.loggedOut) {
            this.#whatsAppConnectionRepository.delete(whatsAppConnection.id);
            await fs.promises.rm(`./connections/${whatsAppConnection.id}`, { recursive: true });
        }

        if (disconnectReason === DisconnectReason.restartRequired) {
            whatsAppConnection.updatedAt        = new Date();
            whatsAppConnection.socket           = await this.createSocket(whatsAppConnection.id);
            whatsAppConnection.qrCode           = null;
            whatsAppConnection.resetAttempts();
            this.#whatsAppConnectionRepository.save(whatsAppConnection);
        }

        if(![DisconnectReason.loggedOut, DisconnectReason.restartRequired].includes(disconnectReason)) {
            console.log(`[UNCAUGHT REASON] ${disconnectReason}`);
        }
        return;
    }

    async disconnect(connectionId: string): Promise<void> {
        const connection = this.#whatsAppConnectionRepository.find(connectionId);
        if (!connection) {
            return;
        }
        connection.socket.logout();
    }

    registerEventListeners(): void {
        throw new Error("Method not implemented.");
    }

    sendMessage(): void {
        throw new Error("Method not implemented.");
    }

    removeAllListeners(): void {
        throw new Error("Method not implemented.");
    }
}