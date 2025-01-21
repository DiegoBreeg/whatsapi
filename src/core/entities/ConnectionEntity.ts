export type ConnectionParams = {
    connectionId: string
    createdAt: Date;
    lastConnection: Date;
}

export class ConnectionEntity {
    #connectionId: string
    #createdAt: Date;
    #lastConnection: Date;

    constructor(connectionParams: ConnectionParams) {
        this.#connectionId = connectionParams.connectionId;
        this.#createdAt = connectionParams.createdAt;
        this.#lastConnection = connectionParams.lastConnection;
    }

    get connectionId() {
        return this.#connectionId;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get lastConnection() {
        return this.#lastConnection;
    }

    set lastConnection(lastConnection: Date) {
        this.#lastConnection = lastConnection;
    }
}