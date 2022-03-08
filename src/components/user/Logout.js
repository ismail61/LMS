import React, { useEffect } from 'react'
import axios from 'axios'
import { ErrorToast, SuccessToast } from '../error/Error'
import { useNavigate } from 'react-router-dom';
import { headerOptions, userToken ,url } from '../properties/Properties'
import Cookies from 'js-cookie';
const Logout = () => {
    const
        history = useNavigate(),
        logoutUser = async () => {
            if (userToken) {
                const response = await axios.get(`${url}/user/logout`, { withCredentials: true }, headerOptions)
                if (!response.data.err) {
                    Cookies.remove('userwebtoken')
                    SuccessToast(response.data.message)
                    window.location.href = '/sign-in'
                } else {
                    if (response.data.err === 'Server Error') { ErrorToast(response.data.err); history("/user/books"); }
                    else history("/sign-in");
                }
            }
            else {
                history("/sign-in");
            }

        }
    useEffect(() => {
        logoutUser()
    }, [])
    return (
        <>
        </>
    )
}

export default Logout
