import { NodeProps, Handle, Position, NodeResizeControl, NodeResizer } from "reactflow";
import styles from "./styles.module.scss"
import { memo, useContext, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";


function NodeArea(props: NodeProps) {
  const { 
        nodeSelecionado,setnodeSelecionado
    } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props?.data?.label);

    const onConnect = (params) => console.log('handle onConnect', params);

    const handleTextClick = () => {
        setEditing(true);
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
        props.data.update(props.id, text);
    };

    return (
        <div className={styles.area} onClick={()=>{setnodeSelecionado(props)}} >
            <NodeResizer  isVisible={props.selected} minWidth={250} minHeight={250}
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
