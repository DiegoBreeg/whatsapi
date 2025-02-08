import { ConnectToWhatsAppUseCase } from "../../core/useCaes/ConnectToWhatsAppUseCase";
import { ConnectToWhatsAppController } from "../controllers/ConnectToWhatsAppController";
import { InMemoryWhatsAppSocketRepository } from "../repositories/InMemoryWhatsAppSocketRepository";
import { UUIDGeneratorServiceImp } from "../services/UUIDGeneratorServiceImp";
import { WhatsappSocketManagerBaileys } from "../services/WhatsappSocketManagerBaileys";

export class ConnectToWhatsAppComposer {

    static createConnectToWhatsAppController(): ConnectToWhatsAppController {

        const uuidGenerator = new UUIDGeneratorServiceImp();
        const inMemoryWhatsAppSocketRepository = InMemoryWhatsAppSocketRepository.getInstance();
        const whatsappSocketManager = new WhatsappSocketManagerBaileys(inMemoryWhatsAppSocketRepository);

        const connectToWhatsAppUseCase = new ConnectToWhatsAppUseCase(
            inMemoryWhatsAppSocketRepository,
            whatsappSocketManager,
            uuidGenerator
        );
        return new ConnectToWhatsAppController(connectToWhatsAppUseCase);
    }
}