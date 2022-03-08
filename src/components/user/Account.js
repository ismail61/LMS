import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { SuccessToast } from '../error/Error'
import AccountChangeModalBody from './AccountChangeModalBody'
import PasswordChangeModalBody from './PasswordChangeModalBody'
import { headerOptions, userToken, url } from '../properties/Properties'
import Loader from '../loader/Loader'
import { tryCatch } from '../utils/tryCatchHandle';
const Account = () => {
    const [user, setUser] = useState({}),
        [show, setShow] = useState(false),
        [show1, setShow1] = useState(false),
        [loader, setLoader] = useState(true),
        history = useNavigate(),
        UserAccount = async () => {
            if (userToken) {
                const response = await axios.get(`${url}/user/account`, { withCredentials: true }, headerOptions)
                if (response.data?.err) { history('/sign-in') }
                setUser(response.data)
                setLoader(false)
            } else history("/sign-in");
        },
        inputHandler = (event) => {
            const { name, value } = event.target
            setUser((oldUser) => { return { ...oldUser, [name]: value } })
        },
        changeUserPassword = (e) => {
            e.preventDefault();
            if (user) {
                tryCatch(async () => {
                    const response = await axios.patch(`${url}/user/account/password`, user, { withCredentials: true }, headerOptions)
                    if (response.data?.err) history('/sign-in')
                    setShow1(false);
                    Cookies.remove('userwebtoken', { path: '/' })
                    window.location.href = '/sign-in'
                })
            }
        },
        updateUserInformation = (e) => {
            e.preventDefault();
            if (user) {
                setLoader(true)
                tryCatch(async () => {
                    const response = await axios.patch(`${url}/user/account`, user, { withCredentials: true }, headerOptions)
                    if (response.data?.err) history('/sign-in')
                    setShow(false);
                    SuccessToast(`Profile Updated`);
                })
                UserAccount();
            }
        }
    useEffect(() => {
        UserAccount();
    }, [])
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <center style={{ marginTop: "82px" }}>
                            <div className="myprofile mt-2">
                                <div className="profile-pic">
                                    <div className="header-color"></div>
                                    <img className="img-fluid" src={user.image ? user.image : '/images/avatar.png'} alt="Profile Picture" />
                                </div>
                                <div className="mt-2">
                                    <h1 className="name">Name : {user.name}</h1>
                                    <h2 className="email">Email : {user.email}</h2>
                                </div>
                                <div className="description mt-2">
                                    {user.description ? user.description : 'Best friend of ******. Can not get drunk'}
                                </div>
                                <div className="text-primary">To show your Picture/Something.<br />Please click Edit My Account</div>
                                <button onClick={() => setShow(true)} data-toggle="modal" data-target="#myModal1" className="btn mt-3 mx-2 btn-custom">Edit My Account</button>
                                <button onClick={() => setShow1(true)} data-toggle="modal" data-target="#myModal1" className="btn mt-3 mx-2 btn-custom">Change Password</button>
                            </div>
                        </center>
                        <Modal show={show} onHide={() => { setShow(false); UserAccount(); }} animation={true} aria-labelledby="contained-modal-title-vcenter">
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AccountChangeModalBody inputHandler={inputHandler} user={user} updateUserInformation={updateUserInformation} />
                            </Modal.Body>
                        </Modal>
                        <Modal show={show1} onHide={() => { setShow1(false); UserAccount(); }} animation={true} aria-labelledby="contained-modal-title-vcenter">
                            <Modal.Header closeButton>
                                <Modal.Title>Password Change</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PasswordChangeModalBody inputHandler={inputHandler} user={user} changeUserPassword={changeUserPassword} />
                            </Modal.Body>
                        </Modal>
                    </>
            }
        </>
    )
}

export default Account
