import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../context/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
    //pega o cookie
    let cookies = parseCookies(ctx);
    //configuracao
    const api = axios.create({
        //  baseURL: '',
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })
    //se a api der erro 
    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        //se nao tiver autorizado 
        if (error.response.status === 401) {
            //deslogar
            if (typeof window !== undefined) {
                //desloga usuario
                signOut();
            } else {
                //serverSide 
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}

