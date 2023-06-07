import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function UpdateSubProcessoService(area: IArea) {
    const areasaved = await prismaclient.area.update({
        where: { id: area.id },
        data: area
    })

    return areasaved;
}

