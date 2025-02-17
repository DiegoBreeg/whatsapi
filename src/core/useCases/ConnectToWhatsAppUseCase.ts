import { State, WhatsAppConnection } from "../entities/WhatsAppConnection";
import { CustomError, CustomErrorStatusCodeMessage } from "../errors/CustomError";
import { WhatsAppConnectionRepository } from "../repositories/WhatsAppConnectionRepository";
import { UUIDGeneratorService } from "../services/UUIDGeneratorService";
import { WhatsAppConnectionManagerService } from "../services/WhatsAppConnectionManagerService";

export class ConnectToWhatsAppUseCase {
    constructor(
        private readonly whatsAppConnectionRepository: WhatsAppConnectionRepository,
        private readonly whatsappConnectionManager: WhatsAppConnectionManagerService,
        private readonly uuidGenerator: UUIDGeneratorService
    ) { }

    async execute(socketId: string) {
        const existingSocket = this.whatsAppConnectionRepository.find(socketId);

        if (existingSocket) {
            throw new CustomError({
                message: "Connection already exists",
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            });
        }

        await this.whatsappConnectionManager.connect(socketId);
        return { message: "Connection successfull created" };
    }
}