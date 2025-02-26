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

    execute(params: CreateUserInput): CreateUserOutput {


        return {};
    }
}

const userRepository = new MySQLUserRepository(MySQLConnection.getInstance());
const uuidGenerator = new UuidV7Service();
const hashService = new BcryptHashService

const createUser = new CreateUserUseCase(
    userRepository,
    uuidGenerator,
    hashService
);

createUser.execute({
    email: "diegobreeg@gmail.com",
    password: "35264100",
});
