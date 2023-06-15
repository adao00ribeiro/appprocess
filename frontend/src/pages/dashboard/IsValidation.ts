import { Connection, Node } from "reactflow";

export const isValidConnection = (connection: Connection, nodes: Node[], edges) => {
    const sourceNode = nodes.find(item => {
        return item.id == connection.source
    })
    const targetNode = nodes.find(item => {
        return item.id == connection.target
    })
    if (sourceNode.type == targetNode.type) {
        return true
    }
    if (sourceNode.type == 'processo' && targetNode.type == 'subprocesso') {
        return true
    }
    return false;
}