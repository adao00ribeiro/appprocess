import prismaclient from "../../prisma";


export async function GetUserByEmailService(email: string) {
    const user = await prismaclient.usuario.findUnique({
        where: { email }
    })
    return user;

}