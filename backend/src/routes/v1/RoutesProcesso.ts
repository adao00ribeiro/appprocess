import { Router, Request, Response, NextFunction } from "express"
import ProcessoController from './../../Controllers/ProcessoController'
export const RoutesProcesso = Router();


RoutesProcesso.post("/processos", ProcessoController.Create);
RoutesProcesso.get("/processos", ProcessoController.ListAll);
RoutesProcesso.put("/processos", ProcessoController.Update);
RoutesProcesso.delete("/processos/:id?", ProcessoController.Delete);


