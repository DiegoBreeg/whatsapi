import { ConnectToWhatsAppUseCase } from "./core/useCaes/ConnectToWhatsAppUseCase";
import { InMemoryWhatsAppSocketRepository } from "./infrastructure/repositories/InMemoryWhatsAppSocketRepository";
import { WhatsappSocketManagerBeileys } from "./infrastructure/services/WhatsappSocketManagerBeileys";
import express from 'express';


const app = express()

app.use(express.json());



(async () => {
    app.post('/', async (req, res) => {
        const { socketId } = req.body

        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const wam = new WhatsappSocketManagerBeileys(repository)
        const connectToWhatsAppUseCase = new ConnectToWhatsAppUseCase(repository, wam)
        

        await connectToWhatsAppUseCase.execute(socketId)
        res.status(200).send("OK");
    })

    app.get('/', async (req, res) => {

        const { socketId } = req.query
        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const socket = repository.find(socketId as string)

        res.status(200).send(`<img src="${socket?.qrcode}">`);
    })

    app.get('/sockets', async (req, res) => {
        
        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const sockets = repository.getAll()
        console.log()

        res.status(200).send(sockets);
    })
})()

app.listen(3000, () => console.log("SERVER ONLINE"))