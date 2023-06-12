import { FastifyReply, FastifyRequest } from "fastify";
import {INodeProcesso} from './../interfaces/INodeProcesso'
import { CreateProcessoService } from "../services/processo/CreateProcessoService";
import { ListProcessoService } from "../services/processo/ListProcessoService";

export default new class ProcessoController {
    async Create(request: FastifyRequest, reply: FastifyReply) {
        const processo = request.body as INodeProcesso
        return reply.send(await CreateProcessoService(processo));
    }
    async ListAll(request: FastifyRequest, reply: FastifyReply) {
        reply.send(await ListProcessoService());
    }
    async Update(request: FastifyRequest, reply: FastifyReply) {
        const processo = request.body 
        console.log("update",processo);
    }
    async Delete(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
}
