import { CreateWhatsAppConnectionUseCase }              from "../../core/useCases/CreateWhatsAppConnectionUseCase";
import { WhatsAppConnectionController }                 from "../controllers/WhatsAppConnectionController";
import { InMemoryWhatsAppConnectionRepository }         from "../repositories/InMemoryWhatsAppConnectionRepository";
import { UuidV7Service }                                from "../services/UuidV7Service";
import { BaileysWhatsappSocketManagerService }          from "../services/BaileysWhatsappSocketManagerService";

export class WhatsappConnectionControllerComposer {

    static compose(): WhatsAppConnectionController {

        const inMemoryWhatsAppConnectionRepository      = InMemoryWhatsAppConnectionRepository.getInstance();
        const whatsappConnectionManager                 = new BaileysWhatsappSocketManagerService(inMemoryWhatsAppConnectionRepository);
        const uuidGenerator                             = new UuidV7Service();

        const createWhatsAppConnectionUseCase           = new CreateWhatsAppConnectionUseCase(
            inMemoryWhatsAppConnectionRepository,
            whatsappConnectionManager,
            uuidGenerator
        );
        return new WhatsAppConnectionController(
            createWhatsAppConnectionUseCase
        );
    }
}