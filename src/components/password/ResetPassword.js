import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { headerOptions, url, adminToken, userToken, } from '../properties/Properties'
import { ErrorToast, SuccessToast } from '../error/Error'
import { tryCatch } from '../utils/tryCatchHandle';
const ResetPassword = () => {
    const [password, setPassword] = useState(""),
        [params, setParams] = useSearchParams(),
        history = useNavigate(),
        resetSubmit = async (e) => {
            e.preventDefault();
            if (!password) {
                ErrorToast("Please Provide your Password")
            } else if (password.length < 6) {
                ErrorToast("Password must be greater than 6 characters")
            } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
                ErrorToast("Password must be minimum 6 Characters and one letter and one number")
            }
            else {
                const resetPasswordToken = params.get("token")
                if (!adminToken && !userToken && resetPasswordToken) {
                    tryCatch(async () => {
                        await axios.put(`${url}/forgot-password`, { password, resetPasswordToken }, { withCredentials: true }, headerOptions)
                        SuccessToast(`Password Updated`)
                        history("/sign-in");
                    })
                } else history("/sign-in");
            }
        },
        resetPasswordPage = async () => {
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
        resetPasswordPage()
    }, [])
    return (
        <div style={{ marginTop: "60px" }}>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row px-3 pt-5 justify-content-center mt-4 mb-5 border-line">
                                    <img className="image" src="images/auth.svg" />
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
                                <form onSubmit={resetSubmit}>
                                    <div className="row px-3">
                                        <label className="mb-3">
                                            <h6 className="mb-1 text-sm">	Please enter a new password to reset your password.</h6>
                                        </label>
                                        <input onChange={(e) => setPassword(e.target.value)} className="mb-4" type="password" name="password"
                                            placeholder="Enter a Password" required />
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

export default ResetPassword
