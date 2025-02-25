import { MySQLConnection } from "../../infrastructure/database/MySQLConnection";
import { MySQLUserRepository } from "../../infrastructure/repositories/MySQLUserRepository";
import { UuidV7Service } from "../../infrastructure/services/UuidV7Service";
import { UserRepository } from "../repositories/UserRepository";
import { UuidService } from "../services/UuidService";

export type CreateUserInput = { }

export type CreateUserOutput = { }

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly uuidGenerator: UuidService
    ) { }

    execute(params: CreateUserInput = {}): CreateUserOutput {


        return {};
    }
}

const userRepository = new MySQLUserRepository(MySQLConnection.getInstance());
const uuidGenerator = new UuidV7Service();
const createUser = new CreateUserUseCase(userRepository, uuidGenerator);

createUser.execute();
