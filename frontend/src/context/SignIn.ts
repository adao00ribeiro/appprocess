import React, { createContext, useContext } from 'react';
import { setCookie } from "nookies";
import { ISignInProps } from "../interfaces/ISignInProps";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";
import Router from "next/router";

export async function SignIn({ email, senha, setUser }: ISignInProps) {

    try {
        const response = await api.post("/v1/session", {
            email, senha
        })
        const { id, nome, token, nodeareas, nodeprocessos, edges, reactflow } = response.data;
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