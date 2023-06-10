import { MouseEventHandler, useContext, useState } from "react";
import styles from "./styles.module.scss"
import { AuthContext } from "../../context/AuthContext";
import { PanelAddInfo } from "../PanelAddInfo";



export function DialogDetalheProcesso() {
    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable, dialogDetalheProcesso, setdialogDetalheProcesso
    } = useContext(AuthContext);
    const [isShownSistema, setisShownSistema] = useState(false);
    const [isShownResponsaveis, setisShownResponsaveis] = useState(false);
    const [position, setPosition] = useState([0, 0]) // State to save the position where you 
    const OpenPanelSistema = (event: React.MouseEvent<HTMLButtonElement>) => {
        setisShownSistema(true)
        setPosition([event.pageX, event.pageY]) // Save the pos where you clicked
        closePanelResponsaveis();
    }
    function OpenPanelResponsavel(event: React.MouseEvent<HTMLButtonElement>) {
        setisShownResponsaveis(true)
        setPosition([event.pageX, event.pageY]) // Save the pos where you clicked
        closePanelSistemas();
    }
    const closePanelSistemas = () => {
        setisShownSistema(false)

    }
    const closePanelResponsaveis = () => {
        setisShownResponsaveis(false)
    }
    function HandleCloseDialogDetalhe() {
        setZoomOnScroll(true);
        setIsSelectable(true);
        setpanOnDrag(true);
        setIsDraggable(true);
        dialogDetalheProcesso.close();
    }
    return (
        <dialog id="dialogDetalheProcesso" className={styles.modal}>
            <div className={styles.containerModal}>
                <div className={styles.childdivmodal}>
                    <button onClick={() => { HandleCloseDialogDetalhe() }}>X</button>
                </div>
                <div className={styles.containerInformacoes}>
                    <h1>{ }</h1>
                    <div className={styles.containerInformacoesGroup}>
                        <div className={styles.containerTextArea}>
                            <label htmlFor="">Descricao</label>
                            <textarea placeholder="Descrição"></textarea>
                        </div>
                        <div className={styles.containerButtons}>
                            <button onClick={OpenPanelSistema}>Sistemas utilizados</button>
                            <button onClick={OpenPanelResponsavel}>Responsaveis</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShownSistema &&
                <PanelAddInfo title={"Sistemas Utilizados"} position={position} callback={closePanelSistemas} ></PanelAddInfo>}

            {isShownResponsaveis &&
                <PanelAddInfo title={"Responsaveis"} position={position} callback={closePanelResponsaveis}></PanelAddInfo>
            }

        </dialog>
    )
}