import axios from "axios";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import { NodeProps } from "reactflow";
import { INodeArea } from "../interfaces/INodeArea";
type SignInProps = {
    email: string;
    senha: string;
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
    nodeareas: INodeArea[];
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
    IsAltered: boolean
    setIsAltered: Dispatch<SetStateAction<boolean>>,
    GetArrayUsersApi: () => void;
    zoomOnScroll: boolean;
    setZoomOnScroll: Dispatch<SetStateAction<boolean>>,
    isSelectable: boolean;
    setIsSelectable: Dispatch<SetStateAction<boolean>>,
    panOnDrag: boolean;
    setpanOnDrag: Dispatch<SetStateAction<boolean>>,
    isDraggable: boolean;
    setIsDraggable: Dispatch<SetStateAction<boolean>>,
    dialogDetalheProcesso: HTMLDialogElement;
    setdialogDetalheProcesso: Dispatch<SetStateAction<HTMLDialogElement>>,
    nodeSelecionado: NodeProps, setnodeSelecionado: Dispatch<SetStateAction<NodeProps>>,
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
    const [panOnDrag, setpanOnDrag] = useState(true);
    const [isDraggable, setIsDraggable] = useState(true);
    const [user, setUser] = useState<UserProps>({
        id: "",
        name: "",
        email: "",
        nodeareas: [],
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

    const [IsAltered, setIsAltered] = useState(false);
    const [dialogDetalheProcesso, setdialogDetalheProcesso] = useState<HTMLDialogElement>()
    const [nodeSelecionado, setnodeSelecionado] = useState<NodeProps>()
    //--------------------------------------
    useEffect(() => {
        setdialogDetalheProcesso(document.getElementById("dialogDetalheProcesso") as HTMLDialogElement);

        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/v1/usuarios/info').then(response => {
                const { id, name, email } = response.data;
                const nodeareas: INodeArea[] = response.data.nodeareas;
                setUser({ id, name, email, nodeareas })

            }).catch(error => {
                //se deu erro deslogamos o user.
                signOut();
            });
        }

    }, []);

    async function signIn({ email, senha }: SignInProps) {

        try {
            const response = await api.post("/v1/session", {
                email, senha
            })

            const { id, name, token, nodeareas } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })
            setUser(
                {
                    id,
                    name,
                    email,
                    nodeareas
                }
            )
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com sucesso")
            await setTimeout(() => {
                Router.push("/dashboard")
            }, 1000);

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

    }
    return (
        <AuthContext.Provider value={{
            user, setUser, isAuthenticated, signIn, signOut, signUp, step, setStep, index, setIndex,
            IsAltered, setIsAltered,
            GetArrayUsersApi, zoomOnScroll, setZoomOnScroll,
            isSelectable,
            setIsSelectable,
            panOnDrag, setpanOnDrag,
            isDraggable, setIsDraggable,
            dialogDetalheProcesso, setdialogDetalheProcesso,
            nodeSelecionado, setnodeSelecionado
        }}>
            {children}
        </AuthContext.Provider>
    )

}
