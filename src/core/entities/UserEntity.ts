export type UserEntityParams = {
    id                  : string;
    email               : string;
    hashedPassword      : string;

    createdBy           : string;
    createdAt           : Date;

    updatedBy?           : string   | null;
    updatedAt?           : Date     | null;

    deletedBy?           : string   | null;
    deletedAt?           : Date     | null;
    isDeleted?           : boolean;
    isActive?            : boolean;
};

export class UserEntity {
    readonly #id                 : string;
    readonly #email              : string;
    #hashedPassword              : string;

    readonly #createdBy          : string;
    readonly #createdAt          : Date;

    #updatedBy                   : string    | null;
    #updatedAt                   : Date      | null;

    #deletedBy                   : string    | null;
    #deletedAt                   : Date      | null;
    #isDeleted                   : boolean;
    #isActive                    : boolean;

    constructor (userParams: UserEntityParams) {
    this.#id                = userParams.id;
    this.#email             = userParams.email;
    this.#hashedPassword    = userParams.hashedPassword;

    this.#createdBy         = userParams.createdBy;
    this.#createdAt         = userParams.createdAt;

    this.#updatedBy         = userParams.updatedBy ?? null;
    this.#updatedAt         = userParams.updatedAt ?? null;

    this.#deletedBy         = userParams.deletedBy ?? null;
    this.#deletedAt         = userParams.deletedAt ?? null;
    this.#isDeleted         = userParams.isDeleted ?? false;
    this.#isActive          = userParams.isActive  ?? true;
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

    get createdAt      ()                       : Date {
        return new Date(this.#createdAt);
    }

    get updatedBy      ()                       : string | null {
        return this.#updatedBy;
    }

    set updatedBy (updatedBy                     : string | null) {
        this.#updatedBy = updatedBy;
    }

    get updatedAt      ()                       : Date | null {
        return this.#updatedAt? new Date(this.#updatedAt): null;
    }

    set updatedAt (updatedAt                    : Date | null) {
        this.#updatedAt = updatedAt;
    }

    get deletedBy ()                            : string | null {
        return this.#deletedBy;
    }

    set deletedBy (deletedBy                    : string | null) {
        this.#deletedBy = deletedBy;
    }

    get deletedAt      ()                       : Date | null {
        return this.#deletedAt? new Date(this.#deletedAt): null;
    }

    set deletedAt (deletedAt                    : Date | null) {
        this.#deletedAt = deletedAt;
    }

    get isDeleted ()                            : boolean {
        return this.#isDeleted;
    }

    set isDeleted (isDeleted                    : boolean) {
        this.#isDeleted = isDeleted;
    }

    get isActive ()                             : boolean {
        return this.#isActive;
    }

    set isActive (isActive                      : boolean) {
        this.#isActive = isActive;
    }
};