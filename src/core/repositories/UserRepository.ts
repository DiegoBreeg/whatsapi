import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
    save    (user: UserEntity): Promise<UserEntity | null>;

    find    (options: {
        id: string,
        isDeleted?      : boolean,
        isActive?       : boolean,
        ignoreStatus?   : boolean
    })                  : Promise<UserEntity | null>;

    update  (user: UserEntity): Promise<UserEntity | null>;

    delete  (options: {
        userId          : string,
        deletedBy       :string,
        deletedAt       : Date
    })                  : Promise<boolean>;

    findAll (options?: {
        isDeleted?          : boolean,
        isActive?           : boolean,
        ignoreStatus?       : boolean
    })                      : Promise< UserEntity[]>;

    exists  (id: string): Promise<boolean>;
}