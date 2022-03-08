import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { SuccessToast } from '../error/Error'
import AccountChangeModalBody from './AccountChangeModalBody'
import PasswordChangeModalBody from './PasswordChangeModalBody'
import { headerOptions, adminToken, url } from '../properties/Properties'
import Loader from '../loader/Loader'
import { tryCatch } from '../utils/tryCatchHandle'
const Account = () => {
    const [admin, setAdmin] = useState({}),
        [show, setShow] = useState(false),
        [loader, setLoader] = useState(true),
        [show1, setShow1] = useState(false),
        history = useNavigate(),
        AdminAccount = async () => {
            if (adminToken) {
                const response = await axios.get(`${url}/admin/account`, { withCredentials: true }, headerOptions)
                if (response.data?.err) { history('/sign-in') }
                setAdmin(response.data)
                setLoader(false)
            } else history("/sign-in");
        },
        inputHandler = (event) => {
            const { name, value } = event.target
            setAdmin((oldAdmin) => { return { ...oldAdmin, [name]: value } })
        },
        changeAdminPassword = (e) => {
            e.preventDefault();
            if (admin) {
                tryCatch(async () => {
                    await axios.patch(`${url}/admin/account/password`, admin, { withCredentials: true }, headerOptions)
                    setShow1(false);
                    Cookies.remove('adminwebtoken', { path: '/' })
                    window.location.href = '/sign-in'
                })
            }
        },
        updateAdminInformation = (e) => {
            e.preventDefault();
            if (admin) {
                setLoader(true)
                tryCatch(async () => {
                    await axios.patch(`${url}/admin/account`, admin, { withCredentials: true }, headerOptions)
                    setShow(false);
                    SuccessToast(`Profile Updated`);
                })
                AdminAccount();
            }
        }
    useEffect(() => {
        AdminAccount();
    }, [])
    return (
        <>
            <center className='admin-content' style={{ marginTop: "100px" }}>
                {
                    loader ?
                        <Loader />
                        :
                        <>
                            <div className="myprofile mt-2">
                                <div className="profile-pic">
                                    <div className="header-color"></div>
                                    <img className="img-fluid" src={admin.image ? admin.image : '/images/avatar.png'} alt="Profile Picture" />
                                </div>
                                <div className="mt-2">
                                    <h1 className="name">Name : {admin.name}</h1>
                                    <h2 className="email">Email : {admin.email}</h2>
                                </div>
                                <div className="description mt-2">
                                    {admin.description ? admin.description : 'Best friend of ******. Can not get drunk'}
                                </div>
                                <div className="text-primary">To show your Picture/Something.<br />Please click Edit My Account</div>
                                <button onClick={() => setShow(true)} data-toggle="modal" data-target="#myModal1" className="btn mt-3 mx-2 btn-custom">Edit My Account</button>
                                <button onClick={() => setShow1(true)} data-toggle="modal" data-target="#myModal1" className="btn mt-3 mx-2 btn-custom">Change Password</button>
                            </div>
                            <Modal show={show} onHide={() => { setShow(false); AdminAccount(); }} animation={true} aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AccountChangeModalBody inputHandler={inputHandler} admin={admin} updateAdminInformation={updateAdminInformation} />
                                </Modal.Body>
                            </Modal>
                            <Modal show={show1} onHide={() => { setShow1(false); AdminAccount(); }} animation={true} aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton>
                                    <Modal.Title>Password Change</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <PasswordChangeModalBody inputHandler={inputHandler} admin={admin} changeAdminPassword={changeAdminPassword} />
                                </Modal.Body>
                            </Modal>
                        </>
                }
            </center>

        </>
    )
}

export default Account
