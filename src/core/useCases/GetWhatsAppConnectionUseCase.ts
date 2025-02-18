import { CustomError, CustomErrorStatusCodeMessage } from "../errors/CustomError";
import { WhatsAppConnectionRepository } from "../repositories/WhatsAppConnectionRepository";

export class GetWhatsAppConnectionUseCase {
    constructor(
        private readonly whatsAppConnectionRepository: WhatsAppConnectionRepository,
    ) { }

    async execute(socketId: string) {
        const socket = this.whatsAppConnectionRepository.find(socketId);

        if (!socket) {
            throw new CustomError({
                message             : "Connection not found",
                statusCodeMessage   : CustomErrorStatusCodeMessage.NotFound
            });
        }

        return socket;
    }
}