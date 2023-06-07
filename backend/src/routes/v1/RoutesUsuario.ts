import AreaControllers from "../../Controllers/AreaController";


export default async function RoutesUsuario(server: any) {
    server.post("/usuarios", AreaControllers.Create);
    server.get("/usuarios", AreaControllers.ListAll);
    server.put("/usuarios", AreaControllers.Update);
    server.delete("/usuarios/:id?", AreaControllers.Delete);
}

