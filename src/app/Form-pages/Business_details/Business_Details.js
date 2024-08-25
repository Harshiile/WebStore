import React from 'react'
import Dragdropbox from '@/app/Components/Dragdropbox/Dragdropbox.js'
import Textfield from '@/app/Components/textField/Textfield.js'


const Business_Details = () => {
    return <>
        <div className="dropbox_section">
            <p>Logo of Business</p>
            <Dragdropbox id="logo" />
        </div>

        <div className="dropbox_section">
            <p>Landscape image of your business work</p>
            <Dragdropbox id="mainimage" />
        </div>

        <Textfield placeholder="Name of business" required={true} />
        <Textfield placeholder="Tag line if any" required={true} />
    </>
}

export default Business_Details
