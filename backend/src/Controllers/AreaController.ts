import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { IArea } from "../interfaces/IArea";
import { ListAreasService } from "../services/areas/ListAreaService";

export default new class AreaController {
    async Create(request: FastifyRequest, reply: FastifyReply) {
        const area = request.body as IArea;
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





