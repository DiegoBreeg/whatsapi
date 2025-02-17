import { WASocket } from "@whiskeysockets/baileys";

export interface WhatsAppConnectionManagerService {
    connect(socketId: string): Promise<WASocket>;
    disconnect(socketId: string): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}