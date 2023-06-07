import { ISubprocesso } from "./ISubprocesso";

export interface IProcesso {
    id: number;
    area_id: number;
    name: string;
    description: string;
    subprocesses: ISubprocesso[];
    systemsUsed: string;
    responsibleId: number;
    documentation: string;
}