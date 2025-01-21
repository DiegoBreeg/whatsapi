export interface WhatsappConnectionManager {
    connectToWhatsApp(userId: string): void;
    disconnect(): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}