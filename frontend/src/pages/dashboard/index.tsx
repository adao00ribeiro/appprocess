import Head from 'next/head'

import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  ConnectionMode,
  Node,
  updateEdge,
  NodeProps,
  Edge,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss'
import { BiExit, BiRestaurant } from 'react-icons/bi'
import NodeArea from '../../components/nodes/area/index';
import { NodeProcesso } from '../../components/nodes/processo';
import { NodeSubProcesso } from '../../components/nodes/subprocesso';
import { AuthContext, signOut } from '../../context/AuthContext';
import { DialogDetalheProcesso } from '../../components/DialogDetalheProcesso';
import DefaultEdge from '../../components/edges';
import { api } from '../../services/apiClient';
import { canSSRAuth } from '../../utils/canSSRAuth';


const NODE_TYPES = {
  area: NodeArea,
  processo: NodeProcesso,
  subprocesso: NodeSubProcesso
}
const EDGE_TYPES = {
  default: DefaultEdge
}
const flowKey = 'example-flow';
export default function DashBoard() {

  const edgeUpdateSuccessful = useRef(true);
  const { user, setUser, zoomOnScroll, setZoomOnScroll,
    isSelectable, setIsSelectable,
    panOnDrag, setpanOnDrag,
    isDraggable, setIsDraggable,

  } = useContext(AuthContext);
  const reactFlowWrapper = useRef(null);
  const dragRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // target is the node that the node is dragged over
  const [target, setTarget] = useState<Node>(null);
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key == "Delete") {
      DeleteNode();
    }
  };
  const onSave = useCallback(() => {

    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      if (!user.reactflow) {
        api.post('/v1/reactflow', { json: JSON.stringify(flow) }).then((response) => {
          console.log("criado")
          setUser({ ...user, reactflow: response.data });
        }).catch((error) => {
          console.log(error.response.data)
        })
      } else {
        let newflow = user.reactflow;
        newflow.flowJson = JSON.stringify(flow);
        console.log(newflow)
        api.put('/v1/reactflow', newflow).then((response) => {
          console.log("update")
          setUser({ ...user, reactflow: response.data });
        }).catch((error) => {
          console.log(error.response.data)
        })
      }
    }
  }, [reactFlowInstance, user]);


  const carregarHandle = useCallback(() => {

    const restoreFlow = async () => {
      if (user?.reactflow) {
        api.get(`/v1/reactflow/${user.reactflow.id}`).then((response) => {
          const json = response.data.flowJson;
          const flow = JSON.parse(json);
          const nodes = flow.nodes;
          nodes.map((item) => {
            item.data.update = updateNode
          })
          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(nodes || []);
            setEdges(flow.edges || []);
          }
        }).catch((error) => {
          console.log(error.response)
        })
      }
    };
    restoreFlow();
  }, [setNodes, user]);

  useEffect(() => {
    //problema
    //carregarHandle();

    document.addEventListener('keydown', onKeydown);
    return () => {

      document.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);


  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

  }, []);
  const onNodeMouseEnter = (event: React.MouseEvent, node: Node) => {

  }
  const onNodeMouseMove = (event: React.MouseEvent, node: Node) => {

  }
  const onNodeMouseLeave = (event: React.MouseEvent, node: Node) => {
    //console.log(event)
    //console.log(node.position)
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

    let newNode = null;
    if (type == "area") {
      newNode = {
        data: {
          label: `${type}`,
          descricao: "",
          update: updateNode,
        },
        dragging: false,
        height: 250,
        id: crypto.randomUUID(),
        parentNode: null,
        position,
        positionAbsolute: position,
        style: {
          width: 250,
          height: 250
        },
        type,
        width: 250,
        zIndex: 1,
      }

    } else if (type == "processo") {
      newNode =
      {
        data: {
          label: `${type}`,
          descricao: "",
          sistemasUtilizados: [],
          responsaveis: [],
          update: updateNode,
        },
        dragging: false,
        height: 50,
        id: crypto.randomUUID(),
        parentNode: null,
        position,
        positionAbsolute: position,
        style: {
          width: 100,
          height: 50
        },
        type,
        width: 100,
        zIndex: 1,
      }

    } else if (type == "subprocesso") {
      newNode =
      {
        data: {
          label: `${type}`,
          descricao: "",
          sistemasUtilizados: [],
          responsaveis: [],
          update: updateNode,

        },
        dragging: false,
        height: 50,
        id: crypto.randomUUID(),
        parentNode: null,
        position,
        positionAbsolute: position,
        style: {
          width: 100,
          height: 50
        },
        type,
        width: 100,
        zIndex: 1,
      }
    }
    setNodes((nds) => nds.concat(newNode));
  },
    [reactFlowInstance]
  );
  const onNodeDragStart = (evt, node) => {
    dragRef.current = node;
  };
  const updateNode = (nodeprops: NodeProps) => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id == nodeprops.id) {

          n.data.label = nodeprops.data.label;
          n.data.descricao = nodeprops.data.descricao;
          n.data.sistemasUtilizados = nodeprops.data.sistemasUtilizados;
          n.data.responsaveis = nodeprops.data.responsaveis;
        }
        return n;
      })
    );
  };
  const onNodeDrag = (evt, node: Node) => {
    setTarget(GetTarget(node));

  };
  const GetTarget = (node: Node) => {
    // calculate the center point of the node from position and dimensions
    const centerX = node.positionAbsolute?.x + node.width / 2;
    const centerY = node.positionAbsolute?.y + node.height / 2;

    // find a node where the center point is inside
    const targetNode = nodes.find(
      (n) =>
        centerX > n.positionAbsolute?.x &&
        centerX < n.positionAbsolute?.x + n.width &&
        centerY > n.positionAbsolute?.y &&
        centerY < n.positionAbsolute?.y + n.height &&
        n.id !== node.id // this is needed, otherwise we would always find the dragged node
    );

    return targetNode;
  }
  const onNodeDragStop = (evt, node: Node) => {
    // on drag stop, we swap the colors of the nodes

    if (node.type === target?.type) {
      console.log("nao pode ")
      return;
    }
    if (node.type == "area") {

      return;
    }
    if (target) {
      target.selected = false;

      const tempnodes = nodes.map((n) => {
        if (n.id == node.id && n.parentNode != target?.id) {

          n.parentNode = target.id;
          n.zIndex = 1;
          n.position = calculatePosition({ x: evt.x, y: evt.y }, n);

        }
        return n;
      })
      setNodes((nodes) =>
        tempnodes
      );
    }
    node.zIndex = 2
    setTarget(null);
    dragRef.current = null;

  };
  const calculatePosition = (positionmouse, node: Node) => {

    const parent = nodes.find((n) => n.id === node.parentNode);
    if (!parent) {
      return node.position; // retorna a posição atual se o nó não tiver pai
    }
    const parentPosition = parent.position;
    const childPosition = node.positionAbsolute;

    const childX = childPosition.x - parentPosition.x + node.width / 2;
    const childY = childPosition.y - parentPosition.y + node.height / 2;

    return { x: childX, y: childY };
  };
  const DeleteNode = async () => {
    const tempNodes = nodes.filter((n) => n.selected);
    if (tempNodes.length == 0) {
      return;
    }
    DeleteEdges(tempNodes[0].id)
    setNodes((nodes) =>
      nodes.filter((n) => !n.selected)
    );
  }
  const DeleteEdges = (idnode) => {
    setEdges((edges) =>
      edges.filter((n) => n.source != idnode && n.target != idnode)
    );
  }
  const handleExit = async () => {
    signOut();
  }
  return (
    <>
      <Head>
        <title>DashBoard</title>
        <meta name="description" content="DashBoard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <button onClick={carregarHandle}>Carregar</button>
        <button onClick={onSave}>Salvar</button>
        <h1>{user?.nome}</h1>
        <button className={styles.btnExit} onClick={handleExit}> <BiExit size={40}></BiExit></button>
      </header>
      <DialogDetalheProcesso
        setNodes={(nodeprops) => {
          updateNode(nodeprops)
        }}
      ></DialogDetalheProcesso>
      <div className={styles.containerCenter} ref={reactFlowWrapper}>
        <ReactFlow
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{
            type: 'default',
          }}
          onNodeMouseMove={onNodeMouseMove}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})