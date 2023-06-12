
import { Request, Response, NextFunction } from "express"
import { IAuth } from './../interfaces/IAuth'
import { AuthUsuarioService } from './../services/usuario/AuthUsuarioService'

export async function AuthUserController(req: Request, res: Response) {
    const Auth = req.body as IAuth;
    return res.json(await AuthUsuarioService(Auth));
}