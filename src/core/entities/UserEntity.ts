export type UserEntityParams = {
    userId             : string;
    userName           : string;
    userHashedPassword : string;
    userCreatedAt      : Date;
};

export class UserEntity {
    #userId             : string;
    #userName           : string;
    #userHashedPassword : string;
    #userCreatedAt      : Date;

    constructor (userParams: UserEntityParams) {
    this.#userId             = userParams.userId;
    this.#userName           = userParams.userName;
    this.#userHashedPassword = userParams.userHashedPassword;
    this.#userCreatedAt      = userParams.userCreatedAt;
    }

    get userId (): string {
        return this.#userId;
    }

    get userName (): string {
        return this.#userName;
    }

    get userHashedPassword (): string {
        return this.#userHashedPassword;
    }

    set userHashedPassword (userHashedPassword) {
        this.#userHashedPassword = userHashedPassword;
    }

    get userCreatedAt (): Date {
        return this.#userCreatedAt;
    }
};