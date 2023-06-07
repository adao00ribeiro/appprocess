import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function DeleteUsuarioService(id: number) {
    const result = await prismaclient.area.delete({
        where: { id: id }
    })
    return result;
}

