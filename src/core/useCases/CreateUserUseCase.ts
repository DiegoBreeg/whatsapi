import { User } from "../entities/User.js";
import { UUIDGenerator } from "../interfaces/UUIDGenerator.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly uuidGenerator: UUIDGenerator
    ) {}

    public execute ()
    {
       const userProps = 
    }
}