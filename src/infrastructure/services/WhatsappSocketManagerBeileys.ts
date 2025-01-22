import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";
import { WhatsAppSocketManagerService } from "../../core/services/WhatsAppSocketManagerService";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';
import { WhatsAppSocketRepository } from "../../core/repositories/WhatsAppSocketRepository";
import { WhatsAppSocket } from "../../core/entities/WhatsAppSocket";

export class WhatsappSocketManagerBeileys implements WhatsAppSocketManagerService {
    #whatsAppSocketRepository: WhatsAppSocketRepository

    constructor(whatsAppSocketRepository: WhatsAppSocketRepository) {
        this.#whatsAppSocketRepository = whatsAppSocketRepository;
    }

    async connect(socketId: string): Promise<any | void> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${socketId}/`)
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
        });

        const whatsAppSocket = new WhatsAppSocket({
            socketId,
            socket: sock,
            state: 'connecting'
        })
        this.#whatsAppSocketRepository.save(whatsAppSocket);

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (connection === 'open') {
                const existingSocket = this.#whatsAppSocketRepository.find(socketId)

                if (existingSocket) {
                    existingSocket.state = 'open';
                    this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
                    return;
                }
            }

            if (qr) {
                const qrCodeDataURL = await QRCode.toDataURL(qr);
                const existingSocket = this.#whatsAppSocketRepository.find(socketId)

                if (existingSocket) {
                    existingSocket.qrcode = qrCodeDataURL;
                    existingSocket.state = 'connecting';
                    this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
                    return;
                }
            }

            if (connection === 'close') {
                const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;

                if (disconnectReason === DisconnectReason.loggedOut) {
                    this.disconnect(socketId);
                }

                if (disconnectReason !== DisconnectReason.loggedOut) {
                    await this.connect(socketId);
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

    }

    disconnect(socketId: string): void {
        const existingSocket = this.#whatsAppSocketRepository.find(socketId)
        if (existingSocket) {
            existingSocket.socket.logout();
            this.#whatsAppSocketRepository.remove(existingSocket.socketId);
            fs.rmSync(`./connections/${socketId}`, { recursive: true });
        }
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