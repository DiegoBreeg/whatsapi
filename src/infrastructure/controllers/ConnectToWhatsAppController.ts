import { NextFunction, Request, Response } from "express";
import { ConnectToWhatsAppUseCase } from "../../core/useCases/ConnectToWhatsAppUseCase";

export class ConnectToWhatsAppController {
    constructor(private connecToWhatsAppUseCase: ConnectToWhatsAppUseCase) { }

    public async connect(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const result = await this.connecToWhatsAppUseCase.execute(req.body.socketId);
            /* if (result.qrcode) {
                res.setHeader("Content-Type", "text/html");
                res.send(`<img src="${result.qrcode}" alt="QR Code" />`);
                return
            } */
            res.status(200).json(result);
            return;
        } catch (error) {
            next(error);
        }

    }
}