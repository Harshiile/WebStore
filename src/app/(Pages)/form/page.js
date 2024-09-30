"use client"

//Libraries
import { React, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form';

//CSSs
import './CSSs/style.css'
import './CSSs/DragDrop.css'
import './CSSs/Textfield.css'
import './CSSs/ToolTips.css'
import './CSSs/style-media-mobile.css'
import '@/app/mainstyle.css'

// Svgs
import caretleft from './Assets/caret-left-svgrepo-com.svg'
import caretright from './Assets/caret-right-svgrepo-com.svg'
import BgImage from './Assets/Home-page-Bg-Image.png'



const formPages = [
    {
        tagline: 'Let\'s know about your business',
        fields: ['Name_of_business', 'Tagline']
    },
    {
        tagline: 'Exploring more your business',
        fields: ['product', 'city', 'establishedYear', 'anotherServiceOffering']
    },
    {
        tagline: 'Why people trust you?',
        fields: ['betterQuality', 'customerSupport', 'experience']
    },
    {
        tagline: 'Give some Testimonials',
        fields: ['name1', 'testimonial1', 'name2', 'testimonial2', 'name3', 'testimonial3']
    },
    {
        tagline: 'Want more leads?',
        fields: ['email', 'phone', 'address', 'calendyLink']
    }
];

const dragDropFunction = e => {
    e.preventDefault();
    console.log(e.target.lastElementChild);
}
const page = () => {

    // States
    const [delta, setdelta] = useState(0)
    const [Images, setImages] = useState([])
    const [currentPage, setcurrentPage] = useState(0)

    // Framer-motion Varients
    const formVarient = {// for form stages
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
    const listVarient = {// for pipeline of list
        animate: thisPage => ({
            height: currentPage > thisPage ? '100%' : '-10%',
            transition: {
                duration: 0.3
            }
        })
    }
    const listCircleVarient = {// for circle of list
        animate: {
            backgroundColor: currentPage > 1 ? 'black' : 'white',
            color: currentPage >= 1 ? 'white' : 'black',
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


    // Form stages transition
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

    // On form sumbit
    const onFormSubmit = async values => {
        let data = {
            "business_details": {
                "name": values.Name_of_business,
                "tagline": values.Tagline,
                "product": values.product,
                "city": values.city,
                "establishedYear": values.establishedYear,
                "additionalProduct": values.anotherServiceOffering
            },
            "why us": {
                "betterQuality": values.betterQuality,
                "customerSupport": values.customerSupport,
                "experience": values.experience
            },
            "testimonails": {
                "testimonail_1": {
                    "name": values.name1,
                    "testimonial": values.testimonial1
                },
                "testimonail_2": {
                    "name": values.name2,
                    "testimonial": values.testimonial2
                },
                "testimonail_3": {
                    "name": values.name3,
                    "testimonial": values.testimonial3
                }
            },
            "social links": {
                "email": values.email,
                "address": values.address,
                "phone": values.phone,
                "calendyLink": values.calendyLink,
                "instagramLink": values.instagramLink,
                "facebookLink": values.facebookLink,
                "yelpLink": values.yelpLink,
                "linkedinLink": values.linkedinLink,
                "xLink": values.xLink,
                "tiktokLink": values.tiktokLink
            },
            images: Images
        }
        console.log(data);

        //posting to database
        // const res = await fetch('api/database', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // });
        // const resjson = await res.json();
        // console.log(resjson);

        reset()
    }

    const uploadImage = async (e) => {
        let image = e.target.files[0];
        let canvas = e.target.previousElementSibling;
        let labelcanvas = e.target.parentElement;
        canvas.style.opacity = "0";
        let imageUrl = URL.createObjectURL(image)
        labelcanvas.style.backgroundImage = `url(${imageUrl})`;
        labelcanvas.style.border = "2px solid black";

        //Uploading into Cloudinary
        // const imageData = new FormData();
        // imageData.append("file", image);
        // imageData.append("upload_preset", 'webtree');

        // const res = await fetch('https://api.cloudinary.com/v1_1/doeuywzyb/image/upload', {
        //     method: 'POST',
        //     body: imageData
        // });
        // const imageurl = await res.json();
        setImages([...Images, { from: e.target.id, value: 1 }])
    }

    return <>
        <div className="main-container">
            <Image src={BgImage} alt='Background Image' className='Background-Image' />
            <div className="container">
                <div className="left">
                    <div className="business_name">
                        {/* <div className="logo"><img src=""></div> */}
                        <div className="wt_name">WebTree</div>
                    </div>
                    <div className="left_list">
                        {/* 
                        Business details
                        About Business
                        Features
                        Testimonials
                        Contact details
                        */}
                        <ul>
                            <li>
                                <div className='list-circle'>
                                    <div>1</div>
                                    <div className='pipeline'></div>
                                </div>
                                <p>Business Details</p>
                            </li>
                            <li>
                                <div className='list-circle'>
                                    <div>2</div>
                                    <div className='pipeline'></div>
                                </div>
                                <p>About Business</p>
                            </li>
                            <li>
                                <div>1</div>
                                <p>Business Details</p>
                            </li>
                            <li>
                                <div>1</div>
                                <p>Business Details</p>
                            </li>
                            <li>
                                <div>1</div>
                                <p>Business Details</p>
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
                                            <input type="text" className="input" {...register("Tagline")} required={true} />
                                            < span > Tag line if any</span>
                                            {errors.Tagline && <p className='errortext'>{errors.Tagline.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                                {/* ---------------Business_Details--------------- */}
                            </>
                            }
                            {currentPage == 1 && <>
                                {/* ---------------------About Us-------------------------- */}
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}
                                    className='aboutus'>

                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("product", { required: { value: true, message: 'Product/Service is required' } })} required={true} />
                                            <span>Your Product or Service</span>
                                            {errors.product && <p className='errortext'>{errors.product.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("city", { required: { value: true, message: 'City is required' } })} required={true} />
                                            <span>City of business</span>
                                            {errors.city && <p className='errortext'>{errors.city.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("establishedYear", {
                                                required: { value: true, message: 'Established year is required' },
                                                pattern: {
                                                    value: /^[0-9]{4}$/,
                                                    message: 'Invalid Year',
                                                }
                                            })} required={true} />
                                            <span>Established year of your business</span>
                                            {errors.establishedYear && <p className='errortext'>{errors.establishedYear.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("anotherServiceOffering", { required: { value: true, message: 'Additional service/product is required' } })} required={true} />
                                            <span>Your Additional Product or Service</span>
                                            {errors.anotherServiceOffering && <p className='errortext'>{errors.anotherServiceOffering.message}</p>}
                                        </div>
                                    </div>


                                </motion.div>
                                {/* ---------------------About Us-------------------------- */}
                            </>}

                            {currentPage == 2 && <>
                                {/* ---------------------Features-------------------------- */}
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}
                                    className='features'>

                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input textarea" {...register("betterQuality", { required: true })} required={true}></textarea>
                                            <span>Tell us how your service or product is better than others</span>
                                            {errors.betterQuality && <p className='errortext'>Above details is maindatory for your good</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input textarea" {...register("customerSupport", { required: true })} required={true}></textarea>
                                            <span>Tell us how your team satisfy customers with your customer support</span>
                                            {errors.customerSupport && <p className='errortext'>Above details is maindatory for your good</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input textarea" {...register("experience", { required: true })} required={true}></textarea>
                                            <span>Tell us your experience with-in your work industry </span>
                                            {errors.experience && <p className='errortext'>Above details is maindatory for your good</p>}
                                        </div>
                                    </div>
                                </motion.div>
                                {/* ---------------------Features-------------------------- */}
                            </>}

                            {currentPage == 3 && <>
                                {/* ---------------Testimonial--------------- */}
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}

                                    className="testimonials">

                                    {/* First */}
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("name1", { required: true })} required={true} />
                                            <span>Name 1</span>
                                            {errors.name1 && <p className='errortext'>Name is required</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("testimonial1", { required: true })} required={true}></textarea>
                                            <span>Testimonial 1</span>
                                            {errors.testimonial1 && <p className='errortext'>Testimonial is required</p>}
                                        </div>
                                    </div>

                                    {/* Second */}
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("name2", { required: true })} required={true} />
                                            <span>Name 2</span>
                                            {errors.name2 && <p className='errortext'>Name is required</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("testimonial2", { required: true })} required={true}></textarea>
                                            <span>Testimonial 2</span>
                                            {errors.testimonial2 && <p className='errortext'>Testimonial is required</p>}
                                        </div>
                                    </div>

                                    {/* Third */}
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("name3", { required: true })} required={true} />
                                            <span>Name 3</span>
                                            {errors.name3 && <p className='errortext'>Name is required</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("testimonial3", { required: true })} required={true}></textarea>
                                            <span>Testimonial 3</span>
                                            {errors.testimonial3 && <p className='errortext'>Testimonial is required</p>}
                                        </div>
                                    </div>
                                </motion.div>
                                {/* ---------------Testimonial--------------- */}
                            </>}

                            {currentPage == 4 && <>
                                {/* ---------------Contact--------------- */}
                                <motion.div
                                    variants={formVarient}
                                    initial={formVarient.initial}
                                    animate={formVarient.animate}

                                    className="contact-details">
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("email", {
                                                required: { value: true, message: 'Email is required' },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: 'Invalid email address',
                                                },
                                            })} required={true} />
                                            <span>Email</span>
                                            {errors.email && <p className='errortext'>{errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("phone", {
                                                required: { value: true, message: 'Phone number is required' },
                                                pattern: {
                                                    value: /^[0-9]{1,}$/,
                                                    message: 'Invalid Phone Number',
                                                }
                                            })} required={true} />
                                            <span>Phone</span>
                                            {errors.phone && <p className='errortext'>{errors.phone.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <textarea className="input" {...register("address", { required: { value: true, message: 'Address is required' } })} required={true}></textarea>
                                            <span>Address</span>
                                            {errors.address && <p className='errortext'>{errors.address.message}</p>}
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("calendyLink", { required: { value: true, message: 'Calendy link is required' } })} required={true} />
                                            <span>Calendy Link</span>
                                            {errors.calendyLink && <p className='errortext'>{errors.calendyLink.message}</p>}
                                            <p id='calendyYtInfo'>Don't know what is Calendy? Check this out</p>
                                            <iframe width="560" height="315" src="https://www.youtube.com/embed/T-OTCU1xXmY?si=xhs0_uAIElOFV3Aa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("instagramLink")} />
                                            <span>Instagram Link</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("facebookLink")} />
                                            <span>Facebook Link</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("yelpLink")} />
                                            <span>Yelp Link</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("linkedinLink")} />
                                            <span>Linkedin Link</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("xLink")} />
                                            <span>X Link</span>
                                        </div>
                                    </div>
                                    <div className="textField">
                                        <div className="formField">
                                            <input type="text" className="input" {...register("tiktokLink")} />
                                            <span>Tiktok Link</span>
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

export default page
