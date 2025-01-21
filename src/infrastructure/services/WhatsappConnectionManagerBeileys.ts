import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";
import { WhatsappConnectionManager } from "../../core/services/WhatsappConnectionManager";
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import fs from 'fs';

export class WhatsappConnectionManagerBeileys implements WhatsappConnectionManager {

    async connectToWhatsApp(): Promise<void> {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: true
        })

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update
            console.log(update);
            if(connection === 'close') {
                const disconnectReason = (lastDisconnect?.error as Boom)?.output?.statusCode
                console.log(`[disconnectReason] ${disconnectReason}`)

                if(disconnectReason !== DisconnectReason.loggedOut) {
                    this.connectToWhatsApp()
                }
            } else if(connection === 'open') {
                console.log('opened connection')
            }
        })

        sock.ev.on('messages.upsert', event => {
            event.messages.forEach(message => {
                console.log(message.message?.conversation)
                sock.ws.close();

            })
        })

        sock.ev.on('creds.update', saveCreds)
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