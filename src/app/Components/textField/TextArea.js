import React from 'react'

const TextArea = (props) => {
    return <>
        <div className="textField">
            <div className="formField">
                <textarea id={props.placeholder} name={props.placeholder} className="input" required={props.required}></textarea>
                <span>{props.placeholder}</span>
            </div>
        </div>
    </>
}

export default TextArea

