
import { INodeArea } from "../../interfaces/INodeArea";
import prismaclient from "../../prisma";

export async function UpdateAreaService(area: INodeArea) {
   
    const areaupdate = await prismaclient.nodeArea.update({
        where: { id: area.id },
        data: {
            positionX: area.position?.x,
            positionY: area.position?.y,
            positionAbsoluteX: area.positionAbsolute?.x,
            positionAbsoluteY: area.positionAbsolute?.y,
        },
    });
    return areaupdate;
}

