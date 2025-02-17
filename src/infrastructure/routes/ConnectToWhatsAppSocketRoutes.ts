import { Router, Request, Response } from "express";
import { ConnectToWhatsAppComposer } from "../composers/ConnectToWhatsAppComposer";

export const connectToWhatsAppRoutes = Router();
const endpoint = '/connections';

const connectToWhatsAppController = ConnectToWhatsAppComposer.createConnectToWhatsAppController();
connectToWhatsAppRoutes.post(endpoint, (req, res, next) => connectToWhatsAppController.connect(req, res, next));