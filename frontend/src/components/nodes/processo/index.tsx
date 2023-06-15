import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"
import { useContext, KeyboardEvent, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
/*Permitir ver o detalhamento dos processos, como sistemas utilizados, pessoas
responsáveis e documentação
*/
export function NodeProcesso(props: NodeProps) {
    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable,
        dialogDetalheProcesso, setdialogDetalheProcesso,
        nodeSelecionado, setnodeSelecionado
    } = useContext(AuthContext);

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.data.label);
    const onConnect = (params) => console.log('handle onConnect', params);

    const handleTextClick = () => {
        setEditing(true);
        setZoomOnScroll(false);
        setIsSelectable(false);
        setpanOnDrag(false);
        setIsDraggable(false);
    };

    const handleInputChange = (event) => {

        const novo = {
            ...nodeSelecionado,
            data: {
                ...nodeSelecionado.data,
                label: text,
            },
        }
        setnodeSelecionado(novo);
        props.data.update(novo);
        setText(event.target.value);
    };
    const onkeydown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            handleInputBlur();
        }
    }
    const handleInputBlur = () => {
        setEditing(false);
        setZoomOnScroll(true);
        setIsSelectable(true);
        setpanOnDrag(true);
        setIsDraggable(true);
        props.data.update(props.id, text);
    };

    function openModal() {
        setZoomOnScroll(false)
        setIsSelectable(false);
        setpanOnDrag(false);
        setIsDraggable(true);
        dialogDetalheProcesso.showModal();
    }
    return (
        <>
            <div className={styles.processo} onClick={() => { setnodeSelecionado(props) }}>
                {editing ? (
                    <input
                        type="text"
                        value={text}
                        onKeyDown={onkeydown}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                ) : (
                    <span className={styles.areaTitle} onClick={handleTextClick}>{text}</span>
                )}
                <div className={styles.container} onDoubleClick={() => { openModal() }}>
                    <Handle id="top" type="target" position={Position.Top} onConnect={onConnect} />
                    <Handle id="right" type="source" position={Position.Right} />
                    <Handle id="bottom" type="source" position={Position.Bottom} />
                </div>
            </div >
        </>

    )

}


