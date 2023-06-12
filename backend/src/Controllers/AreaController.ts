import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";


export default new class AreaController {
    async Create(request: FastifyRequest, reply: FastifyReply) {
        const area = request.body as INodeArea;
        return reply.send(await CreateAreaService(area));
    }
    async ListAll(request: FastifyRequest, reply: FastifyReply) {
        reply.send(await ListAreasService());
    }
    async Update(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
    async Delete(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
}





