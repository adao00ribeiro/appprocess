import { Request, Response, NextFunction } from "express"
import { CreateAreaService } from "../services/areas/CreateAreaService";
import { ListAreasService } from "../services/areas/ListAreaService";
import { INodeArea } from "../interfaces/INodeArea";


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
        res.send("ok")
    }
    async Delete(req: Request, res: Response) {
        res.send("ok")
    }
}





