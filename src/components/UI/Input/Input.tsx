import React from 'react'
import styles from './Input.module.css';

interface BaseProps {
    label: string;
}

interface InputProps extends BaseProps, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

interface TextAreaProps extends BaseProps, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> { }

interface OptionElement {
    value: string;
    displayValue: string;
}

interface SelectProps extends BaseProps, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> { 
    options?: Array<OptionElement>
}

const getInputContainer = (
    inputElement: JSX.Element,
    label: string
    ) => {
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{label}</label>
            {inputElement}
        </div>
    );
}

export default {
    input: ({ label, ...props }: InputProps) => {
        const element = <input className={styles.InputElement} {...props}/>
        return getInputContainer(element, label);
    },
    textarea: ({ label, ...props }: TextAreaProps) => {
        const element = <textarea className={styles.InputElement} {...props}/>
        return getInputContainer(element, label);
    },
    select: ({ label, value, options }: SelectProps) => {
        const optionElements = options ? options.map((element: OptionElement) => (
            <option
                key={element.value}
                value={element.value}>
                {element.displayValue}
            </option>
        )) : null;
        const element = 
            <select className={styles.InputElement} value={value}>
                {optionElements}
            </select>
        return getInputContainer(element, label);
    },
}