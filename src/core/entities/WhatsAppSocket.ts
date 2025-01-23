import makeWASocket, { DisconnectReason, useMultiFileAuthState, AuthenticationState, WASocket } from "@whiskeysockets/baileys";

export type WhatsAppSocketParams = {
    socketId: string;
    socket: WASocket;
    state: 'open' | 'close' | 'connecting' | 'disconnected' | 'restarting';
    qrcode?: string | undefined;
}

export class WhatsAppSocket {
    #socketId: string;
    #socket: WASocket;
    #state: 'open' | 'close' | 'connecting' | 'disconnected' | 'restarting';
    #qrcode?: string | undefined;

    constructor(whatsAppParams: WhatsAppSocketParams) {
        this.#socketId = whatsAppParams.socketId;
        this.#socket = whatsAppParams.socket;
        this.#state = whatsAppParams.state;
        this.#qrcode = whatsAppParams.qrcode;
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

    set state(value: 'open' | 'close' | 'connecting' | 'disconnected' | 'restarting') {

        if (!['open', 'close', 'connecting', 'disconnected', 'restarting'].includes(value)) {
            throw new Error('Estado inválido para o socket');
        }
        this.#state = value;
    }

    get qrcode(): string | undefined {
        return this.#qrcode
    }

    set qrcode(qrcode: string | undefined) {
        this.#qrcode = qrcode;
    }
}
