export interface WhatsappConnectionManager {
    connectToWhatsapp(): void;
    disconnect(): void;
    registerEventListeners(): void;
    sendMessage(): void;
}