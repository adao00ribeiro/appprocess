import prismaclient from "../../prisma";


export async function GetUsuarioByIdService(id: string) {
    let user = await prismaclient.usuario.findUnique({
        where: { id },
        include: {
            nodeareas: true
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
        }))
    };

    return customizedUser;

}