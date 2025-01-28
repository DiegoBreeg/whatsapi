import { State, WhatsAppSocket } from "../entities/WhatsAppSocket";
import { CustomError, CustomErrorStatusCodeMessage } from "../errors/CustomError";
import { WhatsAppSocketRepository } from "../repositories/WhatsAppSocketRepository";
import { WhatsAppSocketManagerService } from "../services/WhatsAppSocketManagerService";

export class ConnectToWhatsAppUseCase {
    constructor(
        private readonly whatsAppSocketRepository: WhatsAppSocketRepository,
        private readonly whatsappSocketManager: WhatsAppSocketManagerService
    ) { }

    async execute(socketId: string) {

        this.validate(socketId);
        await this.whatsappSocketManager.connect(socketId);
    }

    private validate(socketId: string) {
        const existingSocket = this.whatsAppSocketRepository.find(socketId);
        if (!existingSocket) {
            return;
        }
        const errorMessages = {
            [State.open]: 'Connection Already Open',
            [State.waitingForQRCodeScan]: 'Wanting For QRCode Scan',
            [State.connecting]: 'Connection ALready Connecting'
        }

        throw new CustomError({
            message: errorMessages[existingSocket.state],
            statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
        })
    }
}