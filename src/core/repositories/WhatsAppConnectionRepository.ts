import { WhatsAppConnection } from "../entities/WhatsAppConnectionEntity";

export interface WhatsAppConnectionRepository {
    save  (whatsAppConnection  : WhatsAppConnection)                                      : void;
    find  (connectionId        : string)                                                  : WhatsAppConnection | undefined;
    update(connectionId        : string, whatsAppConnection: Partial<WhatsAppConnection>) : void;
    remove(connectionId        : string)                                                  : void;
    getAll()                                                                              : WhatsAppConnection[];
    exists(connectionId        : string)                                                  : boolean;
}