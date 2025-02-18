import { Router }                           from "express";
import { whatsappConnectionRoutes }         from "./WhatsAppConnection.routes";

export const routes = Router();
routes.use("/whatsapp-connections", whatsappConnectionRoutes);