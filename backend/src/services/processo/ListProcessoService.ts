
import { INodeProcesso } from "../../interfaces/INodeProcesso";
import prismaclient from "../../prisma";

export async function ListProcessoService() {

    const list = await prismaclient.nodeProcesso.findMany()
    let listnodearea: INodeProcesso[] = [];
    list.forEach((item) => {
       let jsonItem : INodeProcesso= {
         data: {
           label: item.label,
           descricao: item.descricao || "",
           sistemasUtilizados:  item.sistemasUtilizados?.split(',')||[],
           responsaveis: item.responsaveis?.split(',')||[],
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
 