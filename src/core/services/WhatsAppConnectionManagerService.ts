import { WASocket } from "@whiskeysockets/baileys";
import { WhatsAppConnection } from "../entities/WhatsAppConnection";

export interface WhatsAppConnectionManagerService {
    connect(connectionId: string): Promise<WhatsAppConnection>;
    disconnect(connectionId: string): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}