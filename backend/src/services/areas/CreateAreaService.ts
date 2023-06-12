
import { INodeArea } from "../../interfaces/INodeArea";
import prismaclient from "../../prisma";

export async function CreateAreaService(area: INodeArea) {

    const areasaved = await prismaclient.nodeArea.create({
        data: {
            id:area.id,
            label: area.data.label,
            descricao: area.data.descricao,
            dragging: area.dragging,
            height: area.height,
            parentNode: area?.parentNode,
            positionX: area.position.x,
            positionY: area.position.y,
            positionAbsoluteX: area.positionAbsolute.x,
            positionAbsoluteY: area.positionAbsolute.y,
            selected: area.selected,
            styleWidth: area.style.width,
            styleHeight: area.style.height,
            type: area.type,
            width: area.width,
            zIndex: area.zIndex,
            usuarioId:area.usuarioId
        }
    })
    return areasaved;
  
}

