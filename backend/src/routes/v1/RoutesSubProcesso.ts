import AreaControllers from "../../Controllers/AreaController";


export default async function RoutesSubProcesso(server: any) {
    server.post("/subprocessos", AreaControllers.Create);
    server.get("/subprocessos", AreaControllers.ListAll);
    server.put("/subprocessos", AreaControllers.Update);
    server.delete("/subprocessos/:id?", AreaControllers.Delete);
}

