import { WhatsAppConnection }                       from "../../core/entities/WhatsAppConnectionEntity";
import { WhatsAppConnectionRepository }             from "../../core/repositories/WhatsAppConnectionRepository";

export class InMemoryWhatsAppConnectionRepository implements WhatsAppConnectionRepository {
    private static instance         : InMemoryWhatsAppConnectionRepository
    private connections             : Map<string, WhatsAppConnection>

    private constructor() {
        this.connections = new Map<string, WhatsAppConnection>();
    }

    public static getInstance(): InMemoryWhatsAppConnectionRepository {
        if (!InMemoryWhatsAppConnectionRepository.instance) {
            InMemoryWhatsAppConnectionRepository.instance = new InMemoryWhatsAppConnectionRepository();
        }
        return InMemoryWhatsAppConnectionRepository.instance;
    }

    public save(connection: WhatsAppConnection): WhatsAppConnection | null {
        this.connections.set(connection.id, connection);
        return connection;
    }

    public find(id: string): WhatsAppConnection | null {
        return this.connections.get(id) || null;
    }

    public update(connection: WhatsAppConnection): WhatsAppConnection | null {
        this.connections.set(connection.id, connection);
        return connection;
    }

    public delete(connectionId: string): boolean {
        return this.connections.delete(connectionId);
    }

    public findAll(): WhatsAppConnection[] {
        return Array.from(this.connections.values());
    }

    public exists(connectionId: string): boolean {
        return this.connections.has(connectionId);
    }
}