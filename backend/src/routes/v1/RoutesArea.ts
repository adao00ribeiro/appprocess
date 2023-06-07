import AreaControllers from "../../Controllers/AreaController";


export default async function RoutesArea(server: any) {
    server.post("/areas", AreaControllers.Create);
    server.get("/areas", AreaControllers.ListAll);
    server.put("/areas", AreaControllers.Update);
    server.delete("/areas/:id?", AreaControllers.Delete);
}

