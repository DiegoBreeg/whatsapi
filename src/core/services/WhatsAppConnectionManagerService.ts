export interface WhatsAppConnectionManagerService {
    connectToWhatsApp(connectionId: string): Promise<string | void>;
    disconnect(): void;
    registerEventListeners(): void;
    removeAllListeners(): void;
    sendMessage(): void;
}