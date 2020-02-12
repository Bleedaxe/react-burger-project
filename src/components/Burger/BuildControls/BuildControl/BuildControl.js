import * as React from 'react';
import styles from './BuildControl.module.css';
const buildControl = (props) => {
    const isDisabledLess = props.count <= 0;
    return (React.createElement("div", { className: styles.BuildControl },
        React.createElement("div", { className: styles.Label }, props.name),
        React.createElement("button", { disabled: isDisabledLess, className: styles.Less, onClick: props.decrease }, "Less"),
        React.createElement("p", null, props.count),
        React.createElement("button", { className: styles.More, onClick: props.increase }, "More")));
};
export default buildControl;
//# sourceMappingURL=BuildControl.js.map