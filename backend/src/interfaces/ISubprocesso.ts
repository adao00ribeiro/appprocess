import { IProcesso } from "./IProcesso";

export interface ISubprocesso {
    id: number;
    processo_id: number;
    name: string;
    description: string;
    processId: number;
    process: IProcesso;
}