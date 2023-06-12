import { app } from "./app"

const PORT = 3333
const HOSTNAME = 'http://localhost'

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        app.log.error(err)
    }
    console.log(`Servidor rodando com sucesso ${address}`)
})


