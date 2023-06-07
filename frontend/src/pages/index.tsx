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
import { useCallback, useRef, useState } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import styles from './../styles/Home.module.scss'
import { NodeArea } from '../components/nodes/area/index';
import { NodeProcesso } from '../components/nodes/processo';
import { NodeSubProcesso } from '../components/nodes/subprocesso';

const NODE_TYPES = {
    area: NodeArea,
    processo: NodeProcesso,
    subprocesso: NodeSubProcesso
}
const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Node 0' },
        position: { x: 250, y: 5 },
        className: 'light',
    },
    {
        id: '2',
        type: 'area',
        data: { label: 'Group A' },
        position: { x: 100, y: 100 },
        className: 'light',
        style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
    },
    {
        id: '2a',
        data: { label: 'Node A.1' },
        position: { x: 10, y: 50 },
        parentNode: '2',
    },
    { id: '3', data: { label: 'Node 1' }, position: { x: 320, y: 100 }, className: 'light' },
    {
        id: '4',
        data: { label: 'Group B' },
        position: { x: 320, y: 200 },
        className: 'light',
        style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
    },
    {
        id: '4a',
        data: { label: 'Node B.1' },
        position: { x: 15, y: 65 },
        className: 'light',
        parentNode: '4',
        extent: 'parent',
    },
    {
        id: '4b',
        data: { label: 'Group B.A' },
        position: { x: 15, y: 120 },
        className: 'light',
        style: { backgroundColor: 'rgba(255, 0, 255, 0.2)', height: 150, width: 270 },
        parentNode: '4',
    },
    {
        id: '4b1',
        data: { label: 'Node B.A.1' },
        position: { x: 20, y: 40 },
        className: 'light',
        parentNode: '4b',
    },
    {
        id: '4b2',
        data: { label: 'Node B.A.2' },
        position: { x: 100, y: 100 },
        className: 'light',
        parentNode: '4b',
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Home() {
    const reactFlowWrapper = useRef(null);
    const dragRef = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    // target is the node that the node is dragged over
    const [target, setTarget] = useState<Node>(null);

    const onConnect = useCallback((connection: Connection) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
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
        const newNode: Node = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },

        }

        setNodes((nds) => nds.concat(newNode));
    },
        [reactFlowInstance]
    );
    const onNodeDragStart = (evt, node) => {
        dragRef.current = node;
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

        setNodes((nodes) =>
            nodes.map((n) => {

                if (n.id == node.id && target) {
                    console.log(target.data.label)
                }
                return n;
            })
        );

        setTarget(null);
        dragRef.current = null;
    };
    return (
        <>
            <Head>
                <title>Acessar</title>
                <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.containerCenter} ref={reactFlowWrapper}>
                <ReactFlow
                    nodeTypes={NODE_TYPES}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDrag={onNodeDrag}
                    onNodeDragStop={onNodeDragStop}
                    connectionMode={ConnectionMode.Loose}
                    className="react-flow-subflows-example"
                    fitView>
                    <Background />
                    <Controls />
                </ReactFlow>
                <aside className={styles.toolbarroot}>
                    <div className={styles.containerDrag} onDragStart={(event) => onDragStart(event, 'group')} draggable>
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