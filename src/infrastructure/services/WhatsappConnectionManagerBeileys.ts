import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";
import { WhatsAppConnectionManagerService } from "../../core/services/WhatsAppConnectionManagerService";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';
import { WhatsAppSocketRepository } from "../../core/repositories/WhatsAppSocketRepository";
import { WhatsAppSocket } from "../../core/entities/WhatsAppSocket";

export class WhatsappConnectionManagerBeileys implements WhatsAppConnectionManagerService {
    #whatsAppSocketRepository: WhatsAppSocketRepository

    constructor(whatsAppSocketRepository: WhatsAppSocketRepository) {
        this.#whatsAppSocketRepository = whatsAppSocketRepository;
    }

    async connectToWhatsApp(socketId: string): Promise<any | void> {
        const { state, saveCreds } = await useMultiFileAuthState(`connections/${socketId}/`)
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
        });

        const whatsAppSocket = new WhatsAppSocket({
            socketId,
            socket: sock,
            state: 'connecting' })
        this.#whatsAppSocketRepository.save(whatsAppSocket);

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                const qrCodeDataURL = await QRCode.toDataURL(qr);
                const existingSocket = this.#whatsAppSocketRepository.find(socketId)

                if(existingSocket) {
                    existingSocket.qrcode = qrCodeDataURL;
                    existingSocket.state = 'connecting';
                    this.#whatsAppSocketRepository.update(existingSocket.socketId, existingSocket);
                }
            }

            if (connection === 'close') {
                const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode;

                if (disconnectReason === DisconnectReason.loggedOut) {
                    sock.logout();
                    this.#whatsAppSocketRepository.remove(socketId);
                    fs.rmSync(`./connections/${socketId}`, { recursive: true });
                }

                if (disconnectReason !== DisconnectReason.loggedOut) {
                    await this.connectToWhatsApp(socketId);
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

    }


    disconnect(): void {
        throw new Error("Method not implemented.");
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