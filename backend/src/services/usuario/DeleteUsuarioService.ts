import prismaclient from "../../prisma";

export async function DeleteUsuarioService(id: string) {
    const result = await prismaclient.usuario.delete({
        where: { id: id }
    })
    return result;
}

