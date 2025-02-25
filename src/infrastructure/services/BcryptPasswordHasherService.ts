import { PasswordHasher } from "../../core/services/PasswordHasherService";

export class BcryptPasswordHasherService implements PasswordHasher {
    readonly #saltRounds: number;

    constructor(saltRounds: number = 10){ 
        this.#saltRounds = saltRounds;
    }

    hashPassword(password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}