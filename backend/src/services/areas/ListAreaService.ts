import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function ListAreasService() {
    return await prismaclient.area.findMany();
}

