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

        if (!existingSocket) {
            await this.whatsappSocketManager.connect(socketId);
            return { message: "Generating qrcode, reload to get qrcode" };
        }

        if (existingSocket.state === State.waitingForQRCodeScan) {
            return {
                message: "Scan the QRCODE",
                qrcode: existingSocket.qrcode
            };
        }

        const errorMessages = {
            [State.open]: 'Connection Already Open',
            [State.connecting]: 'Connection Already Connecting'
        };

        throw new CustomError({
            message: errorMessages[existingSocket.state],
            statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
        });
    }
}