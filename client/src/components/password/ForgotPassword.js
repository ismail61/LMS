import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { headerOptions, url } from '../properties/Properties'
import { ErrorToast, SuccessToast } from '../error/Error'
import { tryCatch } from '../utils/tryCatchHandle';
const ForgotPassword = () => {
    const [email, setEmail] = useState(""),
        [role, setRole] = useState('user'),
        history = useNavigate(),
        resetSubmit = async (e) => {
            e.preventDefault();
            if (!email) {
                ErrorToast("Please Provide your Email")
            } else if (!email.match(/\S+@\S+\.\S+/)) {
                ErrorToast("Please Provide your Correct Email")
            }
            else {
                //const response = await axios.get(`${url}/forgot-password?email=${email}&role=${role}`, { withCredentials: true }, headerOptions)
                tryCatch(async () => {
                    await axios.post(`${url}/forgot-password`, { email, role }, { withCredentials: true }, headerOptions)
                    SuccessToast('We have e-mailed your password reset link!')
                })
            }
        },
        ForgotPasswordPage = async () => {
            const response = await axios.get(`${url}/forgot-password`, { withCredentials: true }, headerOptions)
            if (!response.data?.err) {
                if (response.data) { response.data.role === 'admin' ? history('/admin/books') : history('/user/books') }
            } else {
                ErrorToast(response.data.err)
                Cookies?.remove('adminwebtoken', { path: '/' })
                Cookies?.remove('userwebtoken', { path: '/' })
            }
        }
    useEffect(() => {
        ForgotPasswordPage()
    }, [])
    return (
        <div style={{ marginTop: "60px" }}>
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
                            <div className="border-0 px-4 py-5">
                                <div className="d-flex">
                                    <div className="stay-with mt-1">
                                        Reset Your Password
                                    </div>
                                </div>
                                <div className="row px-3 mb-2 mt-3 mb-3">
                                    <center> <div className="line"></div>
                                    </center>
                                </div>
                                <div className="px-1 mb-4">
                                    <ul className="nav nav-pills mb-3">
                                        <li className="nav-item text-center" onClick={() => setRole('user')}> <div className="nav-link active" data-toggle="pill"><span className="text-black font-weight-bold">USER</span></div> </li>
                                        <li className="nav-item text-center" onClick={() => setRole('admin')}> <div className="nav-link" data-toggle="pill"><span className="text-black font-weight-bold">ADMIN</span></div> </li>
                                    </ul>
                                </div>
                                <form onSubmit={resetSubmit}>
                                    <div className="row px-3">
                                        <label className="mb-3">
                                            <h6 className="mb-1 text-sm">	Please enter your email address to reset your password.</h6>
                                        </label>
                                        <input onChange={(e) => setEmail(e.target.value)} className="mb-4" type="email" name="email"
                                            placeholder="Enter a valid email address" required />
                                    </div>
                                    <center>
                                        <div className="row btn mb-3 px-3">
                                            <button type="submit" className="btn btn-custom text-center">RESET</button>
                                        </div>
                                    </center>
                                </form>
                                <div className="row mb-4 px-3">
                                    <div className="font-weight-bold text-sm">Enter your personal details and start journey with
                                        us <NavLink to="/sign-up" className="text-danger ">Sign Up</NavLink>
                                    </div>
                                </div>
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

export default ForgotPassword
