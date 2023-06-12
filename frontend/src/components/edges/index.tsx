import { EdgeProps, getSmoothStepPath } from "reactflow"
import styles from './styles.module.scss'

export default function DefaultEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd }: EdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY, targetPosition
    });

    return (
      
            <path
                id={id}
                style={style}
                className={"react-flow__edge-path"+" "+styles.path}
                d={edgePath}
                markerEnd={markerEnd}
            />
        
    )


}