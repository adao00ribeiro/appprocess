import { NodeProps, Handle, Position, NodeResizeControl, NodeResizer } from "reactflow";
import styles from "./styles.module.scss"
import { memo, useState } from 'react';
export interface NodeAreaProps extends NodeProps {
    color: "#ff0071";
}
function NodeArea(props: NodeAreaProps) {

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
        props.data.update(props.id, text);
    };

    return (
        <>
            <NodeResizer color={props.color} isVisible={props.selected} minWidth={250} minHeight={250}

            />
            <Handle type="target" position={Position.Left} />
            <div className={styles.area}>
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
            <Handle type="source" position={Position.Right} />
        </>
    )

}

export default memo(NodeArea);
