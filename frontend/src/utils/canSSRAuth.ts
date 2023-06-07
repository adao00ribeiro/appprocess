//USUARIOS  LOGADOS

import { GetServerSideProps , GetServerSidePropsContext , GetServerSidePropsResult } from "next";
import { parseCookies , destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

//FUNCAO PARA PAGINAS QUE SO PODE SER ACESSADAS POR logados

export function canSSRAuth<P>(fn:GetServerSideProps<P>){
    return async(ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        const cookies = parseCookies(ctx);
        
        if(!cookies['@nextauth.token'])
        {
            return {
                redirect:{
                    destination:"/",
                    permanent : false,
                }
            }
        }
        try {
            return await fn(ctx)
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(ctx , '@nextauth.token')

                return {
                    redirect:{
                        destination:"/",
                        permanent : false,
                    }
                }
            }
        }
        
    }
}