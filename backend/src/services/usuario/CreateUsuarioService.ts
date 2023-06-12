
import { IUsuario } from "../../interfaces/IUsuario";
import prismaclient from "../../prisma";

export async function CreateUsuarioService(usuario: IUsuario) {
    const user = await prismaclient.usuario.create({
        data: usuario
    })
    return user;
}

