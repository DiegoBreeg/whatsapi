import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket, ConnectionState } from "@whiskeysockets/baileys";
import pino from 'pino'
import { WhatsAppConnectionManagerService } from "../../core/services/WhatsAppConnectionManagerService";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';
import { WhatsAppConnectionRepository } from "../../core/repositories/WhatsAppConnectionRepository";
import { State, WhatsAppConnection } from "../../core/entities/WhatsAppConnection";
export class WhatsappConnectionManagerBaileys implements WhatsAppConnectionManagerService {
    #whatsAppConnectionRepository: WhatsAppConnectionRepository

    constructor(whatsAppConnectionRepository: WhatsAppConnectionRepository) {
        this.#whatsAppConnectionRepository = whatsAppConnectionRepository;
    }

    async connect(socketId: string): Promise<any | void> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${socketId}/`)
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'warn' })
        });
        const whatsAppConnection = new WhatsAppConnection({
            socketId,
            socket: sock,
            state: State.connecting
        });
        this.#whatsAppConnectionRepository.save(whatsAppConnection);
        whatsAppConnection.socket.ev.on('connection.update', async (update) => this.handleConnectionUpdate(socketId, update));
        whatsAppConnection.socket.ev.on('creds.update', saveCreds);
    }

    private async handleConnectionUpdate(socketId: string, update: Partial<ConnectionState>): Promise<void> {
        const { connection, lastDisconnect, qr } = update;
        if (connection === 'open') {
            console.log(`[OPEN]: ${connection}, `);
            await this.handleConnectionOpen(socketId);
        } else if (qr) {
            console.log(`[QR]: ${connection}`);
            await this.handleQRUpdate(socketId, qr);
        } else if (connection === 'close') {
            console.log(`[CLOSE]: ${connection}`);
            const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;
            await this.handleConnectionClose(socketId, disconnectReason);
        }
    }

    private async handleConnectionOpen(socketId: string): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(socketId)
        if (socket) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            socket.state = State.open;
            console.log(`[STATE AFTER] ${socket.state}`)
            this.#whatsAppConnectionRepository.update(socket.socketId, socket);
        }
    }

    private async handleQRUpdate(socketId: string, qr: string): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(socketId)
        if (!socket) {
            return;
        }
        if (socket.reconnectionAttempts >= 3) {
            console.log(`[ATTEMPTS] ${socket.reconnectionAttempts}`);
            socket.socket.logout();
            return;
        }
        console.log(`[STATE BEFORE] ${socket.state}`)
        socket.qrcode = await QRCode.toDataURL(qr);
        socket.state = State.waitingForQRCodeScan;
        socket.incrementReconnectionAttempts();
        console.log(`[ATTEMPTS] ${socket.reconnectionAttempts}`);
        console.log(`[STATE AFTER] ${socket.state}`)
        this.#whatsAppConnectionRepository.update(socket.socketId, socket);
    }

    private async handleConnectionClose(socketId: string, disconnectReason: number): Promise<void> {
        const socket = this.#whatsAppConnectionRepository.find(socketId)
        console.log(`[REASON] ${disconnectReason}`);
        if (!socket) {
            return;
        }
        if (disconnectReason === DisconnectReason.loggedOut) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            this.#whatsAppConnectionRepository.remove(socket.socketId);
            await fs.promises.rm(`./connections/${socketId}`, { recursive: true });
            return;
        } else if (disconnectReason === DisconnectReason.restartRequired) {
            console.log(`[STATE BEFORE] ${socket.state}`)
            this.#whatsAppConnectionRepository.remove(socket.socketId);
            await this.connect(socketId);
            return;
        }
        console.log(`[UNCAUGHT REASON] ${disconnectReason}`);
        return;
    }

    async disconnect(socketId: string): Promise<void> {
        const existingSocket = this.#whatsAppConnectionRepository.find(socketId);
        if (!existingSocket) {
            return;
        }
        existingSocket.socket.logout();
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