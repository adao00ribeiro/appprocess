//USUARIOS NAO LOGADOS

import { GetServerSideProps , GetServerSidePropsContext , GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//FUNCAO PARA PAGINAS QUE SO PODE SER ACESSADAS POR VISITANTES

export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async(ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        const cookies = parseCookies(ctx);
        if(cookies['@nextauth.token'])
        {
            return {
                redirect:{
                    destination:"/dashboard",
                    permanent : false,
                }
            }
        }
        return await fn(ctx)
    }
}