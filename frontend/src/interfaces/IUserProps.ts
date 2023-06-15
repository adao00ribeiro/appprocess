import { IEdges } from "./IEdges";
import { INodeArea } from "./INodeArea";
import { INodeProcesso } from "./INodeProcesso";
import { IReactFlow } from "./IReactFlow";

export interface UserProps {
    id: string;
    nome: string;
    email: string;
    nodeareas: INodeArea[];
    nodeprocessos: INodeProcesso[],
    edges: IEdges[],
    reactflow: IReactFlow
}
