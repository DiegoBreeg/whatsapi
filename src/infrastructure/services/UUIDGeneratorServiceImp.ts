import { UUIDGeneratorService } from "../../core/services/UUIDGeneratorService";
import { v7 as uuidv7 } from 'uuid';

export class UUIDGeneratorServiceImp implements UUIDGeneratorService {

    constructor(){}
    
    public generate(){
        return uuidv7();
    }
}