import { toast } from "react-toastify";
import { ISignUpProps } from "../interfaces/ISignUpProps";
import { api } from "../services/apiClient";
import Router from "next/router";

export async function SignUp({ nome, email, senha }: ISignUpProps) {
    try {
        const response = await api.post("/v1/usuarios", {
            nome, email, senha
        })
        toast.success("Cadastrado com sucesso", response.data);
        await setTimeout(() => {
            Router.push("/")
        }, 1000);
        Router.push("/")
    } catch (error) {
        toast.error("erro ao cadastrar" + error.response.data.error)
    }
}