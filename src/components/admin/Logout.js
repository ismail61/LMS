import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import { adminToken, headerOptions, url } from '../properties/Properties'
import { SuccessToast } from '../error/Error'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const history = useNavigate(),
        logoutUserOrAdmin = async () => {
            if (adminToken) {
                const response = await axios.get(`${url}/admin/logout`, { withCredentials: true }, headerOptions)
                if (!response.data.err) {
                    SuccessToast(response.data.message)
                    Cookies.remove('adminwebtoken', { path: '/' })
                } window.location.href = '/sign-in'
            }
            else { history("/sign-in"); }
        }
    useEffect(() => {
        logoutUserOrAdmin()
    }, [])
    return (
        <> </>
    )
}

export default Logout
