import prismaclient from "../../prisma";

export async function ListUsuarioService() {
    return await prismaclient.usuario.findMany();
}

