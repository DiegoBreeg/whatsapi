import { WhatsAppSocket } from "../entities/WhatsAppSocket";

export interface WhatsAppSocketRepository {
    save(socket: WhatsAppSocket): void;
    find(socketId: string): WhatsAppSocket | undefined;
    update(socketId: string, whatsAppSocket: Partial<WhatsAppSocket>): void;
    remove(socketId: string): void;
    getAll(): WhatsAppSocket[];
}