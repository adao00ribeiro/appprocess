
import { ChangeEvent,  useState,KeyboardEvent } from "react";
import styles from "./styles.module.scss"
import { NodeProps } from "reactflow";

export interface IPanelProps {
    title: String;
    position: Number[];
    info:string[],
    save:(list)=>void
    callback: () => void;
}
export function PanelAddInfo(props: IPanelProps) {
        console.log(props.info)
    const [input,setinput] = useState('');
      const onKeyDown = (event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key == "Enter"){
            const updatedResponsavais = [...props.info, input];
            props.save(updatedResponsavais);
           setinput("");
        }
    }
    const onChangeHandle = (event:ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target;
        setinput( value );
    }
    return (
        <div className={styles.container} style={{
            left: props.position[0] + "px",
            top: props.position[1] + "px",
        }}>
            <div className={styles.containerButtonClose}>
                <button onClick={() => { props.callback() }}>X</button>
            </div>
            <h1>{props.title}</h1>
            <input name="input" value={input }  onChange={onChangeHandle} onKeyDown={onKeyDown}>
            </input>
            {props.info&&
            props.info.map((item,index)=>{
                    return(                       
                         <span key={index}>{item}</span>)
            })
            }
        </div>
    )

}
