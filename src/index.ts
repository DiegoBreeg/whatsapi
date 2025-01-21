import { InMemoryWhatsAppSocketRepository } from "./infrastructure/repositories/InMemoryWhatsAppSocketRepository";
import { WhatsappConnectionManagerBeileys } from "./infrastructure/services/WhatsappConnectionManagerBeileys";
import express from 'express';


const app = express()

app.use(express.json());



(async () => {
    app.post('/', async (req, res) => {
        const { socketId } = req.body
        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const wa = new WhatsappConnectionManagerBeileys(repository)

        await wa.connectToWhatsApp(socketId);
        res.status(200).send("OK");
    })

    app.get('/', async (req, res) => {

        const { socketId } = req.query
        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const socket = repository.find(socketId as string)

        res.status(200).send(`<img src="${socket?.qrcode}">`);
    })
})()

app.listen(3000, () => console.log("SERVER ONLINE"))