import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"

async function connecToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,

    })

    sock.ev.on('connection.update', async (update) => {
        const { qr } = update
        if(qr) {
            console.log(qr);
        }
    })

    sock.ws.close()
}

connecToWhatsApp()
