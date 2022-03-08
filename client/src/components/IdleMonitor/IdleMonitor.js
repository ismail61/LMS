import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const LogoutPopup = () => {
    const signoutTime = 1000 * 60 * 30 ; //30 minite
    const [show, setShow] = useState(false);
    const history = useNavigate()
    let logoutTimeout;

    const logout = () => {
        setShow(true)
        console.log('You have been logged out');
    }

    const setTimeouts = () => {
        logoutTimeout = setTimeout(logout, signoutTime);
    };

    const clearTimeouts = () => {
        if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {

        const events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];

        const resetTimeout = () => {
            clearTimeouts();
            setTimeouts();
        };
        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }

        setTimeouts();
        return () => {
            for (let i in events) {
                window.removeEventListener(events[i], resetTimeout);
                clearTimeouts();
            }
        }
    }, []);


    return <div>
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Modal.Title> Idle Time Session Expire</Modal.Title>
                </div>
                <div className='mt-3'  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Please Sign-in Again
                </div>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "right" }}>
                <Button variant='success' onClick={() => { setShow(false); setTimeout(() => history('/sign-in'), 1000) }} >OK </Button>
            </Modal.Footer>
        </Modal>
    </div >
}
export default LogoutPopup;