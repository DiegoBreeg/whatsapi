import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket, ConnectionState }     from "@whiskeysockets/baileys";
import pino                                                                                     from 'pino'
import { WhatsAppSocketManagerService }                                                        from "../../core/services/WhatsAppSocketManagerService";
import { Boom }                                                                                 from '@hapi/boom';
import QRCode                                                                                   from 'qrcode';
import fs                                                                                       from 'fs';
import { WhatsAppConnectionRepository }                                                         from "../../core/repositories/WhatsAppConnectionRepository";
import { State, WhatsAppConnection }                                                            from "../../core/entities/WhatsAppConnectionEntity";

export class WhatsappSocketManagerBaileys implements WhatsAppSocketManagerService {
    #whatsAppConnectionRepository: WhatsAppConnectionRepository

    constructor(whatsAppConnectionRepository: WhatsAppConnectionRepository) {
        this.#whatsAppConnectionRepository = whatsAppConnectionRepository;
    }

    async createSocket(connectionId: string): Promise<WASocket> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${connectionId}/`)

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
        const { connection, lastDisconnect, qr } = update;
        if (connection === 'open') {
            console.log(`[OPEN]: ${connection}, `);
            await this.handleConnectionOpen(connectionId);
        } else if (qr) {
            console.log(`[QR]: ${qr}`);
            await this.handleQRUpdate(connectionId, qr);
        } else if (connection === 'close') {
            console.log(`[CLOSE]: ${connection}`);
            const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;
            await this.handleConnectionClose(connectionId, disconnectReason);
        }
    }

    private async handleConnectionOpen(connectionId: string): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(connectionId)
        if (socket) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            socket.state = State.open;
            console.log(`[STATE AFTER] ${socket.state}`)
            this.#whatsAppConnectionRepository.update(socket.id, socket);
        }
    }

    private async handleQRUpdate(connectionId: string, qr: string): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(connectionId)
        if (!socket) {
            return;
        }
        if (socket.attempts >= 3) {
            socket.socket.logout();
            return;
        }
        console.log(`[STATE BEFORE] ${socket.state}`)
        socket.qrCode = await QRCode.toDataURL(qr);
        socket.state = State.waitingForQRCodeScan;
        socket.incrementAttempts();
        console.log(`[ATTEMPTS] ${socket.attempts}`);
        console.log(`[STATE AFTER] ${socket.state}`)
        this.#whatsAppConnectionRepository.update(socket.id, socket);
    }

    private async handleConnectionClose(connectionId: string, disconnectReason: number): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(connectionId)
        console.log(`[REASON] ${disconnectReason}`);
        if (!socket) {
            return;
        }
        if (disconnectReason === DisconnectReason.loggedOut) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            this.#whatsAppConnectionRepository.remove(socket.id);
            await fs.promises.rm(`./connections/${connectionId}`, { recursive: true });
            return;
        } else if (disconnectReason === DisconnectReason.restartRequired) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            this.#whatsAppConnectionRepository.remove(socket.id);
            await this.createSocket(connectionId);
            return;
        }
        console.log(`[UNCAUGHT REASON] ${disconnectReason}`);
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