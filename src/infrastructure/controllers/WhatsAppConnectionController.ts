import { NextFunction, Request, Response }          from "express";
import { CreateWhatsAppConnectionUseCase }                 from "../../core/useCases/CreateWhatsAppConnectionUseCase";

export class WhatsAppConnectionController {
    constructor(
        private readonly createWhatsAppConnectionUseCase: CreateWhatsAppConnectionUseCase
    ) { };

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.createWhatsAppConnectionUseCase.execute(req.body.socketId);

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