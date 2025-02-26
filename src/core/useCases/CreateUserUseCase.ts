import { MySQLConnection } from "../../infrastructure/database/MySQLConnection";
import { MySQLUserRepository } from "../../infrastructure/repositories/MySQLUserRepository";
import { BcryptHashService } from "../../infrastructure/services/BcryptHashService";
import { UuidV7Service } from "../../infrastructure/services/UuidV7Service";
import { UserRepository } from "../repositories/UserRepository";
import { HashService } from "../services/HashService";
import { UuidService } from "../services/UuidService";

export type CreateUserInput = {
    email: string,
    password: string,
}

export type CreateUserOutput = { }

export class CreateUserUseCase {
    readonly #userRepository: UserRepository;
    readonly #uuidGenerator: UuidService;
    readonly #hashService: HashService;

    constructor(
        userRepository: UserRepository,
        uuidGenerator: UuidService,
        hashService: HashService
    ) {
        this.#userRepository = userRepository;
        this.#uuidGenerator = uuidGenerator;
        this.#hashService = hashService;
    }

    async execute({password}: CreateUserInput): Promise<CreateUserOutput> {

        const isPasswordValid = this.validatePassword(password);
        console.log(isPasswordValid);

        return {};
    }

    private validatePassword(password: string): boolean {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-\.]).{8,}$/;
        return regex.test(password);
    }

    private validateEmail(email: string): boolean {
        const regex = "";
        return false;
    }

}

(async () => {
    const database = await MySQLConnection.getInstance();

    const userRepository = await new MySQLUserRepository(database);
    const uuidGenerator = await new UuidV7Service();
    const hashService = await new BcryptHashService

    const createUser = await new CreateUserUseCase(
        userRepository,
        uuidGenerator,
        hashService
    );

    await createUser.execute({
        email: "diegobreeg@gmail.com",
        password: "diego35264100",
    });

    await database.close();
})()