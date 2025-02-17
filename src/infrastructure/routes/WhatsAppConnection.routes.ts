import { Router, Request, Response } from "express";
import { ConnectToWhatsAppComposer } from "../composers/ConnectToWhatsAppComposer";

export const whatsappConnectionRoutes = Router();

const connectToWhatsAppController = ConnectToWhatsAppComposer.createConnectToWhatsAppController();
whatsappConnectionRoutes.post("/", (req, res, next) => connectToWhatsAppController.handle(req, res, next));