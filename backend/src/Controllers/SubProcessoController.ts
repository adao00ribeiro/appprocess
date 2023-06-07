import { FastifyReply, FastifyRequest } from "fastify";


export default new class SubProcessoController {
    async Create(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
    async ListAll(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
    async Update(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
    async Delete(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
}





