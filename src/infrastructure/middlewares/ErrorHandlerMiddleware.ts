import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../core/errors/CustomError";

export class ErrorHandlerMiddleware {
    static handle(error: CustomError, req: Request, res: Response, next: NextFunction) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json(error);
        } else {
            res.status(500).json({
                message: "An unexpected error occurred.",
                timestamp: new Date().toISOString(),
            });
        }
    }
}