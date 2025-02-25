import { HashService } from "../../core/services/HashService";
import bcrypt from "bcrypt"

export class BcryptHashService implements HashService {
    readonly #saltRounds: number;

    constructor(saltRounds: number = 10){ 
        this.#saltRounds = saltRounds;
    }

    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.#saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

}