import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from './core/errors/CustomError';
import { connectToWhatsAppRoutes } from "./infrastructure/routes/ConnectToWhatsAppSocketRoutes";

const app = express()

app.use(express.json());

app.use(connectToWhatsAppRoutes)

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json(error);
    } else {
        res.status(500).json({
            message: error || "An unexpected error occurred. Please try again later.",
            timestamp: new Date().toISOString(),
        })
    }
})

app.listen(3000, () => console.log("SERVER ONLINE"))