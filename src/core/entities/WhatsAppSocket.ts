import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export enum State {
    open = 'open',
    connecting = 'connecting',
    waitingForQRCodeScan = 'waiting for qr code scan'
}

export type WhatsAppSocketParams = {
    socketId: string;
    socket: WASocket;
    state: State;
    qrcode?: string | undefined;
    reconnectionAttempts?: number;
}

export class WhatsAppSocket {
    #socketId: string;
    #socket: WASocket;
    #state: State;
    #qrcode?: string | undefined;
    #reconnectionAttempts: number

    constructor(whatsAppParams: WhatsAppSocketParams) {
        this.#socketId = whatsAppParams.socketId;
        this.#socket = whatsAppParams.socket;
        this.#state = whatsAppParams.state;
        this.#qrcode = whatsAppParams.qrcode;
        this.#reconnectionAttempts = whatsAppParams.reconnectionAttempts ?? 0;
    }

    get socketId(): string {
        return this.#socketId;
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

    incrementReconnectionAttempts() {
        this.#reconnectionAttempts++;
    }

    resetRecconectionAttempts() {
        this.#reconnectionAttempts = 0;
    }

    get reconnectionAttempts() {
        return this.#reconnectionAttempts;
    }
}