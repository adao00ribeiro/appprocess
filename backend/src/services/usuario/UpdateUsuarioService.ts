
import { IUsuario } from "../../interfaces/IUsuario";
import prismaclient from "../../prisma";

export async function UpdateUsuarioService(usuario: IUsuario) {
    const usuarioupdate = await prismaclient.usuario.update({
        where: { id: usuario.id },
        data: usuario
    })
    return usuarioupdate;
}

