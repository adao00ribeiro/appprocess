import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuth } from "../../interfaces/IAuth";
import dotenv from 'dotenv';
import { GetUserByEmailService } from "./GetUsuarioByEmailService";
dotenv.config()

export async function AuthUsuarioService({ email, senha }: IAuth) {

    const user = await GetUserByEmailService(email);

    if (!user) {
        throw new Error("Email nao existe");
    }
    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
        throw new Error("Senha Incorreta");
    }
    //gerar token
    const token = sign(
        {
            name: user.nome,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id.toString(),
            expiresIn: '30d'
        }
    )

    return {
        id: user.id,
        name: user.nome,
        email: user.email,
        token: token,
    }
}
