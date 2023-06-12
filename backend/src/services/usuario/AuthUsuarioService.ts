import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuth } from "../../interfaces/IAuth";
import dotenv from 'dotenv';
import { GetUserByEmailService } from "./GetUsuarioByEmailService";
dotenv.config()

    export async function AuthUsuarioService({ email, password }: IAuth) {

       // const serviceUser = new GetUserByEmailService();
       //= await serviceUser.execute(email);
       const user = null;

        if (!user) {
            throw new Error("Email nao existe");
        }
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha Incorreta");
        }
        //gerar token
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            modelmessage: user.modelmessage,
            token: token,
        }
    }
