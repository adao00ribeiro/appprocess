import { hash } from "bcryptjs";
import { IUsuario } from "../../interfaces/IUsuario";
import prismaclient from "../../prisma";
import { GetUserByEmailService } from "./GetUsuarioByEmailService";

export async function CreateUsuarioService(usuario: IUsuario) {
    if (!usuario.email) {
        throw new Error("Email Incorrect");
    }

    if (await GetUserByEmailService(usuario.email)) {
        throw new Error("Email Exist");
    }

    const hashpassword = await hash(usuario.senha, 8);

    const user = await prismaclient.usuario.create({
        data: {
            nome: usuario.nome,
            email: usuario.email,
            senha: hashpassword
        }, select: {
            id: true,
            nome: true,
            email: true
        }
    })
    return user;
}

