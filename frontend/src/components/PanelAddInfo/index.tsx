
import styles from "./styles.module.scss"

export interface IPanelProps {
    title: String;
    position: Number[];
    callback: () => void;
}
export function PanelAddInfo(props: IPanelProps) {

    return (
        <div className={styles.container} style={{
            left: props.position[0] + "px",
            top: props.position[1] + "px",
        }}>
            <div className={styles.containerButtonClose}>
                <button onClick={() => { props.callback() }}>X</button>
            </div>
            <h1>{props.title}</h1>
            <input>
            </input>
            <span>adao ribeiro</span>
        </div>
    )

}
