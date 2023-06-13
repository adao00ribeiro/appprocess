import { Request, Response, NextFunction } from "express"
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";
import { DeleteAreaService } from "../services/areas/DeleteAreaService";
import { UpdateAreaService } from "../services/areas/UpdateAreaService";
import { CreateReactFlowService } from "../services/reactflow/CreateReactFlowService";
import { IReactFlow } from "../interfaces/IReactFlow";
import { ListReactFlowService } from "../services/reactflow/ListReactFlowService";
import { GetReactFlowByIdService } from "../services/reactflow/GetReactFlowByIdService";
import { UpdateReactFlowService } from "../services/reactflow/UpdateReactFlowService";


export default new class ReactFlowController {
   
   
    async Create(req: Request, res: Response) {
        const id = req.user_id;
        const {json} = req.body ;
        return res.send(await CreateReactFlowService(id, json));
    }
    async GetById(req: Request, res: Response) {
          const user_id = req.user_id;
          const {id} = req.params;
          return res.send(await GetReactFlowByIdService(id));
    }
    async ListAll(req: Request, res: Response) {
        const id = req.user_id;
        res.send(await ListReactFlowService());
    }
    async Update(req: Request, res: Response) {
        const id = req.user_id;
        return res.send(await UpdateReactFlowService(req.body))
    }
    async Delete(req: Request, res: Response) {
        
    }
}





