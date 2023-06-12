import { Request, Response, NextFunction } from "express"
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";
import { IEdges } from "../interfaces/IEdges";


export default new class EdgeController {
    async Create(request: Request, reply: Response) {
        const edge = request.body as IEdges;
        console.log(edge);
    }

    async Delete(request: Request, reply: Response) {
        reply.send("ok")
    }
}





