import { UuidService }             from "../../core/services/UuidService";
import { v7 as uuidv7 }                     from 'uuid';

export class UuidV7Service implements UuidService {

    constructor(){}
    
    public generate(): string{
        return uuidv7();
    }
}