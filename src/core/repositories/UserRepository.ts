import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
    save   (user        : UserEntity)                                               : Promise<UserEntity | null>
    find   (options     : {id: string, idDeleted?: boolean, isActive?: boolean})    : Promise<UserEntity | null>
    update (user: UserEntity)                                                       : Promise<UserEntity | null>
    delete (id          : string)                                                   : Promise<boolean>;
    getAll ()                                                                       : Promise< UserEntity[]>;
    exists (id          : string)                                                   : Promise<boolean>;
}