import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ErrorToast, SuccessToast } from '../error/Error'
import { signinValidateValue } from '../validators/signinValidator'
import { headerOptions, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle'
const Signin = () => {
    const [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [role, setRole] = useState('user'),
        history = useNavigate(),
        ONE_DAY = 1,
        signInSubmit = async (e) => {
            e.preventDefault();
            const validator = await signinValidateValue(email, password)
            if (validator.isValid) {
                tryCatch(async () => {
                    const response = await axios.post(`${url}/sign-in`, { email, password, role }, { withCredentials: true }, headerOptions)
                    Cookies.set(`${response.data.role === 'admin' ? 'adminwebtoken' : 'userwebtoken'}`, response.data.token, {
                        expires: ONE_DAY,
                        path: '/',
                        secure: true,
                        sameSite: 'None'
                    })
                    SuccessToast(`Welcome Back`)
                    window.location.href = (`${response.data.role === 'admin' ? '/admin/dashboard' : '/user/books'}`);
                })
            } else { ErrorToast(validator.error) }
        },
        SignInPage = async () => {
            const response = await axios.get(`${url}/sign-in`, { withCredentials: true }, { headerOptions })
            console.log(response)
            if (!response.data?.err) {
                if (response.data) { response.data?.role === 'admin' ? history('/admin/books') : history('/user/books') }
            } else {
                ErrorToast(response.data?.err)
                Cookies?.remove('adminwebtoken', { path: '/' })
                Cookies?.remove('userwebtoken', { path: '/' })
            }
        },
        responseSuccessGoogle = (res) => {
            if (res?.tokenId) {
                tryCatch(async () => {
                    const response = await axios.post(`${url}/google/sign-in`, { tokenId: res?.tokenId, role }, { withCredentials: true }, headerOptions)
                    Cookies.set(`${response.data.role === 'admin' ? 'adminwebtoken' : 'userwebtoken'}`, response.data.token, {
                        expires: ONE_DAY,
                        path: '/',
                        secure: true,
                        sameSite: 'None'
                    })
                    SuccessToast(`Welcome Back`)
                    window.location.href = (`${response.data.role === 'admin' ? '/admin/dashboard' : '/user/books'}`);
                })
            }
        },
        responseFacebook = (res) => {
            if (res?.accessToken) {
                tryCatch(async () => {
                    const response = await axios.post(`${url}/facebook/sign-in`, { accessToken: res?.accessToken, userID: res?.userID, role }, { withCredentials: true }, headerOptions)
                    Cookies.set(`${response.data.role === 'admin' ? 'adminwebtoken' : 'userwebtoken'}`, response.data.token, {
                        expires: ONE_DAY,
                        path: '/',
                        secure: true,
                        sameSite: 'None'
                    })
                    SuccessToast(`Welcome Back`)
                    window.location.href = (`${response.data.role === 'admin' ? '/admin/dashboard' : '/user/books'}`);
                })
            }
        },
        responseErrorGoogle = () => {
            /* ErrorToast('Something went wrong') */
        }
    useEffect(() => {
        SignInPage()
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
                            <div className="border-0 px-4 py-5 mt-lg-2">
                                <div className="d-flex">
                                    <div className="stay-with mt-1">
                                        Stay with us
                                    </div>
                                    <div className="social d-flex">
                                        <FacebookLogin
                                            appId={process.env.REACT_APP_FACEBOOK_ID}
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            render={renderProps => (
                                                <span onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                    <div className="facebook mx-2 text-center" title='Facebook'>
                                                        <i className="fab fa-facebook-f"></i>
                                                    </div>
                                                </span>
                                            )}
                                        />
                                        <GoogleLogin
                                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                            render={(renderProps) => (
                                                <span onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                    <div className="twitter mx-2 text-center" title='Google'>
                                                        <i className="fab fa-google"></i>
                                                    </div>
                                                </span>
                                            )}
                                            onSuccess={responseSuccessGoogle}
                                            onFailure={responseErrorGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />

                                        {/* <div className="linkedin mx-1 text-center">
                                            <i className="fab fa-linkedin-in"></i>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="row px-3 mb-2 mt-3">
                                    <div className="line"></div>
                                    <small className="or px-2 text-center">OR</small>
                                    <div className="line"></div>
                                </div>
                                <div className="px-1">
                                    <ul className="nav nav-pills mb-3">
                                        <li className="nav-item text-center" title='USER' onClick={() => setRole('user')}> <div className="nav-link active" data-toggle="pill"><span className="text-black font-weight-bold">USER</span></div> </li>
                                        <li className="nav-item text-center" title="ADMIN" onClick={() => setRole('admin')}> <div className="nav-link" data-toggle="pill"><span className="text-black font-weight-bold">ADMIN</span></div> </li>
                                    </ul>
                                </div>
                                <form onSubmit={signInSubmit}>
                                    <div className="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Email Address</h6>
                                        </label>
                                        <input onChange={(e) => setEmail(e.target.value)} className="mb-4" type="email" name="email"
                                            placeholder="Enter a valid email address" required />
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter password"
                                            required />
                                    </div>
                                    <div className="px-3 mb-4">
                                        <NavLink to="/forgot-password" className="ml-auto mb-0 text-sm">Forgot Password?</NavLink>
                                    </div>
                                    <center>
                                        <div className="row btn mb-3 px-3">
                                            <button type="submit" className="btn btn-custom text-center">Sign In</button>
                                        </div>
                                    </center>
                                </form>
                                <div className="row mb-4 px-3">
                                    <div className="font-weight-bold text-sm">Enter your personal details and start journey with
                                        us <NavLink to="/sign-up" className="text-danger ">Sign Up</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signin
