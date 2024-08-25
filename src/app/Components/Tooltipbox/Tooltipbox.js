"use client"
import React from 'react'
import './style.css'
import caretleft from './Assets/caret-left-svgrepo-com.svg'
import caretright from './Assets/caret-right-svgrepo-com.svg'

const goPrevious = (currentPage, setcurrentPage) => {
    if (currentPage > 1) {
        setcurrentPage(currentPage - 1)
    }
}
const goNext = (currentPage, setcurrentPage) => {
    setcurrentPage(currentPage + 1)
}

const Tooltipbox = (props) => {
    return <>
        <div className="tooltip-container prev_btn">
            <span className="tooltip">Previous</span>
            <span className="text"><img src={caretleft} onClick={() => { goPrevious(props.currentPage, props.setcurrentPage) }} /></span>
        </div>
        <div className="tooltip-container next_btn">
            <span className="tooltip">Next</span>
            <span className="text"><img src={caretright} onClick={() => { goNext(props.currentPage, props.setcurrentPage) }} /></span>
        </div>
    </>
}

export default Tooltipbox
