import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { FastifyError } from '@fastify/error'
import cors from "@fastify/cors"
import formBody from "@fastify/formbody";
import RoutesProductsV1 from "./routes/v1/RoutesArea"


const app = fastify();


app.register(cors);
app.register(formBody);
app.register(RoutesProductsV1, { prefix: '/v1' });



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