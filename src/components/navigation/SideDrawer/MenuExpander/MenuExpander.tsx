import * as React from 'react';
import styles from './MenuExpander.module.css';

const expander = (props: {
    action: () => void;
}) => {
    return (
        <div className={styles.MenuExpander}
            onClick={props.action}>
                <div></div>
                <div></div>
                <div></div>
        </div>
    );
}

export default expander;