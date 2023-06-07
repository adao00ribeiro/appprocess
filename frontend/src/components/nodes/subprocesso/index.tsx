import { NodeProps, Handle, Position } from "reactflow";
import styles from "./styles.module.scss"


export function NodeSubProcesso(props: NodeProps) {
    const onConnect = (params) => console.log('handle onConnect', params);
    return (
        <div className={styles.area}>
            <Handle id="left" type="source" position={Position.Left} onConnect={onConnect} />
            <Handle id="right" type="source" position={Position.Right} />
            <h2>Sub Processo</h2>
        </div>
    )

}


