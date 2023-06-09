import Head from 'next/head'

import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    Controls,
    Connection,
    ConnectionMode,
    Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useContext, useRef, useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import styles from './../styles/Home.module.scss'
import NodeArea from '../components/nodes/area/index';
import { NodeProcesso } from '../components/nodes/processo';
import { NodeSubProcesso } from '../components/nodes/subprocesso';
import { AuthContext } from '../context/AuthContext';
import { DialogDetalheProcesso } from '../components/DialogDetalheProcesso';

const NODE_TYPES = {
    area: NodeArea,
    processo: NodeProcesso,
    subprocesso: NodeSubProcesso
}
const initialNodes = [

];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Home() {
    const { zoomOnScroll, setZoomOnScroll,
        isSelectable, setIsSelectable,
        panOnDrag, setpanOnDrag,
        isDraggable, setIsDraggable
    } = useContext(AuthContext);
    const reactFlowWrapper = useRef(null);
    const dragRef = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    console.log(nodes)
    // target is the node that the node is dragged over
    const [target, setTarget] = useState<Node>(null);

    const onConnect = useCallback((connection: Connection) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

    }, []);
    const onNodeMouseEnter = (event: React.MouseEvent, node: Node) => {
        console.log(node)
    }
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const onDrop = useCallback((event) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        initialNodes.push(...nodes,)
        let newNode = null;
        if (type == "area") {
            newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type}`, update: updateNode },
                style: {
                    width: 250,
                    height: 250
                }
            }
        } else {
            newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type}`, update: updateNode },
            }
        }


        setNodes((nds) => nds.concat(newNode));
    },
        [reactFlowInstance]
    );
    const onNodeDragStart = (evt, node) => {
        dragRef.current = node;
    };
    const updateNode = (id, name) => {
        setNodes((nodes) =>
            nodes.map((n) => {
                if (n.id == id) {
                    n.data.label = name;
                }
                return n;
            })
        );
    };
    const onNodeDrag = (evt, node: Node) => {
        // calculate the center point of the node from position and dimensions
        const centerX = node.position.x + node.width / 2;
        const centerY = node.position.y + node.height / 2;

        // find a node where the center point is inside
        const targetNode = nodes.find(
            (n) =>
                centerX > n.position.x &&
                centerX < n.position.x + n.width &&
                centerY > n.position.y &&
                centerY < n.position.y + n.height &&
                n.id !== node.id // this is needed, otherwise we would always find the dragged node
        );

        setTarget(targetNode);
    };

    const onNodeDragStop = (evt, node: Node) => {


        // on drag stop, we swap the colors of the nodes
        const nodeColor = node.data.label;
        const targetColor = target?.data.label;
        if (node.type === target?.type) {
            return;
        }
        if (node.parentNode == target?.id) {
            console.log("ja é parente")
            return;
        }

        setNodes((nodes) =>
            nodes.map((n) => {
                if (n.id == node.id && target) {
                    n.parentNode = target.id;
                    n.zIndex = 1;
                    n.position = calculatePosition({ x: evt.x, y: evt.y }, n);
                }
                return n;
            })
        );

        setTarget(null);
        dragRef.current = null;
    };
    const calculatePosition = (positionmouse, node) => {

        const parent = nodes.find((n) => n.id === node.parentNode);
        if (!parent) {
            return node.position; // retorna a posição atual se o nó não tiver pai
        }
        const parentPosition = parent.position;
        const childPosition = node.position;

        const childX = positionmouse.x - parentPosition.x + node.width / 2;
        const childY = positionmouse.y - parentPosition.y + node.height / 2;

        return { x: childX, y: childY };
    };
    return (
        <>
            <Head>
                <title>Acessar</title>
                <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DialogDetalheProcesso></DialogDetalheProcesso>
            <div className={styles.containerCenter} ref={reactFlowWrapper}>
                <ReactFlow
                    nodeTypes={NODE_TYPES}
                    nodes={nodes}
                    edges={edges}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    zoomOnScroll={zoomOnScroll}
                    elementsSelectable={isSelectable}
                    panOnDrag={panOnDrag}
                    nodesDraggable={isDraggable}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDrag={onNodeDrag}
                    onNodeDragStop={onNodeDragStop}
                    minZoom={0.2}
                    maxZoom={20}
                    connectionMode={ConnectionMode.Loose}
                    className="react-flow-subflows-example"
                    fitView>
                    <Background />
                    <Controls />
                </ReactFlow>

                <aside className={styles.toolbarroot}>
                    <div className={styles.containerDrag} onDragStart={(event) => onDragStart(event, 'area')} draggable>
                        <p> Area</p>
                    </div>
                    <div className={styles.containerDrag} onDragStart={(event) => onDragStart(event, 'processo')} draggable>
                        <p>Processo</p>
                    </div>
                    <div className={styles.containerDrag} onDragStart={(event) => onDragStart(event, 'subprocesso')} draggable>
                        <p>Sub-Processo</p>
                    </div>
                </aside>

            </div>
        </>
    )
}

/*
export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})
 
                <Toolbar.Root className={styles.toolbarroot}>
                    <Toolbar.Button
                        className={styles.btnarea}
                        name='area'
                        onDragStart={(event) => onDragStart(event, 'area')}
                    >Area</Toolbar.Button>
                    <Toolbar.Button
                        className={styles.btnarea}
                        name='Processo'
                    >Processo</Toolbar.Button>
                    <Toolbar.Button
                        className={styles.btnarea}
                        name='Sub Processo'
                    >Sub Processo</Toolbar.Button>
                </Toolbar.Root>
                
*/