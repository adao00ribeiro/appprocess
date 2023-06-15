import React, { SetStateAction, Dispatch } from 'react'
import { UserProps } from "./IUserProps";

export interface ISignInProps {
    email: string;
    senha: string;
    setUser: Dispatch<SetStateAction<UserProps>>
}