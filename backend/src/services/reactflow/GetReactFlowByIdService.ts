import prismaclient from "../../prisma";


export async function GetReactFlowByIdService(id: string) {
   
    const flow = await prismaclient.reactFlow.findUnique({
        where: { id },
    })
  
    return flow;

}