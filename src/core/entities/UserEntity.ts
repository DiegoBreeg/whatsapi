export type UserEntityParams = {
    id                  : string;
    email               : string;
    hashedPassword      : string;
    createdAt           : Date;
    updatedAt           : Date;
    deletedAt           : Date;
    updatedBy           : string;
};

export class UserEntity {
    #id                 : string;
    #email              : string;
    #hashedPassword     : string;
    #createdAt          : Date;
    #updatedAt          : Date;
    #deletedAt          : Date;
    #updatedBy          : string;

    constructor (userParams: UserEntityParams) {
    this.#id                = userParams.id;
    this.#email             = userParams.email;
    this.#hashedPassword    = userParams.hashedPassword;
    this.#createdAt         = userParams.createdAt;
    this.#updatedAt         = userParams.updatedAt;
    this.#deletedAt         = userParams.deletedAt;
    this.#updatedBy         = userParams.updatedBy;
    }

    get id             ()                       : string {
        return this.#id;
    }

    get email           ()                      : string {
        return this.#email;
    }

    get hashedPassword ()                       : string {
        return this.#hashedPassword;
    }

    set hashedPassword (hashedPassword          : string) {
        this.#hashedPassword = hashedPassword;
    }

    get createdAt      ()                       : Date {
        return this.#createdAt;
    }

    get updatedAt      ()                       : Date {
        return this.#updatedAt;
    }

    get deletedAt      ()                       : Date {
        return this.#deletedAt;
    }
};