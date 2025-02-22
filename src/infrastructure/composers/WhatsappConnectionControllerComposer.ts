import { CreateWhatsAppConnectionUseCase }              from "../../core/useCases/CreateWhatsAppConnectionUseCase";
import { WhatsAppConnectionController }                 from "../controllers/WhatsAppConnectionController";
import { InMemoryWhatsAppConnectionRepository }         from "../repositories/InMemoryWhatsAppConnectionRepository";
import { UUIDGeneratorServiceImp }                      from "../services/UUIDGeneratorServiceImp";
import { WhatsappConnectionManagerBaileys }             from "../services/WhatsappConnectionManagerBaileys";

export class WhatsappConnectionControllerComposer {

    static compose(): WhatsAppConnectionController {

        const inMemoryWhatsAppConnectionRepository      = InMemoryWhatsAppConnectionRepository.getInstance();
        const whatsappConnectionManager                 = new WhatsappConnectionManagerBaileys(inMemoryWhatsAppConnectionRepository);
        const uuidGenerator                             = new UUIDGeneratorServiceImp();

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