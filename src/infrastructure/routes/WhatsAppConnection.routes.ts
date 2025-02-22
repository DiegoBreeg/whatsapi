import { Router, Request, Response } from "express";
import { WhatsappConnectionControllerComposer } from "../composers/WhatsappConnectionControllerComposer";

export const whatsappConnectionRoutes = Router();

const whatsAppConnectionController = WhatsappConnectionControllerComposer.compose();
whatsappConnectionRoutes.post("/", (req, res, next) => whatsAppConnectionController.create(req, res, next));