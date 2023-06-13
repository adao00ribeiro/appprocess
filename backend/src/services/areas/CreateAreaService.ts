
import { INodeArea } from "../../interfaces/INodeArea";
import prismaclient from "../../prisma";

export async function CreateAreaService(userid: string, area: INodeArea) {

    const areasaved = await prismaclient.nodeArea.create({
        data: {
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
            usuarioId: userid
        }
    })
    const customizedUser = {
        data: {
            label: areasaved.label,
            descricao: areasaved.descricao
        },
        dragging: areasaved.dragging,
        height: areasaved.height,
        id: areasaved.id,
        parentNode: areasaved.parentNode,
        position: { x: areasaved.positionX, y: areasaved.positionY },
        positionAbsolute: { x: areasaved.positionAbsoluteX, y: areasaved.positionAbsoluteY },
        style: {
            width: areasaved.width,
            height: areasaved.height
        },
        type: areasaved.type,
        width: areasaved.width,
        zIndex: areasaved.zIndex
    }
    return customizedUser;

}

