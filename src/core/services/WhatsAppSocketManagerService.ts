import { WASocket } from "@whiskeysockets/baileys";
import { WhatsAppConnection } from "../entities/WhatsAppConnectionEntity";

export interface WhatsAppSocketManagerService {
    createSocket(connectionId: string)      : Promise<WASocket>;
    disconnect(connectionId: string)        : void;
    registerEventListeners()                : void;
    removeAllListeners()                    : void;
    sendMessage()                           : void;
}