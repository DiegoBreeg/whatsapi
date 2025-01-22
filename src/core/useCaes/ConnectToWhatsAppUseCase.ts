import { WhatsAppSocket } from "../entities/WhatsAppSocket";
import { CustomError, CustomErrorStatusCodeMessage } from "../errors/CustomError";
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
            throw new CustomError({
                message: 'Connection Already Open',
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            })
        }

        if(existingSocket && existingSocket.state === 'connecting') {
            throw new CustomError({
                message: 'Scan QRCode',
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            })
        }

        await this.whatsappSocketManager.connect(socketId);
    }
}