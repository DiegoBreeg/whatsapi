import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { WhatsappConnectionManager } from "../../core/services/WhatsappConnectionManager";
import QRCode from 'qrcode'
import * as qrcode from 'qrcode-terminal'; 

export class WhatsappConnectionManagerBeileys implements WhatsappConnectionManager {

    async connectToWhatsapp(): Promise<void> {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
        const sock = makeWASocket({
            // can provide additional config here
            auth: state,
            printQRInTerminal: true
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