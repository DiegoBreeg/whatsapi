import { UUIDGenerator } from '../../core/services/UUIDGenerator.js';
import { v7 as uuidv7 } from 'uuid';

export class UUIDAdapter implements UUIDGenerator
{
    public generate()
    {
        return uuidv7();
    }    
}