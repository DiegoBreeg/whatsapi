import { WhatsAppConnection } from "../../core/entities/WhatsAppConnectionEntity";
import { WhatsAppConnectionRepository } from "../../core/repositories/WhatsAppConnectionRepository";

export class InMemoryWhatsAppConnectionRepository implements WhatsAppConnectionRepository {
    private static instance: InMemoryWhatsAppConnectionRepository
    private connections: Map<string, WhatsAppConnection>

    private constructor() {
        this.connections = new Map<string, WhatsAppConnection>();
    }

    public static getInstance(): InMemoryWhatsAppConnectionRepository {
        if (!InMemoryWhatsAppConnectionRepository.instance) {
            InMemoryWhatsAppConnectionRepository.instance = new InMemoryWhatsAppConnectionRepository();
        }
        return InMemoryWhatsAppConnectionRepository.instance;
    }

    public save(connection: WhatsAppConnection): void {
        this.connections.set(connection.connectionId, connection);
    }

    public find(connectionId: string): WhatsAppConnection | undefined {
        return this.connections.get(connectionId) || undefined;
    }

    public update(connectionId: string, whatsAppConnection: Partial<WhatsAppConnection>): void {

        const connection                = this.connections.get(connectionId);
        if (connection) {
            connection.connectionState  = whatsAppConnection.connectionState ?? connection.connectionState;
            connection.connectionQrcode = whatsAppConnection.connectionQrcode ?? connection.connectionQrcode;
            this.connections.set(connectionId, connection);
        }
    }

    public remove(connectionId: string): void {
        this.connections.delete(connectionId);
    }

    public getAll(): WhatsAppConnection[] {
        return Array.from(this.connections.values());
    }

    public exists(connectionId: string): boolean {
        return this.connections.has(connectionId);
    }
}