
import { Router, Request, Response, NextFunction } from "express"
import ReactFlowController from "../../Controllers/ReactFlowController";


export const RoutesReactFlow = Router();

RoutesReactFlow.post("/reactflow", ReactFlowController.Create);
RoutesReactFlow.get("/reactflow", ReactFlowController.ListAll);
RoutesReactFlow.put("/reactflow",  ReactFlowController.Update);
RoutesReactFlow.get("/reactflow/:id?", ReactFlowController.GetById);
RoutesReactFlow.delete("/reactflow/:id?", ReactFlowController.Delete);