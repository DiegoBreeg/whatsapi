import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export enum State {
    open                    = 'open',
    connecting              = 'connecting',
    waitingForQRCodeScan    = 'waiting for qrcode scan'
}

export type WhatsAppConnectionParams = {
    id              : string;
    socket          : WASocket;
    userId          : string;
    state?          : State;
    qrCode?         : string | null;
    attempts?       : number;
    createdAt?      : Date;
    updatedAt?      : Date | null;

}

export class WhatsAppConnection {
    readonly #id            : string;
    readonly #socket        : WASocket;
    readonly #userId        : string;
    #state                  : State;
    #qrCode                 : string | null;
    #attempts               : number;
    #createdAt              : Date;
    #updatedAt              : Date | null;
    

    constructor(whatsAppParams: WhatsAppConnectionParams) {
        this.#id              = whatsAppParams.id;
        this.#socket          = whatsAppParams.socket;
        this.#userId          = whatsAppParams.userId;
        this.#state           = whatsAppParams.state        ?? State.connecting;
        this.#qrCode          = whatsAppParams.qrCode       ?? null;
        this.#attempts        = whatsAppParams.attempts     ?? 0;
        this.#createdAt       = whatsAppParams.createdAt    ?? new Date();
        this.#updatedAt       = whatsAppParams.updatedAt    ?? null;
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

    incrementAttempts() {
        this.#attempts++;
    }

    resetAttempts() {
        this.#attempts = 0;
    }
}