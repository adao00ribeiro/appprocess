import { IData } from "./IData";

export interface INodeArea {
    data: IData;
    dragging: boolean;
    height: number;
    id: string;
    parentNode?: string;
    position: { x: number, y: number };
    positionAbsolute: { x: number, y: number };
    selected?: boolean;
    style: { width: number, height: number };
    type: string;
    width: number;
    zIndex: number;
    usuarioId: string;
}