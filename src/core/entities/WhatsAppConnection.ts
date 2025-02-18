import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export enum State {
    open                    = 'open',
    connecting              = 'connecting',
    waitingForQRCodeScan    = 'waiting for qrcode scan'
}

export type WhatsAppConnectionParams = {
    connectionId:           string;
    socket:                 WASocket;
    state:                  State;
    qrcode?:                string | undefined;
    reconnectionAttempts?: number;
}

export class WhatsAppConnection {
    #connectionId           : string;
    #socket                 : WASocket;
    #state                  : State;
    #qrcode                 ?: string | undefined;
    #reconnectionAttempts   : number

    constructor(whatsAppParams: WhatsAppConnectionParams) {
        this.#connectionId          = whatsAppParams.connectionId;
        this.#socket                = whatsAppParams.socket;
        this.#state                 = whatsAppParams.state;
        this.#qrcode                = whatsAppParams.qrcode;
        this.#reconnectionAttempts  = whatsAppParams.reconnectionAttempts ?? 0;
    }

    get connectionId(): string {
        return this.#connectionId;
    }

    get socket(): WASocket {
        return this.#socket;
    }

    get state() {
        return this.#state;
    }

    set state(value: State) {
        this.#state = value;
    }

    get qrcode(): string | undefined {
        return this.#qrcode
    }

    set qrcode(qrcode: string | undefined) {
        this.#qrcode = qrcode;
    }

    get reconnectionAttempts() {
        return this.#reconnectionAttempts;
    }

    getAll() {
        return {
            connectionId            : this.#connectionId,
            qrcode                  : this.#qrcode,
            reconnectionAttempts    : this.#reconnectionAttempts,
            socket                  : this.#socket,
            state                   : this.#state,
        }
    }

    incrementReconnectionAttempts() {
        this.#reconnectionAttempts++;
    }

    resetRecconectionAttempts() {
        this.#reconnectionAttempts = 0;
    }


}