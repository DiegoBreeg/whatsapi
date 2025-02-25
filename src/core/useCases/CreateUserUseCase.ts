import { MySQLConnection } from "../../infrastructure/database/MySQLConnection";
import { MySQLUserRepository } from "../../infrastructure/repositories/MySQLUserRepository";
import { UUIDGeneratorServiceImp } from "../../infrastructure/services/UUIDGeneratorService";
import { UserRepository } from "../repositories/UserRepository";
import { UUIDGeneratorService } from "../services/UUIDGeneratorService";

export type CreateUserInput = { }

export type CreateUserOutput = { }

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly uuidGenerator: UUIDGeneratorService
    ) { }

    execute(params: CreateUserInput = {}): CreateUserOutput {


        return {};
    }
}

const userRepository = new MySQLUserRepository(MySQLConnection.getInstance());
const uuidGenerator = new UUIDGeneratorServiceImp();
const createUser = new CreateUserUseCase(userRepository, uuidGenerator);

createUser.execute();
