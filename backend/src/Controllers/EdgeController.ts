import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";
import { IEdges } from "../interfaces/IEdges";


export default new class EdgeController {
    async Create(request: FastifyRequest, reply: FastifyReply) {
        const edge = request.body as IEdges;
        console.log(edge);
    }
 
    async Delete(request: FastifyRequest, reply: FastifyReply) {
        reply.send("ok")
    }
}





