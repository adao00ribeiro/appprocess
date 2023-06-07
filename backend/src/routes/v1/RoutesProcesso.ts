import AreaControllers from "../../Controllers/AreaController";


export default async function RoutesProcesso(server: any) {
    server.post("/processos", AreaControllers.Create);
    server.get("/processos", AreaControllers.ListAll);
    server.put("/processos", AreaControllers.Update);
    server.delete("/processos/:id?", AreaControllers.Delete);
}

