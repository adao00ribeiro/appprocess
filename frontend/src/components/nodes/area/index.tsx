import { NodeProps, Handle, Position, NodeResizeControl, NodeResizer } from "reactflow";
import styles from "./styles.module.scss"
import { memo, useState } from 'react';
import { IArea } from "../../../interfaces/IArea";

function NodeArea(props: IArea) {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props?.data?.label);

    const onConnect = (params) => console.log('handle onConnect', params);

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

    return (
        <div className={styles.area} onClick={(event) => { console.log("entrer") }} onSelect={(event) => { console.log("entasdarer") }}>
            <NodeResizer color={props.color} isVisible={props.selected} minWidth={250} minHeight={250}
            />
            <Handle type="target" position={Position.Left} />
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
            <Handle type="source" position={Position.Right} />
        </div>

    )

}

export default memo(NodeArea);
