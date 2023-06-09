import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"
import { useState } from "react";


export function NodeSubProcesso(props: NodeProps) {
     const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.data.label);
    const onConnect = (params) => console.log('handle onConnect', params);
    
    const handleTextClick = () => {
        setEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setEditing(false);
        props.data.update(props.id , text);
    };
    return (
        <div className={styles.area}>
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


