import { State, WhatsAppConnection }                    from "../entities/WhatsAppConnectionEntity";
import { CustomError, CustomErrorStatusCodeMessage }    from "../errors/CustomError";
import { WhatsAppConnectionRepository }                 from "../repositories/WhatsAppConnectionRepository";
import { UUIDGeneratorService }                         from "../services/UUIDGeneratorService";
import { WhatsAppSocketManagerService }                 from "../services/WhatsAppSocketManagerService";

type CreateWhatsAppConnectionInput = {

}

type CreateWhatsAppConnectionOutput = {
    message                 : string,
    whatsAppConnection      : Partial<WhatsAppConnection>;
}

export class CreateWhatsAppConnectionUseCase {
    constructor (
        private readonly whatsAppConnectionRepository   : WhatsAppConnectionRepository,
        private readonly whatsappSocketManager          : WhatsAppSocketManagerService,
        private readonly uuidGenerator                  : UUIDGeneratorService
    ) { }

    async execute(params: string): Promise<CreateWhatsAppConnectionOutput> {
        const connectionId = this.uuidGenerator.generate();

        const alreadyExists = this.whatsAppConnectionRepository.exists(connectionId);
        if (alreadyExists) {
            throw new CustomError({
                message             : "Connection already exists",
                statusCodeMessage   : CustomErrorStatusCodeMessage.Conflict
            });
        }

        const socket = await this.whatsappSocketManager.createSocket(connectionId);
        const whatsAppConnection = new WhatsAppConnection({
           id: connectionId,
           socket,
           userId: this.uuidGenerator.generate()
        });

        const isSaved = this.whatsAppConnectionRepository.save(whatsAppConnection);
        if (!isSaved) {
            throw new CustomError({
                message             : "Error when trying to save connection to repository",
                statusCodeMessage   : CustomErrorStatusCodeMessage.InternalServerError
            });
        }

        return {
            message: "New whatsApp connection created",
            whatsAppConnection
        };
    }
}