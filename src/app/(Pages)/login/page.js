"use client"

// Libraries
import { React, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

//CSSs
import './loginstyle.css'
import '@/app/mainstyle.css'

//Svgs
import emailImage from './Assets/email.svg'
import passwordImage from './Assets/password.svg'
import showpasswordImage from './Assets/showpassword.svg'
import googleImage from './Assets/google.svg'
import appleImage from './Assets/apple.svg'
import BgImage from './Assets/Home-page-bg-Image.png'


const showPassword = e => {
    if (e.target.previousSibling.type == 'password')
        e.target.previousSibling.type = 'text';
    else
        e.target.previousSibling.type = 'password';
}

const Login = () => {
    const [login, setlogin] = useState(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async data => {
        if (login) {
            // Login fetching
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resjson = await res.json();
            console.log(resjson);
        }
        else {
            // Sign up fetching
        }
        reset();
    }
    return <>
        <Image src={BgImage} alt='Background Image' className='Background-Image' />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-column">
                <label>Email </label>
            </div>
            <div className="inputForm">
                <Image src={emailImage} alt='email' />
                <input type="text" {...register('email', { required: { value: true, message: 'Email is required' } })} className="input" placeholder="Enter your Email" />
            </div >
            {errors.email && <p className='errortext'>{errors.email.message}</p>}

            <div className="flex-column">
                <label>Password </label>
            </div>
            <div className="inputForm">
                <Image src={passwordImage} alt='password' />
                <input type="password" {...register('password', { required: { value: true, message: 'Password is required' } })} className="input" placeholder="Enter your Password" />
                <Image src={showpasswordImage} alt='showpassword' onClick={showPassword} id='showpassword' />
            </div>
            {errors.password && <p className='errortext'>{errors.password.message}</p>}

            {
                login &&
                <span className="span">Forgot password?</span>
            }

            {
                login ?
                    <>
                        {
                            isSubmitting ?
                                <input type='submit' value='Loading...' disabled className='button-submit' />
                                :
                                <input type='submit' value='Log In' className='button-submit' />
                        }
                        <p className="p">Don't have an account?
                            <span className="span">
                                <Link href={''} onClick={() => { setlogin(false) }}> Sign Up</Link>
                            </span>
                        </p>
                    </>
                    :
                    <>
                        {
                            isSubmitting ?
                                <input type='submit' value='Loading...' disabled className='button-submit' />
                                :
                                <input type='submit' value='Sign Up' className='button-submit' />
                        }
                        <p className="p">Already have an account? <span className="span">
                            <Link href={''} onClick={() => { setlogin(true) }}>Log In</Link>
                        </span>
                        </p>
                    </>
            }
            <p className="p line">Or With</p>

            <div className="autobuttons">
                <button className="btn google">
                    <Image src={googleImage} alt='google' />
                </button><button className="btn apple">
                    <Image src={appleImage} alt='apple' />
                </button>
            </div>
        </form >
    </>
}

export default Login
