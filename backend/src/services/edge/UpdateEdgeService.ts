
import prismaclient from "../../prisma";
import { IEdges } from "../../interfaces/IEdges";

export async function UpdateEdgesService(edge: IEdges) {
    const areasaved = await prismaclient.edge.update({
        where: { id: edge.id },
        data: edge
    })

    return areasaved;
}

