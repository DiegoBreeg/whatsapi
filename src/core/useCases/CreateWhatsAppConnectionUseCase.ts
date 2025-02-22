import { State, WhatsAppConnection }                    from "../entities/WhatsAppConnectionEntity";
import { CustomError, CustomErrorStatusCodeMessage }    from "../errors/CustomError";
import { WhatsAppConnectionRepository }                 from "../repositories/WhatsAppConnectionRepository";
import { UUIDGeneratorService }                         from "../services/UUIDGeneratorService";
import { WhatsAppConnectionManagerService }             from "../services/WhatsAppConnectionManagerService";

type CreateWhatsAppConnectionInput = {

}

type CreateWhatsAppConnectionOutput = {
    message                 : string,
    whatsappConnectionId    : string
}

export class CreateWhatsAppConnectionUseCase {
    constructor (
        private readonly whatsAppConnectionRepository   : WhatsAppConnectionRepository,
        private readonly whatsappConnectionManager      : WhatsAppConnectionManagerService,
        private readonly uuidGenerator                  : UUIDGeneratorService
    ) { }

    async execute(socketId: string): Promise<CreateWhatsAppConnectionOutput> {
        const existingSocket = this.whatsAppConnectionRepository.find(socketId);

        if (existingSocket) {
            throw new CustomError({
                message             : "Connection already exists",
                statusCodeMessage   : CustomErrorStatusCodeMessage.Conflict
            });
        }

        const whatsAppConnection = await this.whatsappConnectionManager.connect(socketId);
        
        return {
            message                 : "New whatsApp connection created",
            whatsappConnectionId    : whatsAppConnection.connectionId,
        };
    }
}