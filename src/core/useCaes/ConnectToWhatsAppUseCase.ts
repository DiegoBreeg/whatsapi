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
        const errorMessages: Record<Partial<State>, string> = {
            [State.open]: 'Connection Already Open',
            [State.waitingForQRCodeScan]: 'Waiting For QRCode Scan'
        };
        if(!existingSocket) {
            throw new CustomError({
                message: 'Connection not Found',
                statusCodeMessage: CustomErrorStatusCodeMessage.Badrequest
            })
        }
        const errorMessage = errorMessages[existingSocket.state];

        if (existingSocket && existingSocket.state === State.open) {
            throw new CustomError({
                message: 'Connection Already Open',
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            })
        }
        if (existingSocket && existingSocket.state === State.waitingForQRCodeScan) {
            throw new CustomError({
                message: 'Waiting For QRCode Scan',
                statusCodeMessage: CustomErrorStatusCodeMessage.Conflict
            })
        }
    }
}