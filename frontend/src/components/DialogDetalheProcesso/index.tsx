import { ChangeEvent,KeyboardEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { AuthContext } from "../../context/AuthContext";
import { PanelAddInfo } from "../PanelAddInfo";

export interface IDialogDetalheProcesso{
    setNodes:(nodeprops)=>void
}
export function DialogDetalheProcesso(props:IDialogDetalheProcesso) {

    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable, dialogDetalheProcesso, setdialogDetalheProcesso,
        nodeSelecionado,setnodeSelecionado
    } = useContext(AuthContext);
  
    const [isShownSistema, setisShownSistema] = useState(false);
    const [isShownResponsaveis, setisShownResponsaveis] = useState(false);
    const [position, setPosition] = useState([0, 0]) // State to save the position where you 
    useEffect(() => {
        setdialogDetalheProcesso(document.getElementById("dialogDetalheProcesso") as HTMLDialogElement);

    }, [setdialogDetalheProcesso]);
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
    const onChangeHandle = (event:ChangeEvent<HTMLTextAreaElement>)=>{
        const novo = {
            ...nodeSelecionado,
            data: {
              ...nodeSelecionado.data,
              descricao: event.target.value,
            },
          };
         setnodeSelecionado(novo);
          props.setNodes(novo)
    }
    return (
        <dialog id="dialogDetalheProcesso" className={styles.modal}>
            <div className={styles.containerModal}>
                <div className={styles.childdivmodal}>
                    <button onClick={() => { HandleCloseDialogDetalhe() }}>X</button>
                </div>
                <div className={styles.containerInformacoes}>
                    <h1>{nodeSelecionado?.data?.label}</h1>
                    <div className={styles.containerInformacoesGroup}>
                        <div className={styles.containerTextArea}>
                            <label htmlFor="textarea">Descricao</label>
                            <textarea id="textarea" value={nodeSelecionado?.data?.descricao} placeholder="" onChange={onChangeHandle}></textarea>
                        </div>
                        <div className={styles.containerButtons}>
                            <button onClick={OpenPanelSistema}>Sistemas utilizados</button>
                            <button onClick={OpenPanelResponsavel}>Responsaveis</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShownSistema &&
                <PanelAddInfo  
                info={nodeSelecionado.data.sistemasUtilizados} 
                save={(sistemasUtilizados) => {
                    const novo = {
                        ...nodeSelecionado,
                        data: {
                          ...nodeSelecionado.data,
                          sistemasUtilizados: sistemasUtilizados,
                        },
                      }
                    setnodeSelecionado(novo);
                    props.setNodes(novo)
                  }}


                title={"Sistemas Utilizados"} 
                position={position} 
                callback={closePanelSistemas} ></PanelAddInfo>}

            {isShownResponsaveis &&
               <PanelAddInfo info={nodeSelecionado.data.responsaveis}
              save={(responsaveis) => {
                const novo = {
                    ...nodeSelecionado,
                    data: {
                      ...nodeSelecionado.data,
                      responsaveis: responsaveis,
                    },
                  }
                setnodeSelecionado(novo);
                props.setNodes(novo)
              }}
                 title={"Responsaveis"} position={position} 
                 callback={closePanelResponsaveis}></PanelAddInfo>
            }

        </dialog>
    )
}