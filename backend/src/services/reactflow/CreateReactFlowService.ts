

import prismaclient from "../../prisma";

export async function CreateReactFlowService(userid: string, ReactFlow: string) {
    
    const flow = await prismaclient.reactFlow.findFirst({
        where: { usuarioId: userid }
      });
    if(flow){
        throw new Error("Ja existe");
    }
    const result = prismaclient.reactFlow.create({
        data: {
            flowJson: ReactFlow,
            usuarioId:userid
        }
    })
    return result;
}

