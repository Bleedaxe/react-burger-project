import * as React from 'react';
import styles from './Button.module.css';

const button = (props: {
    clicked: (event: React.MouseEvent) => void;
    children: any;
    btnType: "Danger" | "Success";
}) => (
    <button
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;