import { ConnectToWhatsAppUseCase } from "../../core/useCases/ConnectToWhatsAppUseCase";
import { ConnectToWhatsAppController } from "../controllers/ConnectToWhatsAppController";
import { InMemoryWhatsAppConnectionRepository } from "../repositories/InMemoryWhatsAppConnectionRepository";
import { UUIDGeneratorServiceImp } from "../services/UUIDGeneratorServiceImp";
import { WhatsappConnectionManagerBaileys } from "../services/WhatsappConnectionManagerBaileys";

export class ConnectToWhatsAppComposer {

    static createConnectToWhatsAppController(): ConnectToWhatsAppController {

        const uuidGenerator = new UUIDGeneratorServiceImp();
        const inMemoryWhatsAppConnectionRepository = InMemoryWhatsAppConnectionRepository.getInstance();
        const whatsappConnectionManager = new WhatsappConnectionManagerBaileys(inMemoryWhatsAppConnectionRepository);

        const connectToWhatsAppUseCase = new ConnectToWhatsAppUseCase(
            inMemoryWhatsAppConnectionRepository,
            whatsappConnectionManager,
            uuidGenerator
        );
        return new ConnectToWhatsAppController(connectToWhatsAppUseCase);
    }
}