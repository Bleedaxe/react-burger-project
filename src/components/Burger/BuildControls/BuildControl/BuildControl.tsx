import * as React from 'react';
import styles from './BuildControl.module.css';

interface BuildControlProps {
    name: string;
    count: number;
    increase: () => void;
    decrease: () => void;
}
const buildControl = (props: BuildControlProps) => {
    const isDisabledLess = props.count <= 0;
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.name}</div>
            <button
                disabled={isDisabledLess}
                className={styles.Less} 
                onClick={props.decrease}>Less</button>
            <p>{props.count}</p>
            <button 
                className={styles.More}
                onClick={props.increase}>More</button>
        </div>
    );
}

export default buildControl;