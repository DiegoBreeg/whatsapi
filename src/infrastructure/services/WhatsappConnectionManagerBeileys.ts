import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";
import { WhatsappConnectionManager } from "../../core/services/WhatsappConnectionManager";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';

export class WhatsappConnectionManagerBeileys implements WhatsappConnectionManager {

    async connectToWhatsApp(userId: string): Promise<void> {
        const { state, saveCreds } = await useMultiFileAuthState(`auth_info_baileys_${userId}`);
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
        });
        
        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                const qrCodeBase64 = await QRCode.toDataURL(qr);
                console.log(`QR Code para usuário ${userId}:`, qrCodeBase64);
            }

            if (connection === "close") {
                const reason = (lastDisconnect?.error as Boom)?.output?.statusCode;
                console.log(`Conexão encerrada para usuário ${userId}. Motivo:`, DisconnectReason[reason] || reason);

                if (reason === DisconnectReason.loggedOut) {
                    console.log(`Logout detectado para usuário ${userId}. Limpando dados de autenticação...`);
                    this.disconnect(userId);
                    return;
                }

                const shouldReconnect = reason !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    console.log(`Reconectando para usuário ${userId}...`);
                    await this.connectToWhatsApp(userId);
                }
            } else if (connection === "open") {
                console.log(`Conexão estabelecida com sucesso para usuário ${userId}.`);
            }
        });

        sock.ev.on("creds.update", saveCreds);
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