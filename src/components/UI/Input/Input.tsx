import React from 'react'

const INPUT_TYPES = {
    input: <input />,
    textare: <textarea></textarea>
}

interface InputProps {
    inputType: 'input' | 'textarea';
    label: string;
}

export default function input(props: InputProps) {
    let inputElement
    return (
        <div>
            <label>{props.label}</label>
        </div>
    );
}