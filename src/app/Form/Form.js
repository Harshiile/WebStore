"use client"
import { React, useState } from 'react'
import Image from 'next/image'
import './CSSs/style.css'
import './CSSs/DragDrop.css'
import './CSSs/Textfield.css'
import './CSSs/ToolTips.css'
import caretleft from './Assets/caret-left-svgrepo-com.svg'
import caretright from './Assets/caret-right-svgrepo-com.svg'
import bgImage from './Assets/Home-page-Bg-Image.png'
import { useForm } from 'react-hook-form';

const formPages = [
    {
        tagline: 'Let\'s know about your business',
        fields: ['Name_of_business', 'Tagline']
    },
    {
        tagline: 'Let\'s increase your Network',
        fields: ['Email', 'Phone', 'Address']
    }
    // 'Drop out some of your customer\'s reviews - 3rd tagline'
];

const dragDropFunction = e => {
    e.preventDefault();
    console.log(e.target.lastElementChild);


}
const Form = () => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm()

    const [Images, setImages] = useState([])
    const [currentPage, setcurrentPage] = useState(0)

    const goPrevious = () => {
        if (currentPage > 0) {
            setcurrentPage(currentPage - 1)
        }
    }
    const goNext = async () => {
        const fields = formPages[currentPage].fields;
        console.log(fields);

        const output = await trigger([...fields], { shouldFocus: true });

        if (!output) return

        if (currentPage < formPages[currentPage].tagline.length) {
            setcurrentPage(currentPage + 1)
        }
    }

    const onFormSubmit = data => {
        let x = data;
        console.log(x);
        console.log(Images);
    }

    const uploadImage = (e) => {
        let canvas = e.target.previousElementSibling;
        let labelcanvas = e.target.parentElement;
        canvas.style.opacity = "0";
        let imageUrl = URL.createObjectURL(e.target.files[0])
        labelcanvas.style.backgroundImage = `url(${imageUrl})`;
        labelcanvas.style.border = "2px solid black";

        setImages([...Images, { from: e.target.id, value: imageUrl }])
    }

    return <>
        <div className="main-container">
            <Image src={bgImage} alt="Background-Image" />
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
                        <h2>{formPages[currentPage].tagline}</h2>
                        <form className="form-content" onSubmit={handleSubmit(onFormSubmit)}>


                            {currentPage == 0 && <>
                                {/* ---------------Business_Details--------------- */}
                                <div className="business-details">
                                    <div className="dropbox_section">
                                        <p>Logo of Business</p>
                                        <div className="file-upload-form">
                                            <label className="file-upload-label">
                                                <div className="file-upload-design">
                                                    <p>Drag and Drop</p>
                                                    <p>or</p>
                                                    <span className="browse-button">Browse file</span>
                                                </div>
                                                <input type="file" id="logo" name="logo" onChange={uploadImage} />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="dropbox_section">
                                        <p>Landscape image of your business work</p>
                                        <div className="file-upload-form">
                                            <label className="file-upload-label">
                                                <div className="file-upload-design">
                                                    <p>Drag and Drop</p>
                                                    <p>or</p>
                                                    <span className="browse-button">Browse file</span>
                                                </div>
                                                <input type="file" id="mainImage" name="mainImage" onChange={uploadImage} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Name_of_business")} required={true} />
                                            <span>Name of Business</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Tagline")} required={true} />
                                            <span>Tag line if any</span>
                                        </div>
                                    </div>
                                </div>
                                {/* ---------------Business_Details--------------- */}
                            </>
                            }


                            {currentPage == 1 && <>
                                {/* ---------------Contact--------------- */}
                                <div className="contact-details">
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Email")} required={false} />
                                            <span>Email</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Phone")} required={false} />
                                            <span>Phone</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("Address")} required={false}></textarea>
                                            <span>Address</span>
                                        </div>
                                    </div>
                                </div>
                                {/* ---------------Contact--------------- */}
                            </>}







                            <div className="tooltip-container prev_btn">
                                <span className="tooltip">Previous</span>
                                <span className="text" onClick={goPrevious}>
                                    <Image src={caretleft} alt="Previous" />
                                </span>
                            </div>
                            {currentPage != formPages.length - 1 ?
                                <>
                                    <div className="tooltip-container next_btn">
                                        <span className="tooltip">Next</span>
                                        <span className="text" onClick={goNext}>
                                            <Image src={caretright} alt="Next" />
                                        </span>
                                    </div>
                                </>
                                :
                                <input type="submit" value="Submit" className='submit' />
                            }
                        </form>
                    </div>

                </div>
            </div >
        </div >
    </>
}

export default Form
