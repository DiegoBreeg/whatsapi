import { WhatsAppConnection } from "../../core/entities/WhatsAppConnection";
import { WhatsAppConnectionRepository } from "../../core/repositories/WhatsAppConnectionRepository";

export class InMemoryWhatsAppConnectionRepository implements WhatsAppConnectionRepository {
    private static instance: InMemoryWhatsAppConnectionRepository
    private sockets: Map<string, WhatsAppConnection>

    private constructor() {
        this.sockets = new Map<string, WhatsAppConnection>();
    }

    public static getInstance(): InMemoryWhatsAppConnectionRepository {
        if (!InMemoryWhatsAppConnectionRepository.instance) {
            InMemoryWhatsAppConnectionRepository.instance = new InMemoryWhatsAppConnectionRepository();
        }
        return InMemoryWhatsAppConnectionRepository.instance;
    }

    public save(socket: WhatsAppConnection): void {
        this.sockets.set(socket.socketId, socket);
    }

    public find(socketId: string): WhatsAppConnection | undefined {
        return this.sockets.get(socketId) || undefined;
    }

    public update(socketId: string, whatsAppConnection: Partial<WhatsAppConnection>): void {
        const socket = this.sockets.get(socketId);
        if (socket) {
            socket.state = whatsAppConnection.state ?? socket.state;
            socket.qrcode = whatsAppConnection.qrcode ?? socket.qrcode;
            this.sockets.set(socketId, socket);
        }
    }

    public remove(socketId: string): void {
        this.sockets.delete(socketId);
    }

    public getAll(): WhatsAppConnection[] {
        return Array.from(this.sockets.values());
    }

    public exists(socketId: string): boolean {
        return this.sockets.has(socketId);
    }
}