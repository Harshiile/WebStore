import React from 'react'
import './style.css'

const Textfield = (props) => {
    return <>
        <div className="textField">
            <div className="formField">
                <input id={props.placeholder} name={props.placeholder} type="text" className="input" required={props.required} />
                <span>{props.placeholder}</span>
            </div>
        </div>
    </>
}

export default Textfield