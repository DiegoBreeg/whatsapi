import { WhatsAppConnection } from "../entities/WhatsAppConnectionEntity";

export interface WhatsAppConnectionRepository {
    save(socket: WhatsAppConnection): void;
    find(socketId: string): WhatsAppConnection | undefined;
    update(socketId: string, whatsAppConnection: Partial<WhatsAppConnection>): void;
    remove(socketId: string): void;
    getAll(): WhatsAppConnection[];
    exists(socketId: string): boolean;
}