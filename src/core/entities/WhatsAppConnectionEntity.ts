import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export enum State {
    open                    = 'open',
    connecting              = 'connecting',
    waitingForQRCodeScan    = 'waiting for qrcode scan'
}

export type WhatsAppConnectionParams = {
    id            : string;
    socket        : WASocket;
    userId        : string;
}

export class WhatsAppConnection {
    #id             : string;
    #socket         : WASocket;
    #userId         : string;
    #state          : State;
    #qrCode         : string | null;
    #attempts       : number;
    #createdAt      : Date;
    #updatedAt      : Date | null;
    

    constructor(whatsAppParams: WhatsAppConnectionParams) {
        this.#id              = whatsAppParams.id;
        this.#socket          = whatsAppParams.socket;
        this.#userId          = whatsAppParams.userId;
        this.#state           = State.connecting;
        this.#qrCode          = null;
        this.#attempts        = 0;
        this.#createdAt       = new Date();
        this.#updatedAt       = null;
    }

    get id()                      : string {
        return this.#id;
    }

    get socket()                  : WASocket {
        return this.#socket;
    }

    get userId()                   : string {
        return this.#userId
    }

    get state()                     : State {
        return this.#state;
    }

    set state(value               : State) {
        this.#state = value;
    }

    get qrCode()                  : string | null {
        return this.#qrCode
    }

    set qrCode(qrcode             : string | null) {
        this.#qrCode = qrcode;
    }

    get attempts()                 : number {
        return this.#attempts;
    }

    get createdAt ()                : Date {
        return this.#createdAt;
    }

    get updatedAt () : Date | null {
        return this.#updatedAt ?? null;
    }

    set updatedAt (updatedAt: Date) {
        this.#updatedAt = updatedAt;
    }

    getAll() {
        return {
            id              : this.id,
            userId          : this.userId,
            state           : this.state,
            qrCode          : this.qrCode,
            attempts        : this.attempts,
            createdAt       : this.createdAt,
            updatedAt       : this.updatedAt
        }
    }

    incrementAttempts() {
        this.#attempts++;
    }

    resetAttempts() {
        this.#attempts = 0;
    }
}