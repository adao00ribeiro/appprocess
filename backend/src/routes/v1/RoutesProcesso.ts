import ProcessoController from './../../Controllers/ProcessoController'


export default async function RoutesProcesso(server: any) {
    server.post("/processos", ProcessoController.Create);
    server.get("/processos", ProcessoController.ListAll);
    server.put("/processos", ProcessoController.Update);
    server.delete("/processos/:id?", ProcessoController.Delete);
}

