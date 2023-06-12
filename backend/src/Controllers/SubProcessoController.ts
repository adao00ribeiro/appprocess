import { Request, Response, NextFunction } from "express"


export default new class SubProcessoController {
    async Create(request: Request, reply: Response) {
        reply.send("ok")
    }
    async ListAll(request: Request, reply: Response) {
        reply.send("ok")
    }
    async Update(request: Request, reply: Response) {
        reply.send("ok")
    }
    async Delete(request: Request, reply: Response) {
        reply.send("ok")
    }
}





