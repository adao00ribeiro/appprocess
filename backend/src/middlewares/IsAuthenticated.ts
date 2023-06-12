import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { IPayload } from "../interfaces/IPayload";
import dotenv from 'dotenv';
dotenv.config()

export function IsAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authtoken = req.headers.authorization;
    if (!authtoken) {
        return res.status(401).end();
    }
    const [, token] = authtoken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
        //variavel dentro do request criada com interface 
        req.user_id = sub
        return next();
    } catch (error) {
        return res.status(401).end();
    }

}