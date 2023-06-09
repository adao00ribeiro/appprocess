import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
/*Permitir ver o detalhamento dos processos, como sistemas utilizados, pessoas
responsáveis e documentação
*/
export function NodeProcesso(props: NodeProps) {
    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag
    } = useContext(AuthContext);
    const [dialogQRcode, setDialogQRcode] = useState<HTMLDialogElement>()
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.data.label);
    const onConnect = (params) => console.log('handle onConnect', params);

    useEffect(() => {
        setDialogQRcode(document.getElementById("dialogDetalhe") as HTMLDialogElement);
    }, []);
    const handleTextClick = () => {
        setEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setEditing(false);

        props.data.update(props.id, text);
    };
    function openModal() {

        setZoomOnScroll(false)
        setIsSelectable(false);
        setpanOnDrag(false);
        dialogQRcode.showModal();
    }

    function closeModal() {
        setZoomOnScroll(true);
        setIsSelectable(true);
        setpanOnDrag(true);
        dialogQRcode.close();
    }
    return (
        <>
            <div className={styles.processo} onClick={() => { openModal() }}>
                <Handle id="top" type="target" position={Position.Top} onConnect={onConnect} />
                <Handle id="right" type="source" position={Position.Right} />
                <Handle id="bottom" type="source" position={Position.Bottom} />
                {editing ? (
                    <input
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        autoFocus
                    />
                ) : (
                    <h2 className={styles.areaTitle} onClick={handleTextClick}>{text}</h2>
                )}

            </div>
            <dialog id="dialogDetalhe" className={styles.modal}>
                <div className={styles.containerModal}>
                    <div className={styles.childdivmodal}>
                        <button onClick={() => { closeModal() }}>X</button>
                    </div>
                    <div className={styles.containerInformacoes}>
                        <h1>{props.data.label}</h1>
                        <div className={styles.containerInformacoesGroup}>
                            <div className={styles.containerTextArea}>
                                <label htmlFor="">Descricao</label>
                                <textarea placeholder="Descrição"></textarea>
                            </div>
                            <div className={styles.containerButtons}>
                                <button>Sistemas utilizados</button>
                                <button>Responsaveis</button>
                            </div>
                        </div>
                    </div>


                </div>
            </dialog>
        </>

    )

}


