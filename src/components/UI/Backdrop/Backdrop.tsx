import * as React from 'react';
import styles from './Backdrop.module.css';

const backdrop = (props: {show: boolean, cancel: () => void}) => (
    props.show 
        ? <div 
            className={styles.Backdrop}
            onClick={props.cancel}></div>
        : null
);

export default backdrop;