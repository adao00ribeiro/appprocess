import prismaclient from "../../prisma";

export async function GetUsuarioByIdService(id: string) {
    let user = await prismaclient.usuario.findUnique({
        where: { id },
        include: {
            nodeareas: true,
            nodeprocessos: true,
            edges: true,
            reactflow: true
        }
    })

    const customizedUser = {
        ...user,
        nodeareas: user.nodeareas.map(nodearea => ({
            data: {
                label: nodearea.label,
                descricao: nodearea.descricao
            },
            dragging: nodearea.dragging,
            height: nodearea.height,
            id: nodearea.id,
            parentNode: nodearea.parentNode,
            position: { x: nodearea.positionX, y: nodearea.positionY },
            positionAbsolute: { x: nodearea.positionAbsoluteX, y: nodearea.positionAbsoluteY },
            style: {
                width: nodearea.width,
                height: nodearea.height
            },
            type: nodearea.type,
            width: nodearea.width,
            zIndex: nodearea.zIndex
        })),
        nodeprocessos: user.nodeprocessos.map(nodeprocesso => ({
            data: {
                label: nodeprocesso.label,
                descricao: nodeprocesso.descricao,
                sistemasUtilizados: nodeprocesso.sistemasUtilizados.split(','),
                responsaveis: nodeprocesso.responsaveis.split(','),
            },
            dragging: nodeprocesso.dragging,
            height: nodeprocesso.height,
            id: nodeprocesso.id,
            parentNode: nodeprocesso.parentNode,
            position: { x: nodeprocesso.positionX, y: nodeprocesso.positionY },
            positionAbsolute: { x: nodeprocesso.positionAbsoluteX, y: nodeprocesso.positionAbsoluteY },
            style: {
                width: nodeprocesso.width,
                height: nodeprocesso.height
            },
            type: nodeprocesso.type,
            width: nodeprocesso.width,
            zIndex: nodeprocesso.zIndex
        }))
    };

    return customizedUser;

}