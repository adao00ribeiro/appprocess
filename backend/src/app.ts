import express, { Request, Response, NextFunction } from "express"
import 'express-async-errors'
import cors from 'cors'
import path from "path";

import { RoutesSession } from "./routes/v1/RoutesSession";
import { RoutesArea } from "./routes/v1/RoutesArea"
import { RoutesProcesso } from "./routes/v1/RoutesProcesso"
import { RoutesSubProcesso } from "./routes/v1/RoutesSubProcesso"
import { RoutesUsuario } from "./routes/v1/RoutesUsuario"
import { IsAuthenticated } from "./middlewares/IsAuthenticated";
const app = express();
app.use(express.json())
app.use(cors());

app.use('/v1', RoutesSession)
app.use('/v1', RoutesUsuario)
app.use('/v1', IsAuthenticated, RoutesArea)
app.use('/v1', IsAuthenticated, RoutesProcesso)
app.use('/v1', IsAuthenticated, RoutesSubProcesso)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
//trata erros e conti
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })
})


export { app };

