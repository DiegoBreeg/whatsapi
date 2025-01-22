import { WhatsAppSocket } from "../../core/entities/WhatsAppSocket";
import { WhatsAppSocketRepository } from "../../core/repositories/WhatsAppSocketRepository";

export class InMemoryWhatsAppSocketRepository implements WhatsAppSocketRepository {
    private static instance: InMemoryWhatsAppSocketRepository
    private sockets: Map<string, WhatsAppSocket>

    private constructor() {
        this.sockets = new Map<string, WhatsAppSocket>();
    }

    public static getInstance(): InMemoryWhatsAppSocketRepository {

        if (!InMemoryWhatsAppSocketRepository.instance) {
            InMemoryWhatsAppSocketRepository.instance = new InMemoryWhatsAppSocketRepository();
        }
        return InMemoryWhatsAppSocketRepository.instance;
    }

    public save(socket: WhatsAppSocket): void {
        this.sockets.set(socket.socketId, socket);
    }

    public find(socketId: string): WhatsAppSocket | undefined {
        return this.sockets.get(socketId) || undefined;
    }

    public update(socketId: string, whatsAppSocket: Partial<WhatsAppSocket>): void {

        const existingSocket = this.sockets.get(socketId);

        if (existingSocket) {

            existingSocket.state = whatsAppSocket.state? whatsAppSocket.state: existingSocket.state;
            existingSocket.qrcode = whatsAppSocket.qrcode? whatsAppSocket.qrcode: existingSocket.qrcode;
            this.sockets.set(socketId, existingSocket);
        }
    }

    public remove(socketId: string): void {
        this.sockets.delete(socketId);
    }

    public getAll(): WhatsAppSocket[] {
        return Array.from(this.sockets.values());
    }

    public async exists(socketId: string): Promise<boolean> {
        return this.sockets.has(socketId);
    }
}