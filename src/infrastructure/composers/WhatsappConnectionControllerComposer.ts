import { CreateWhatsAppConnectionUseCase }              from "../../core/useCases/CreateWhatsAppConnectionUseCase";
import { WhatsAppConnectionController }                 from "../controllers/WhatsAppConnectionController";
import { InMemoryWhatsAppConnectionRepository }         from "../repositories/InMemoryWhatsAppConnectionRepository";
import { UUIDGeneratorServiceImp }                      from "../services/UUIDGeneratorService";
import { BaileysWhatsappSocketManager }                  from "../services/BaileysWhatsappSocketManager";

export class WhatsappConnectionControllerComposer {

    static compose(): WhatsAppConnectionController {

        const inMemoryWhatsAppConnectionRepository      = InMemoryWhatsAppConnectionRepository.getInstance();
        const whatsappConnectionManager                 = new BaileysWhatsappSocketManager(inMemoryWhatsAppConnectionRepository);
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