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
import { animate, motion } from 'framer-motion'




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
    const [delta, setdelta] = useState(0)
    const formVarient = {
        initial: {
            x: delta >= 0 ? '50%' : '-50%'
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    }
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm()

    const [Images, setImages] = useState([])
    const [currentPage, setcurrentPage] = useState(0)

    const goPrevious = () => {
        setdelta(-1)
        if (currentPage > 0) {
            setcurrentPage(currentPage - 1)
        }
    }
    const goNext = async () => {
        setdelta(1)
        const fields = formPages[currentPage].fields;
        const output = await trigger([...fields], { shouldFocus: true });
        if (!output) return
        if (currentPage < formPages.length - 1) {
            setcurrentPage(currentPage + 1)
        }
    }

    const onFormSubmit = values => {
        let data = {
            values: values,
            images: Images
        }
        console.log(data);
        reset()
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
                                <div>
                                    <p className="circleticks">1</p>
                                    <div className="pineline">
                                    </div>
                                </div>
                                <p>Business details</p>
                            </li>
                            <li>
                                <div>
                                    <p className="circleticks">2</p>
                                    <div className="pineline">
                                    </div>
                                </div>
                                <p>About Business</p>
                            </li>
                            <li>
                                <div>
                                    <p className="circleticks">3</p>
                                    <div className="pineline">
                                    </div>
                                </div>
                                <p>Features</p>
                            </li>
                            <li>
                                <div>
                                    <p className="circleticks">4</p>
                                    <div className="pineline">
                                    </div>
                                </div>
                                <p>Testimonials</p>
                            </li>
                            <li>
                                <div>
                                    <p className="circleticks">5</p>
                                </div>
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
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}

                                    className="business-details">
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
                                            <input type="text" className="input" {...register("Name_of_business", { required: { value: true, message: 'Name of business is required' } })} required={true} />
                                            <span>Name of Business</span>
                                            {errors.Name_of_business && <p className='errortext'>{errors.Name_of_business.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Tagline", { required: { value: true, message: 'Tagline of business is required' } })} required={true} />
                                            <span>Tag line if any</span>
                                            {errors.Tagline && <p className='errortext'>{errors.Tagline.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                                {/* ---------------Business_Details--------------- */}
                            </>
                            }


                            {currentPage == 1 && <>
                                {/* ---------------Contact--------------- */}
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}



                                    className="contact-details">
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Email", {
                                                required: { value: true, message: 'Email is required' },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: 'Invalid email address',
                                                },
                                            })} required={true} />
                                            <span>Email</span>
                                            {errors.Email && <p className='errortext'>{errors.Email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("Phone", { required: { value: true, message: 'Phone number is required' }, })} required={true} />
                                            <span>Phone</span>
                                            {errors.Phone && <p className='errortext'>{errors.Phone.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("Address", { required: { value: true, message: 'Address is required' } })} required={true}></textarea>
                                            <span>Address</span>
                                            {errors.Address && <p className='errortext'>{errors.Address.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
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
                                <input type="submit" value="Submit" className='submit' onClick={goNext} />
                            }
                        </form>
                    </div>

                </div>
            </div >
        </div >
    </>
}

export default Form
