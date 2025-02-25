import { HashService } from "../../core/services/HashService";

export class BcryptHashService implements HashService {
    readonly #saltRounds: number;

    constructor(saltRounds: number = 10){ 
        this.#saltRounds = saltRounds;
    }

    hash(password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    verify(password: string, hashedPassword: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}