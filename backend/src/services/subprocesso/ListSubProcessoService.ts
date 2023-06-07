import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function ListSubProcessoService() {
    return await prismaclient.area.findMany();
}

