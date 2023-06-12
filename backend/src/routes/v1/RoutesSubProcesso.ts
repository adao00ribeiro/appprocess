import { Router, Request, Response, NextFunction } from "express"
import AreaControllers from "../../Controllers/AreaController";

export const RoutesSubProcesso = Router();

RoutesSubProcesso.post("/subprocessos", AreaControllers.Create);
RoutesSubProcesso.get("/subprocessos", AreaControllers.ListAll);
RoutesSubProcesso.put("/subprocessos", AreaControllers.Update);
RoutesSubProcesso.delete("/subprocessos/:id?", AreaControllers.Delete);


