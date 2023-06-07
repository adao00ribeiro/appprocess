import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function ListUsuarioService() {
    return await prismaclient.area.findMany();
}

