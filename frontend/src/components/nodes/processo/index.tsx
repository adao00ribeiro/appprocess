import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"


export function NodeProcesso(props: NodeProps) {
    const onConnect = (params) => console.log('handle onConnect', params);
    return (
        <div className={styles.area}>
            <Handle id="top" type="source" position={Position.Top} onConnect={onConnect} />
            <Handle id="right" type="source" position={Position.Right} />
            <Handle id="bottom" type="source" position={Position.Bottom} />
            <h2>Processo</h2>
        </div>
    )

}


