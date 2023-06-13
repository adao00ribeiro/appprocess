
import { INodeProcesso } from "../../interfaces/INodeProcesso";
import prismaclient from "../../prisma";

export async function UpdateProcessoService(processo: INodeProcesso) {
  
    const processoUpdate = await prismaclient.nodeProcesso.update({
        where: { id: processo.id },
        data: {
            label: processo.data.label,
            descricao: processo.data.descricao,
            sistemasUtilizados: processo.data.sistemasUtilizados.join(","),
            responsaveis:processo.data.responsaveis.join(","),
            dragging: processo.dragging,
            height: processo.height,
            parentNode: processo.parentNode,
            positionX: processo.position.x,
            positionY: processo.position.y,
            positionAbsoluteX: processo.positionAbsolute.x,
            positionAbsoluteY: processo.positionAbsolute.y,
            selected: processo.selected,
            styleWidth: processo.style.width,
            styleHeight: processo.style.height,
            type: processo.type,
            width: processo.width,
            zIndex: processo.zIndex,
        }
    })
    return processoUpdate;
}

