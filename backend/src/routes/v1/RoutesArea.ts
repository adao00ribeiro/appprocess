
import { Router, Request, Response, NextFunction } from "express"
import AreaControllers from "../../Controllers/AreaController";

export const RoutesArea = Router();

RoutesArea.post("/areas", AreaControllers.Create);
RoutesArea.get("/areas", AreaControllers.ListAll);
RoutesArea.put("/areas", AreaControllers.Update);
RoutesArea.delete("/areas/:id?", AreaControllers.Delete);