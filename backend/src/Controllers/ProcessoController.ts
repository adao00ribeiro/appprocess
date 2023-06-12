import { Request, Response, NextFunction } from "express"
import { INodeProcesso } from './../interfaces/INodeProcesso'
import { CreateProcessoService } from "../services/processo/CreateProcessoService";
import { ListProcessoService } from "../services/processo/ListProcessoService";

export default new class ProcessoController {
    async Create(request: Request, reply: Response) {
        const processo = request.body as INodeProcesso
        return reply.send(await CreateProcessoService(processo));
    }
    async ListAll(request: Request, reply: Response) {
        reply.send(await ListProcessoService());
    }
    async Update(request: Request, reply: Response) {
        const processo = request.body
        console.log("update", processo);
    }
    async Delete(request: Request, reply: Response) {
        reply.send("ok")
    }
}
