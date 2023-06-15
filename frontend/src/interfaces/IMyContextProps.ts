import { Dispatch, SetStateAction } from "react";
import { NodeProps } from "reactflow";
import { ISignInProps } from "./ISignInProps";
import { ISignUpProps } from "./ISignUpProps";
import { UserProps } from "./IUserProps";

export interface IMyContextProps {
    user: UserProps;
    setUser: Dispatch<SetStateAction<UserProps>>,
    isAuthenticated: boolean;
    SignIn: (credentials: ISignInProps) => Promise<void>;
    SignOut: () => void;
    SignUp: (credentials: ISignUpProps) => Promise<void>;
    step: number,
    setStep: Dispatch<SetStateAction<number>>,
    index: number,
    setIndex: Dispatch<SetStateAction<number>>,
    IsAltered: boolean
    setIsAltered: Dispatch<SetStateAction<boolean>>,
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