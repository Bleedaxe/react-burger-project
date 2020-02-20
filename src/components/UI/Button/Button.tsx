import * as React from "react";
import styles from "./Button.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  btnType: "Danger" | "Success";
}

const button = ({ btnType, ...props }: ButtonProps) => {
    const classNames = [styles.Button, styles[btnType]];
    if(props.disabled) {
        classNames.push(styles.Disabled)
    }

  return (
    <button className={classNames.join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default button;
