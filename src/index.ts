import { WhatsappConnectionManagerBeileys } from "./infrastructure/services/WhatsappConnectionManagerBeileys"

const waManager = new WhatsappConnectionManagerBeileys();

waManager.connectToWhatsapp();