export enum CustomErrorStatusCodeMessage {
    Badrequest              = "Bad Request",
    Forbidden               = "Forbidden",
    Conflict                = "Conflict",
    NotFound                = "Not Found",
    InternalServerError     = "Internal Server Error"
}

export type CustomErrorParams = {
    message                 : string;
    statusCodeMessage       : CustomErrorStatusCodeMessage;
}

export class CustomError {
    readonly message                : string;
    readonly statusCodeMessage      : CustomErrorStatusCodeMessage;
    readonly statusCode             : number;
    readonly timestamp              : string;


    constructor(customErrorParams: CustomErrorParams) {
        this.message                    = customErrorParams.message
        this.statusCodeMessage          = customErrorParams.statusCodeMessage;
        this.statusCode                 = this.getStatusCode(this.statusCodeMessage);
        this.timestamp                  = new Date().toISOString();
    }

    private getStatusCode(customErrorStatusCodeMessage: CustomErrorStatusCodeMessage) {
        const statusCodeList = {
            "Bad Request"           : 400,
            "Unauthorized"          : 401,
            "Forbidden"             : 403,
            "Conflict"              : 409,
            "Not Found"             : 404,
            "Internal Server Error" : 500
        }

        return statusCodeList[customErrorStatusCodeMessage];
    }
}