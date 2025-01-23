import { WASocket } from "@whiskeysockets/baileys";

export interface WhatsAppSocketManagerService {
    connect(socketId: string): Promise<WASocket>;
    disconnect(socket: WASocket): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}