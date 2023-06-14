
import { INodeArea } from "../../interfaces/INodeArea";
import { IReactFlow } from "../../interfaces/IReactFlow";
import prismaclient from "../../prisma";

export async function UpdateReactFlowService(reactflow: IReactFlow) {
    const update = await prismaclient.reactFlow.update({
        where: { id: reactflow.id },
        data: {
            flowJson: reactflow.flowJson
        }
    })
    return update;
}

