import React from 'react'
import Dragdropbox from '@/app/Components/Dragdropbox/Dragdropbox.js'

const Testimonails = () => {
    return <>
        <div className="dropbox_section">
            <p>Testimonial 1 : </p>
            <Dragdropbox id="testi-1" />
        </div>

        <div className="dropbox_section">
            <p>Testimonial 2 : </p>
            <Dragdropbox id="testi-2" />
        </div>

        <div className="dropbox_section">
            <p>Testimonial 3 : </p>
            <Dragdropbox id="testi-3" />
        </div>
    </>
}

export default Testimonails
