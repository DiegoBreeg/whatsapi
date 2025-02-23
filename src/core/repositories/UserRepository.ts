import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
    save   (user        : UserEntity)                               : Promise<UserEntity | null>
    find   (id          : string)                                   : Promise<UserEntity | null>
    update (id          : string, user: Partial<UserEntity>)        : Promise<UserEntity | null>
    remove (id          : string)                                   : Promise<boolean>;
    getAll ()                                                       : Promise< UserEntity[]>;
    exists (id          : string)                                   : Promise<boolean>;
}