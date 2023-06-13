import { Request, Response, NextFunction } from "express"
import { INodeProcesso } from './../interfaces/INodeProcesso'
import { CreateProcessoService } from "../services/processo/CreateProcessoService";
import { ListProcessoService } from "../services/processo/ListProcessoService";
import { UpdateProcessoService } from "../services/processo/UpdateProcessoService";

export default new class ProcessoController {
    async Create(req: Request, res: Response) {
        const id = req.user_id;
        const processo = req.body as INodeProcesso
        return res.send(await CreateProcessoService(id,processo));
    }
    async ListAll(req: Request, res: Response) {
        res.send(await ListProcessoService());
    }
    async Update(req: Request, res: Response) {
        const user_id = req.user_id;
        const processo = req.body as INodeProcesso;
        res.send(await UpdateProcessoService(processo));
    }
    async Delete(req: Request, res: Response) {
        res.send("ok")
    }
}
