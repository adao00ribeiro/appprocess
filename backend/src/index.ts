import { app } from "./app"

const PORT = 3333
const HOSTNAME = 'http://localhost'

app.listen({ port: PORT }, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})


