import { State, WhatsAppSocket } from "../entities/WhatsAppSocket";
import { CustomError, CustomErrorStatusCodeMessage } from "../errors/CustomError";
import { WhatsAppSocketRepository } from "../repositories/WhatsAppSocketRepository";
import { UUIDGeneratorService } from "../services/UUIDGeneratorService";
import { WhatsAppSocketManagerService } from "../services/WhatsAppSocketManagerService";

export class ConnectToWhatsAppUseCase {
    constructor(
        private readonly whatsAppSocketRepository: WhatsAppSocketRepository,
        private readonly whatsappSocketManager: WhatsAppSocketManagerService,
        private readonly uuidGenerator: UUIDGeneratorService
    ) { }

    async execute(socketId: string) {
        const existingSocket = this.whatsAppSocketRepository.find(socketId);

        if (existingSocket) {
            throw new CustomError({
                message: "Connection already exists",
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            });
        }

        await this.whatsappSocketManager.connect(socketId);
        return { message: "Connection successfull created" };
    }
}