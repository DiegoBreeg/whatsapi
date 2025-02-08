import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket, ConnectionState } from "@whiskeysockets/baileys";
import pino from 'pino'
import { WhatsAppSocketManagerService } from "../../core/services/WhatsAppSocketManagerService";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';
import { WhatsAppSocketRepository } from "../../core/repositories/WhatsAppSocketRepository";
import { State, WhatsAppSocket } from "../../core/entities/WhatsAppSocket";
export class WhatsappSocketManagerBaileys implements WhatsAppSocketManagerService {
    #whatsAppSocketRepository: WhatsAppSocketRepository

    constructor(whatsAppSocketRepository: WhatsAppSocketRepository) {
        this.#whatsAppSocketRepository = whatsAppSocketRepository;
    }

    async connect(socketId: string): Promise<any | void> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${socketId}/`)
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'warn' })
        });
        const whatsAppSocket = new WhatsAppSocket({
            socketId,
            socket: sock,
            state: State.connecting
        });
        this.#whatsAppSocketRepository.save(whatsAppSocket);
        whatsAppSocket.socket.ev.on('connection.update', async (update) => this.handleConnectionUpdate(socketId, update));
        whatsAppSocket.socket.ev.on('creds.update', saveCreds);
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
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        if (existingSocket) {
            console.log(`[STATE BEFORE] ${existingSocket.state}`)
            existingSocket.state = State.open;
            console.log(`[STATE AFTER] ${existingSocket.state}`)
            this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
        }
    }

    private async handleQRUpdate(socketId: string, qr: string): Promise<void> {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        if (!existingSocket) {
            return;
        }
        if (existingSocket.reconnectionAttempts > 3) {
            console.log(`[ATTEMPTS] ${existingSocket.reconnectionAttempts}`);
            existingSocket.socket.logout();
            return;
        }
        console.log(`[STATE BEFORE] ${existingSocket.state}`)
        existingSocket.qrcode = await QRCode.toDataURL(qr);
        existingSocket.state = State.waitingForQRCodeScan;
        existingSocket.incrementReconnectionAttempts();
        console.log(`[ATTEMPTS] ${existingSocket.reconnectionAttempts}`);
        console.log(`[STATE AFTER] ${existingSocket.state}`)
        this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
    }

    private async handleConnectionClose(socketId: string, disconnectReason: number): Promise<void> {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        console.log(`[REASON] ${disconnectReason}`);
        if (!existingSocket) {
            return;
        }
        if (disconnectReason === DisconnectReason.loggedOut) {
            console.log(`[STATE BEFORE] ${existingSocket.state}`)
            this.#whatsAppSocketRepository.remove(existingSocket.socketId);
            await fs.promises.rm(`./connections/${socketId}`, { recursive: true });
            return;
        } else if (disconnectReason === DisconnectReason.restartRequired) {
            console.log(`[STATE BEFORE] ${existingSocket.state}`)
            this.#whatsAppSocketRepository.remove(existingSocket.socketId);
            await this.connect(socketId);
            return;
        }
        console.log(`[UNCAUGHT REASON] ${disconnectReason}`);
        return;
    }

    async disconnect(socketId: string): Promise<void> {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId);
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