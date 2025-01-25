import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket, ConnectionState } from "@whiskeysockets/baileys";
import pino from 'pino'
import { WhatsAppSocketManagerService } from "../../core/services/WhatsAppSocketManagerService";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';
import { WhatsAppSocketRepository } from "../../core/repositories/WhatsAppSocketRepository";
import { WhatsAppSocket } from "../../core/entities/WhatsAppSocket";

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
            state: 'connecting'
        })
        this.#whatsAppSocketRepository.save(whatsAppSocket);

        whatsAppSocket.socket.ev.on('connection.update', async (update) => this.handleConnectionUpdate(socketId, update));
        whatsAppSocket.socket.ev.on('creds.update', saveCreds);
    }

    private async handleConnectionUpdate(socketId: string, update: Partial<ConnectionState>): Promise<void> {
        const { connection, lastDisconnect, qr } = update;

        if (connection === 'open') {
            await this.handleConnectionOpen(socketId);
        } else if (qr) {
            await this.handleQRUpdate(socketId, qr);
        } else if (connection === 'close') {
            const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;
            await this.handleConnectionClose(socketId, disconnectReason);
        }
    }

    private async handleConnectionOpen(socketId: string): Promise<void> {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        if (existingSocket) {
            existingSocket.state = 'open';
            this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
        }
    }

    private async handleQRUpdate(socketId: string, qr: string): Promise<void> {
        const qrCodeDataURL = await QRCode.toDataURL(qr);
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        if (existingSocket) {
            existingSocket.qrcode = qrCodeDataURL;
            existingSocket.state = 'connecting';
            this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
        }
    }

    private async handleConnectionClose(socketId: string, disconnectReason: number): Promise<void> {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)

        if (disconnectReason === DisconnectReason.loggedOut && existingSocket) {
            this.#whatsAppSocketRepository.remove(existingSocket.socketId);
            await fs.promises.rm(`./connections/${socketId}`, { recursive: true });
        } else if (disconnectReason === DisconnectReason.restartRequired && existingSocket) {
            this.#whatsAppSocketRepository.remove(existingSocket.socketId);
            await this.connect(socketId);
        } else if (!([DisconnectReason.loggedOut, DisconnectReason.restartRequired ].includes(disconnectReason)) && existingSocket) {
            this.#whatsAppSocketRepository.remove(existingSocket.socketId)
            await this.connect(socketId);
        }
    }

    async disconnect(socket: WASocket): Promise<void> {
        socket.end(undefined);
        socket.ws.removeAllListeners();
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