import { Request, Response, NextFunction } from "express"
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";
import { DeleteAreaService } from "../services/areas/DeleteAreaService";
import { UpdateAreaService } from "../services/areas/UpdateAreaService";


export default new class AreaController {
    async Create(req: Request, res: Response) {
        const id = req.user_id;
        const area = req.body as INodeArea;
        return res.send(await CreateAreaService(id, area));
    }
  
    async ListAll(req: Request, res: Response) {
        res.send(await ListAreasService());
    }
    async Update(req: Request, res: Response) {
        const id = req.user_id;
        const area = req.body as INodeArea;
        return res.send(await UpdateAreaService(area));
    }
    async Delete(req: Request, res: Response) {
        const iduser = req.user_id;
        const {id} = req.params;
        return res.send(await DeleteAreaService(iduser, id));
    }
}





