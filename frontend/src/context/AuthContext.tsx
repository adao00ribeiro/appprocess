import axios from "axios";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import { NodeProps } from "reactflow";
import { INodeArea } from "../interfaces/INodeArea";
import { INodeProcesso } from "../interfaces/INodeProcesso";
import { IEdges } from "../interfaces/IEdges";
import { IReactFlow } from "../interfaces/IReactFlow";
type SignInProps = {
    email: string;
    senha: string;
}
type SignUpProps = {
    nome: string;
    email: string;
    senha: string;
}
type UserProps = {
    id: string;
    nome: string;
    email: string;
    nodeareas: INodeArea[];
    nodeprocessos: INodeProcesso[],
    edges: IEdges[],
    reactflow: IReactFlow
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
    const [user, setUser] = useState<UserProps>(undefined);

    const isAuthenticated = !!user;
    const [step, setStep] = useState(1);
    const [index, setIndex] = useState(0);

    const [IsAltered, setIsAltered] = useState(false);
    const [dialogDetalheProcesso, setdialogDetalheProcesso] = useState<HTMLDialogElement>()
    const [nodeSelecionado, setnodeSelecionado] = useState<NodeProps>()
    //--------------------------------------
    useEffect(() => {
        setdialogDetalheProcesso(document.getElementById("dialogDetalheProcesso") as HTMLDialogElement);
        const { '@nextauth.token': token } = parseCookies();
        
        if (token) {
            api.get('/v1/usuarios/info').then(response => {
                const { id, nome, email, nodeareas, nodeprocessos, edges, reactflow } = response.data;
                console.log(response.data)
                setUser({ id, nome, email, nodeareas,nodeprocessos,edges,reactflow})
            }).catch(error => {
                //se deu erro deslogamos o user.
                signOut();
            });
        }

    }, [setdialogDetalheProcesso]);

    async function signIn({ email, senha }: SignInProps) {

        try {
            const response = await api.post("/v1/session", {
                email, senha
            })
            console.log(response.data)
            const { id, nome, token, nodeareas ,nodeprocessos,edges,reactflow} = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })
            setUser(
                {
                    id,
                    nome,
                    email,
                    nodeareas,
                    nodeprocessos,
                    edges,
                    reactflow
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
    async function signUp({ nome, email, senha }: SignUpProps) {
        try {
          const response = await api.post("/v1/usuarios", {
                nome, email, senha
            })
            toast.success("Cadastrado com sucesso",response.data);
            await setTimeout(() => {
                Router.push("/")
            }, 1000);
            Router.push("/")
        } catch (error) {
            toast.error("erro ao cadastrar" + error.response.data.error)
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
