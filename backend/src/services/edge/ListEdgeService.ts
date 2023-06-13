
import { INodeArea } from "../../interfaces/INodeArea";
import prismaclient from "../../prisma";

export async function ListEdgesService() {

   const list = await prismaclient.nodeArea.findMany()
   let listnodearea: INodeArea[] = [];
   list.forEach((item) => {
      let jsonItem : INodeArea= {
        data: {
          label: item.label,
          descricao: item.descricao || "",
          sistemasUtilizados:[],
          responsaveis:[],
          update: ()=>{},
        },
        dragging: item.dragging,
        height: item.height,
        id: item.id,
        parentNode:  item.parentNode || "",
        position: {
          x: item.positionX,
          y: item.positionY,
        },
        positionAbsolute: {
          x: item.positionAbsoluteX,
          y: item.positionAbsoluteY,
        },
        style: {
          width: item.styleWidth,
          height: item.styleHeight,
        },
        type: item.type,
        width: item.width,
        zIndex: item.zIndex,
        usuarioId:item.usuarioId
      };
      listnodearea.push(jsonItem);
    });

   return listnodearea;
}

