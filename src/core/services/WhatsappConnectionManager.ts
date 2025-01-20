export interface WhatsappConnectionManager {
    connectToWhatsapp(): void;
    disconnect(): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}