import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ErrorToast, SuccessToast } from '../error/Error'
import axios from 'axios'
import Cookies from 'js-cookie';
import { signupValidateValue } from '../validators/signupValidator'
import { headerOptions, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle'
const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' }),
        [role, setRole] = useState('user'),
        history = useNavigate(),
        inputHandler = (event) => {
            const { name, value } = event.target
            setUser((oldUser) => { return { ...oldUser, [name]: value } })
        },
        signUpSubmit = (e) => {
            e.preventDefault();
            tryCatch(async () => {
                const validator = await signupValidateValue(user)
                if (validator.isValid) {
                    await axios.post(`${url}/sign-up`, { ...user, role }, headerOptions)
                    SuccessToast('Signup successful')
                    history("/sign-in");
                } else { ErrorToast(validator.error) }
            })
        }
        ,
        SignUpPage = async () => {
            const response = await axios.get(`${url}/sign-up`, { withCredentials: true }, headerOptions)
            if (!response.data?.err) {
                if (response.data) { response.data.role === 'admin' ? history('/admin/books') : history('/user/books') }
            } else {
                ErrorToast(response.data.err)
                Cookies?.remove('adminwebtoken', { path: '/' })
                Cookies?.remove('userwebtoken', { path: '/' })
            }
        }
    useEffect(() => {
        SignUpPage()
    }, [])
    return (
        <div style={{ marginTop: "65px" }}>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row px-3 pt-5 justify-content-center mt-4 mb-5 border-line">
                                    <img src="images/auth.svg" className="image" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="border-0 px-4 py-4 mt-lg-5 mt-md-3">
                                <div className="px-1">
                                    <ul className="nav nav-pills mb-3">
                                        <li className="nav-item text-center" onClick={() => setRole('user')}> <div className="nav-link active" data-toggle="pill"><span className="text-black font-weight-bold">USER</span></div> </li>
                                        <li className="nav-item text-center" onClick={() => setRole('admin')}> <div className="nav-link" data-toggle="pill"><span className="text-black font-weight-bold">ADMIN</span></div> </li>
                                    </ul>
                                </div>
                                <form onSubmit={signUpSubmit} style={{ marginTop: '12px' }}>
                                    <div className="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Name</h6>
                                        </label>
                                        <input onChange={inputHandler} className="mb-4" type="text" name="name" placeholder="Enter your name"
                                            required />

                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Email Address</h6>
                                        </label>
                                        <input onChange={inputHandler} className="mb-4" type="email" name="email"
                                            placeholder="Enter a valid email address" required />

                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label>
                                        <input onChange={inputHandler} type="password" name="password" placeholder="Enter password"
                                            required />

                                    </div>

                                    <center>
                                        <div className="row btn mb-3 px-3">
                                            <button type="submit" className="btn btn-custom text-center">Sign Up</button>
                                        </div>
                                    </center>
                                </form>
                                <div className="row mb-4 px-3">
                                    <small className="font-weight-bold text-sm">To keep connected with us please login with your
                                        personal
                                        info <NavLink to="/sign-in" className="text-danger ">Sign In</NavLink>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
