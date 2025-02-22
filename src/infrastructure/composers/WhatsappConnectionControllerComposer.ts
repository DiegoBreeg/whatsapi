import { CreateWhatsAppConnectionUseCase }              from "../../core/useCases/CreateWhatsAppConnectionUseCase";
import { WhatsAppConnectionController }                 from "../controllers/WhatsAppConnectionController";
import { InMemoryWhatsAppConnectionRepository }         from "../repositories/InMemoryWhatsAppConnectionRepository";
import { UUIDGeneratorServiceImp }                      from "../services/UUIDGeneratorServiceImp";
import { WhatsappSocketManagerBaileys }                  from "../services/WhatsappSocketManagerBaileys";

export class WhatsappConnectionControllerComposer {

    static compose(): WhatsAppConnectionController {

        const inMemoryWhatsAppConnectionRepository      = InMemoryWhatsAppConnectionRepository.getInstance();
        const whatsappConnectionManager                 = new WhatsappSocketManagerBaileys(inMemoryWhatsAppConnectionRepository);
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