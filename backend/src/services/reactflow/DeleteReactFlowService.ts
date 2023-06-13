
import prismaclient from "../../prisma";

export async function DeleteReactFlowService(id: string) {
    const reactdelete = await prismaclient.reactFlow.delete({
        where: { id: id }
    })
    return reactdelete;
}
