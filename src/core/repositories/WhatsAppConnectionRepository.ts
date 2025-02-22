import { WhatsAppConnection } from "../entities/WhatsAppConnectionEntity";

export interface WhatsAppConnectionRepository {
    save  (whatsAppConnection  : WhatsAppConnection)                            : WhatsAppConnection | null;
    find  (id        : string)                                                  : WhatsAppConnection | null;
    update(id        : string, whatsAppConnection: Partial<WhatsAppConnection>) : WhatsAppConnection | null;
    remove(id        : string)                                                  : boolean;
    getAll()                                                                    : WhatsAppConnection[];
    exists(id        : string)                                                  : boolean;
}