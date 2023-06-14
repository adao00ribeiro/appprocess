import { Request, Response } from "express"
import { IEdges } from "../interfaces/IEdges";
import { CreateEdgeService } from "../services/edge/CreateEdgeService";


export default new class EdgeController {
    async Create(req: Request, res: Response) {
        const user_id = req.user_id;
        const edge = req.body as IEdges;
       return res.send(await CreateEdgeService(user_id,edge))
    }
  
    async ListAll(req: Request, res: Response) {
       
    }
    async Update(req: Request, res: Response) {
        const processo = req.body
       
    }
    async Delete(req: Request, res: Response) {
        res.send("ok")
    }
}





