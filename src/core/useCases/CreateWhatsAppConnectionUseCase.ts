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
        private readonly whatsappSocketManager       : WhatsAppSocketManagerService,
        private readonly uuidGenerator                  : UUIDGeneratorService
    ) { }

    async execute(connectionId: string): Promise<CreateWhatsAppConnectionOutput> {
        const alreadyExists = this.whatsAppConnectionRepository.exists(connectionId);
        if (alreadyExists) {
            throw new CustomError({
                message             : "Connection already exists",
                statusCodeMessage   : CustomErrorStatusCodeMessage.Conflict
            });
        }

        const socket = await this.whatsappSocketManager.createSocket(connectionId);
        const whatsAppConnection = new WhatsAppConnection({
            id          : connectionId,
            socket,
            userId      : '123'
        });

        this.whatsAppConnectionRepository.save(whatsAppConnection);

        return {
            message                 : "New whatsApp connection created",
            whatsAppConnection      : whatsAppConnection.getAll(),
        };
    }
}