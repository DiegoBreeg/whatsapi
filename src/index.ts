import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from './core/errors/CustomError';
import { connectToWhatsAppRoutes } from "./infrastructure/routes/ConnectToWhatsAppSocketRoutes";
import { ErrorHandlerMiddleware } from './infrastructure/middlewares/ErrorHandlerMiddleware';

const app = express()
app.use(express.json());

app.use(connectToWhatsAppRoutes);
app.use(ErrorHandlerMiddleware.handle);
app.listen(3000, () => console.log("SERVER ONLINE"));