"use client"
import { React, useState } from 'react'
import Business_Details from '../Form-pages/Business_details/Business_Details.js'
import Contact from '../Form-pages/Contact/Contact.js'
import Testimonails from '../Form-pages/Testimonials/Testimonails.js'
import './style.css'

const Form = () => {
    const tagLines = [
        'Let\'s know about your business',
        'Let\'s increase your Network',
        'Drop out some of your customer\'s reviews'
    ];
    const [currentPage, setcurrentPage] = useState(1)

    const goPrevious = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    const goNext = () => {
        if (currentPage < tagLines.length) {
            setcurrentPage(currentPage + 1)
        }
    }

    const handleSubmit = data => {
        let x = data;
        console.log(x);
    }

    return <>
        <div className="main-container">
            {/* <img src={bgImage} /> */}
            <div className="container">
                <div className="left">
                    <div className="business_name">
                        {/* <div className="logo"><img src=""></div> */}
                        <div className="wt_name">WebTree</div>
                    </div>
                    <div className="left_list">
                        <ul>
                            <li>
                                <p className="circleticks">1</p>
                                <p>Business details</p>
                            </li>
                            <li>
                                <p className="circleticks">2</p>
                                <p>About Business</p>
                            </li>
                            <li>
                                <p className="circleticks">3</p>
                                <p>Features</p>
                            </li>
                            <li>
                                <p className="circleticks">4</p>
                                <p>Testimonials</p>
                            </li>
                            <li>
                                <p className="circleticks">5</p>
                                <p>Contact details</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <div className="form_details">
                        <h2>{tagLines[currentPage - 1]}</h2>
                        <form className="form-content" onSubmit={handleSubmit}>
                            {currentPage == 1 && <Business_Details />}
                            {currentPage == 2 && <Testimonails />}
                            {currentPage == 3 && <Contact />}

                            <div className="tooltip-container prev_btn">
                                <span className="tooltip">Previous</span>
                                <span className="text"><img src="" onClick={goPrevious} /></span>
                            </div>
                            {currentPage != tagLines.length ?
                                <>
                                    <div className="tooltip-container next_btn">
                                        <span className="tooltip">Next</span>
                                        <span className="text"><img src="" onClick={goNext} /></span>
                                    </div>
                                </>
                                :
                                <button className='submit'>Submit</button>
                            }
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Form
