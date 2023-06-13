
import { Router, Request, Response, NextFunction } from "express"
import EdgeController from "../../Controllers/EdgeController";


export const RoutesEdge = Router();

RoutesEdge.post("/edges", EdgeController.Create);
RoutesEdge.get("/edges", EdgeController.ListAll);
RoutesEdge.put("/edges", EdgeController.Update);
RoutesEdge.delete("/edges/:id?", EdgeController.Delete);