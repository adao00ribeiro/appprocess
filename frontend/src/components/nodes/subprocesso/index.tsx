import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";


export function NodeSubProcesso(props: NodeProps) {
    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable,
        dialogDetalheProcesso, setdialogDetalheProcesso,
        nodeSelecionado,setnodeSelecionado
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
        <div className={styles.subprocesso} onClick={()=>{setnodeSelecionado(props)}} onDoubleClick={() => { openModal() }}>
            <Handle id="left" type="target" position={Position.Left} onConnect={onConnect} isConnectable />
            <Handle id="right" type="source" position={Position.Right} />
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
    )

}


