import { Request, Response, NextFunction } from "express"
import { CreateUsuarioService } from "../services/usuario/CreateUsuarioService";
import { IUsuario } from "../interfaces/IUsuario";
import { GetUsuarioByIdService } from "../services/usuario/GetUsuarioByIdService";


export default new class UsuarioController {
    async Create(req: Request, res: Response) {
        const usuario = req.body as IUsuario;
        res.send(await CreateUsuarioService(usuario))
    }
    async ListAll(req: Request, res: Response) {
        res.json("ok")
    }
    async Update(req: Request, res: Response) {
        res.json("ok")
    }
    async Delete(req: Request, res: Response) {
        res.json("ok")
    }
    async GetAllInfo(req: Request, res: Response) {
        const user_id = req.user_id;

        res.json(await GetUsuarioByIdService(user_id));
    }
    async CreateJson(req: Request, res: Response) {
        const id = req.user_id;
     
    }
}





