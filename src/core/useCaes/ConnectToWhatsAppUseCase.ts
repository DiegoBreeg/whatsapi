import { WhatsAppSocket } from "../entities/WhatsAppSocket";
import { WhatsAppSocketRepository } from "../repositories/WhatsAppSocketRepository";
import { WhatsAppSocketManagerService } from "../services/WhatsAppSocketManagerService";

export class ConnectToWhatsAppUseCase {
    constructor(
        private readonly whatsAppSocketRepository: WhatsAppSocketRepository,
        private readonly whatsappSocketManager: WhatsAppSocketManagerService
    ) { }

    async execute(socketId: string) {
        const existingSocket = this.whatsAppSocketRepository.find(socketId);

        if(existingSocket && existingSocket.state === 'open') {
            throw new Error("Already Connected");
        }

        if(existingSocket && existingSocket.state === 'connecting') {
            throw new Error("Check QRCode");
        }

        await this.whatsappSocketManager.connect(socketId);
    }
}