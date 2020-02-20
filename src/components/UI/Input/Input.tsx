import React from "react";
import styles from "./Input.module.css";

interface BaseProps {
  label: string;
}

interface ValidateProps extends BaseProps {
  valid: boolean;
  touched: boolean;
}

interface InputProps
  extends ValidateProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}

interface TextAreaProps
  extends ValidateProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {}

interface OptionElement {
  value: string;
  displayValue: string;
}

interface SelectProps
  extends BaseProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    > {
  options?: Array<OptionElement>;
}

const getInputContainer = (inputElement: JSX.Element, label: string) => {
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default {
  input: ({ label, valid, touched, ...props }: InputProps) => {
    const inputClasses = [styles.InputElement];
    if (valid === false && touched) {
      inputClasses.push(styles.Invalid);
    }
    const element = <input className={inputClasses.join(" ")} {...props} />;
    return getInputContainer(element, label);
  },
  textarea: ({ label, valid, touched, ...props }: TextAreaProps) => {
    const inputClasses = [styles.InputElement];
    if (valid === false && touched) {
      inputClasses.push(styles.Invalid);
    }
    const element = <textarea className={inputClasses.join(" ")} {...props} />;
    return getInputContainer(element, label);
  },
  select: ({ label, value, onChange, options }: SelectProps) => {
    const optionElements = options
      ? options.map((element: OptionElement) => (
          <option key={element.value} value={element.value}>
            {element.displayValue}
          </option>
        ))
      : null;
    const element = (
      <select className={styles.InputElement} value={value} onChange={onChange}>
        {optionElements}
      </select>
    );
    return getInputContainer(element, label);
  }
};
