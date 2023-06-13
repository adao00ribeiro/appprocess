
import { IEdges } from "../../interfaces/IEdges";
import prismaclient from "../../prisma";

export async function CreateEdgeService(userid: string, edge: IEdges) {
    console.log(edge)
    const edgesave = await prismaclient.edge.create({
        data: {
            source: edge.source,
            sourceHandle: "",
            target: edge.target,
            targetHandle: "",
            type:'default',
            usuarioId: userid,
            }
    })
    console.log(edgesave)
    return edgesave;

}

