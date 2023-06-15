import axios, { AxiosError } from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from 'react-toastify';
import { NodeProps } from "reactflow";
import { ISignUpProps } from "../interfaces/ISignUpProps";
import { UserProps } from "../interfaces/IUserProps";
import { IMyContextProps } from "../interfaces/IMyContextProps";
import { SignOut } from './signOut'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as IMyContextProps);

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
                setUser({ id, nome, email, nodeareas, nodeprocessos, edges, reactflow })
            }).catch(error => {
                //se deu erro deslogamos o user.
                SignOut();
            });
        }

    }, [setdialogDetalheProcesso]);




    const valueAuthContext: IMyContextProps = {
        user, setUser, isAuthenticated, SignIn, SignOut, SignUp, step, setStep, index, setIndex,
        IsAltered, setIsAltered,
        zoomOnScroll, setZoomOnScroll,
        isSelectable,
        setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable,
        dialogDetalheProcesso, setdialogDetalheProcesso,
        nodeSelecionado, setnodeSelecionado
    }
    return (
        <AuthContext.Provider value={valueAuthContext}>
            {children}
        </AuthContext.Provider>
    )

}
