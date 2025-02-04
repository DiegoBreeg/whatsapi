import { CustomError } from "./core/errors/CustomError";
import { ConnectToWhatsAppUseCase } from "./core/useCaes/ConnectToWhatsAppUseCase";
import { InMemoryWhatsAppSocketRepository } from "./infrastructure/repositories/InMemoryWhatsAppSocketRepository";
import { WhatsappSocketManagerBaileys } from "./infrastructure/services/WhatsappSocketManagerBaileys";
import express from 'express';


const app = express()

app.use(express.json());



(async () => {
    app.post('/', async (req, res) => {

        try {
            const { socketId } = req.body

            const repository = InMemoryWhatsAppSocketRepository.getInstance()
            const wam = new WhatsappSocketManagerBaileys(repository)
            const connectToWhatsAppUseCase = new ConnectToWhatsAppUseCase(repository, wam)
            await connectToWhatsAppUseCase.execute(socketId)

            res.status(200).send("OK");
        } catch (error) {
            if (error instanceof CustomError) {

                res.status(error.statusCode).json(error);
            } else {

                res.status(500).json({
                    message: error || "An unexpected error occurred. Please try again later.",
                    timestamp: new Date().toISOString(),
                })
            }
        }



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
        console.log(sockets)

        res.status(200).send(sockets);
    })

    app.post('/disconnect', async (req, res) => {
        const { socketId } = req.body
        const repository = InMemoryWhatsAppSocketRepository.getInstance()
        const wa = new WhatsappSocketManagerBaileys(repository);
        wa.disconnect(socketId);
        repository.getAll().forEach( socket => {
            console.log(`[SOCKETID] ${socket.socketId}`)
            console.log(`[STATE] ${socket.state} \n`);
        })

        res.status(200).send(repository.getAll());
    })
})()

app.listen(3000, () => console.log("SERVER ONLINE"))