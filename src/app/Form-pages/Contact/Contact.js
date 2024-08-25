import React from 'react'
import TextArea from '@/app/Components/textField/TextArea.js'
import Textfield from '@/app/Components/textField/Textfield.js'

const Contact = () => {
    return <>

        <Textfield placeholder="Email" required={true} />
        <Textfield placeholder="Phone no" required={true} />
        <TextArea placeholder="Address" required={true} />

    </>
}

export default Contact
