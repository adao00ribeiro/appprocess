import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { FastifyError } from '@fastify/error'
import cors from "@fastify/cors"
import formBody from "@fastify/formbody";
import RoutesAreaV1 from "./routes/v1/RoutesArea"
import RoutesProcessoV1 from "./routes/v1/RoutesProcesso"
import RoutesSubProcessoV1 from "./routes/v1/RoutesSubProcesso"
import RoutesUsuarioV1 from "./routes/v1/RoutesUsuario"
const app = fastify();

app.register(cors);
app.register(formBody);

app.register(RoutesAreaV1, { prefix: '/v1' });
app.register(RoutesProcessoV1, { prefix: '/v1' });
app.register(RoutesSubProcessoV1, { prefix: '/v1' });
app.register(RoutesUsuarioV1, { prefix: '/v1' });


app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {

    if (error instanceof Error) {
        // Log error
        app.log.error(error)
        console.log(error);
        // Send error response
        reply.status(500).send({ ok: false })
    }
    reply.status(500).send(error)

})

export { app };