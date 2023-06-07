import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function ListProcessoService() {
    return await prismaclient.area.findMany();
}

