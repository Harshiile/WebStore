import React from 'react'
import './style.css'

const Dragdropbox = (props) => {
    return <>
        <div className="file-upload-form">
            <label className="file-upload-label">
                <div className="file-upload-design">
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                </div>
                <input type="file" name={props.id} id={props.id} />
            </label>
        </div>
    </>
}

export default Dragdropbox
