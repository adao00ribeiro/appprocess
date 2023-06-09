import axios from "axios";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient";
import { IClient } from "../interfaces/IClient";
import { ToastContainer, toast } from 'react-toastify';
import { IMessage } from "../interfaces/IMessage";
type SignInProps = {
    email: string;
    password: string;
}
type SignUpProps = {
    name: string;
    email: string;
    password: string;
}
type UserProps = {
    id: string;
    name: string;
    email: string;
    modelmessage: string;
}
export type IMyContextProps = {
    user: UserProps;
    setUser: Dispatch<SetStateAction<UserProps>>,
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    step: number,
    setStep: Dispatch<SetStateAction<number>>,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    selectClient: IClient,
    setSelectClient: Dispatch<SetStateAction<IClient>>,
    arrayUsers: IClient[],
    setArrayUsers: Dispatch<SetStateAction<IClient[]>>,
    IsAltered: boolean
    setIsAltered: Dispatch<SetStateAction<boolean>>,
    GetArrayUsersApi: () => void;
    zoomOnScroll:boolean;
    setZoomOnScroll : Dispatch<SetStateAction<boolean>>,
    isSelectable:boolean;
    setIsSelectable : Dispatch<SetStateAction<boolean>>,
    panOnDrag:boolean;
    setpanOnDrag: Dispatch<SetStateAction<boolean>>,
}
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as IMyContextProps);

export function signOut() {
    try {
        destroyCookie(undefined, "@nextauth.token")
        Router.push("/");
    } catch (error) {
        console.log("error ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [zoomOnScroll, setZoomOnScroll] = useState(true);
    const [isSelectable, setIsSelectable] = useState(true);
    const [panOnDrag, setpanOnDrag] = useState(false);
    const [user, setUser] = useState<UserProps>({
        id: "",
        name: "",
        email: "",
        modelmessage: ""
    });

    const isAuthenticated = !!user;
    const [step, setStep] = useState(1);
    const [index, setIndex] = useState(0);
    const [selectClient, setSelectClient] = useState({
        id: "",
        user_id: "",
        name: "",
        phone: "",
        consult_date: "",
        next_consultation_date: "",
    })
    const [arrayUsers, setArrayUsers] = useState<IClient[]>(null)
    const [IsAltered, setIsAltered] = useState(false);
    //--------------------------------------
    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email, modelmessage } = response.data;
                setUser({ id, name, email, modelmessage });
            }).catch(error => {
                //se deu erro deslogamos o user.
                signOut();
            });
        }
    }, []);

    async function signIn({ email, password }: SignInProps) {

        try {
            const response = await api.post("/session", {
                email, password
            })

            const { id, name, token, modelmessage } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })
            setUser(
                {
                    id,
                    name,
                    email,
                    modelmessage
                }
            )
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com sucesso")
            await setTimeout(() => {
                Router.push("/dashboard")
            }, 500);

        } catch (error) {
            toast.error("Email ou senha errado");
        }
    }
    async function signUp({ name, email, password }: SignUpProps) {

        try {
            const response = await api.post("/users", {
                name, email, password
            })
            Router.push("/")
        } catch (error) {
            console.log("erro ao cadastrar", error)
        }
    }
    async function GetArrayUsersApi() {
        const response = await api.get("/client");
        setArrayUsers(response.data);
        setIndex(response.data.length - 1)
        setIsAltered(true);
    }
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn, signOut, signUp, step, setStep, index, setIndex, selectClient, setSelectClient,
         arrayUsers, setArrayUsers, IsAltered, setIsAltered, 
         GetArrayUsersApi,zoomOnScroll,setZoomOnScroll,
         isSelectable,
         setIsSelectable,
         panOnDrag, setpanOnDrag
         }}>
            {children}
        </AuthContext.Provider>
    )

}
