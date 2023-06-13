
import { INodeArea } from "../../interfaces/INodeArea";
import prismaclient from "../../prisma";

export async function ListReactFlowService() {

   const list = await prismaclient.reactFlow.findMany()

   return list;
}

