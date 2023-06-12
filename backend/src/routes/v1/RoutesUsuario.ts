import { Router, Request, Response, NextFunction } from "express"
import AreaControllers from "../../Controllers/AreaController";
import UsuarioController from "../../Controllers/UsuarioController";
import { IsAuthenticated } from "../../middlewares/IsAuthenticated";

export const RoutesUsuario = Router();


RoutesUsuario.post("/usuarios", UsuarioController.Create);
RoutesUsuario.get("/usuarios", IsAuthenticated, UsuarioController.ListAll);
RoutesUsuario.get("/usuarios/info", IsAuthenticated, UsuarioController.GetAllInfo);
RoutesUsuario.put("/usuarios", IsAuthenticated, UsuarioController.Update);
RoutesUsuario.delete("/usuarios/:id?", IsAuthenticated, UsuarioController.Delete);


