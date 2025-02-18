import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
    save   (user     : UserEntity)                           : void;
    find   (userId   : string)                               : Promise<UserEntity>;
    update (userId   : string, user: Partial<UserEntity>)    : void;
    remove (userId   : string)                               : void;
    getAll ()                                                : UserEntity[];
    exists (userId   : string)                               : boolean;
}