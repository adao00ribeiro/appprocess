import { Router, Request, Response, NextFunction } from "express"
import { AuthUserController } from "../../Controllers/AuthController";

export const RoutesSession = Router();

RoutesSession.post("/session", AuthUserController);



