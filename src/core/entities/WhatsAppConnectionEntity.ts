import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export enum State {
    open                    = 'open',
    connecting              = 'connecting',
    waitingForQRCodeScan    = 'waiting for qrcode scan'
}

export type WhatsAppConnectionParams = {
    connectionId            : string;
    connectionSocket        : WASocket;
    connectionState         : State;
    connectionQrcode        ?: string | undefined;
    connectionAttempts      ?: number;
}

export class WhatsAppConnection {
    #connectionId           : string;
    #connectionSocket       : WASocket;
    #connectionState        : State;
    #connectionQrcode       ?: string | undefined;
    #connectionAttempts     : number

    constructor(whatsAppParams: WhatsAppConnectionParams) {
        this.#connectionId              = whatsAppParams.connectionId;
        this.#connectionSocket          = whatsAppParams.connectionSocket;
        this.#connectionState           = whatsAppParams.connectionState;
        this.#connectionQrcode          = whatsAppParams.connectionQrcode;
        this.#connectionAttempts        = whatsAppParams.connectionAttempts ?? 0;
    }

    get connectionId()                      : string {
        return this.#connectionId;
    }

    get connectionSocket()                  : WASocket {
        return this.#connectionSocket;
    }

    get connectionState() {
        return this.#connectionState;
    }

    set connectionState(value               : State) {
        this.#connectionState = value;
    }

    get connectionQrcode()                  : string | undefined {
        return this.#connectionQrcode
    }

    set connectionQrcode(qrcode             : string | undefined) {
        this.#connectionQrcode = qrcode;
    }

    get connectionAttempts() {
        return this.#connectionAttempts;
    }

    getAll() {
        return {
            connectionId            : this.connectionId,
            connectionQrcode        : this.connectionQrcode,
            connectionAttempts      : this.connectionAttempts,
            connectionSocket        : this.connectionSocket,
            connectionState         : this.connectionState,
        }
    }

    incrementConnectionAttempts() {
        this.#connectionAttempts++;
    }

    resetConnectionAttempts() {
        this.#connectionAttempts = 0;
    }


}