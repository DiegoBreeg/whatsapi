export type UserEntityParams = {
    id                  : string;
    email               : string;
    hashedPassword      : string;

    createdBy           : string;
    createdAt           : Date;

    updatedBy           : string;
    updatedAt           : Date;

    deletedBy           : string;
    deletedAt           : Date;
    isDeleted           : boolean;
};

export class UserEntity {
    #id                 : string;
    #email              : string;
    #hashedPassword     : string;

    #createdBy          : string;
    #createdAt          : Date;

    #updatedBy          : string;
    #updatedAt          : Date;

    #deletedBy          : string;
    #deletedAt          : Date;
    #isDeleted          : boolean;

    constructor (userParams: UserEntityParams) {
    this.#id                = userParams.id;
    this.#email             = userParams.email;
    this.#hashedPassword    = userParams.hashedPassword;

    this.#createdBy         = userParams.createdBy;
    this.#createdAt         = userParams.createdAt;

    this.#updatedBy         = userParams.updatedBy;
    this.#updatedAt         = userParams.updatedAt;

    this.#deletedBy         = userParams.deletedBy;
    this.#deletedAt         = userParams.deletedAt;
    this.#isDeleted         = userParams.isDeleted;
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

    get createdBy      ()                       : string {
        return this.#createdBy;
    }

    set createdBy (createdBy                     : string) {
        this.#createdBy = createdBy;
    }

    get createdAt      ()                       : Date {
        return this.#createdAt;
    }

    get updatedBy      ()                       : string {
        return this.#updatedBy;
    }

    set updatedBy (updatedBy                     : string) {
        this.#updatedBy = updatedBy;
    }

    get updatedAt      ()                       : Date {
        return this.#updatedAt;
    }

    get deletedBy ()                            : string {
        return this.#deletedBy;
    }

    set deletedBy (deletedBy                    : string) {
        this.deletedBy = deletedBy;
    }

    get deletedAt      ()                       : Date {
        return this.#deletedAt;
    }

    set deletedAt (deletedAt                    : Date) {
        this.#deletedAt = deletedAt;
    }

    get isDeleted ()                            : boolean {
        return this.#isDeleted;
    }

    set isDeleted (isDeleted                    : boolean) {
        this.#isDeleted = isDeleted;
    }
};