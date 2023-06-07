import { IArea } from "../../interfaces/IArea";
import prismaclient from "../../prisma";

export async function CreateProcessoService(area: IArea) {
    const areasaved = await prismaclient.area.create({
        data: area
    })


    return areasaved;
}

