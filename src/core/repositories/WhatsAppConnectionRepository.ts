import { WhatsAppConnection } from "../entities/WhatsAppConnectionEntity";

export interface WhatsAppConnectionRepository {
    save(whatsAppConnection: WhatsAppConnection) : WhatsAppConnection | null;

    find(id: string): WhatsAppConnection | null;

    update(connection: WhatsAppConnection) : WhatsAppConnection | null;

    delete(id: string): boolean;

    findAll() : WhatsAppConnection[];

    exists(id: string): boolean;
}