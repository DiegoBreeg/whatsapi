import { mysqlConnectionPool } from "../../infra/database/MysqlConnectionPool.js";
import { MysqlUserRepository } from "../../infra/repositories/MysqlUserRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";

export class TestUseCase
{
    constructor(private readonly userRepository: UserRepository) { }

    public execute()
    {

        this.userRepository.findById('35');
    }
}


const mysqlUserRepository = new MysqlUserRepository(mysqlConnectionPool);
const testeUseCase = new TestUseCase(mysqlUserRepository);
testeUseCase.execute();