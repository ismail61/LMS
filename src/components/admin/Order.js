import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import DatePicker, { registerLocale } from "react-datepicker";
import swal from 'sweetalert'
import enGB from "date-fns/locale/en-GB";
import { SuccessToast } from '../error/Error';
import { useNavigate } from 'react-router-dom';
import { headerOptions, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle'
const Order = ({ order, fine, title, email, acceptOrder, rejectOrder, showAllOrder, setLoader }) => {
    const [date, setDate] = useState(new Date()),
        [show, setShow] = useState(false),
        history = useNavigate(),
        handleClose = () => { setShow(false); },
        handleShow = () => setShow(true),
        timeDatePicker = async (e) => {
            e.preventDefault()
            handleClose()
            setLoader(true)
            tryCatch(async () => {
                const response = await axios.patch(`${url}/admin/orders/return-assign-date/${order._id}`, { date }, { withCredentials: true }, headerOptions)
                if (response.data?.err) history("/sign-in");
                SuccessToast('Return Date Assigned')
            })
            showAllOrder()
        },
        paidHandler = async () => {
            setLoader(true)
            tryCatch(async () => {
                const response = await axios.patch(`${url}/admin/orders/paid/${order._id}`, {}, { withCredentials: true }, headerOptions)
                if (response.data?.err) history("/sign-in");
                SuccessToast('Paid')
            })
            showAllOrder()
        },
        returnBookOrderHandler = async () => {
            setLoader(true)
            tryCatch(async () => {
                const response = await axios.patch(`${url}/admin/orders/returned/${order._id}`, {}, { withCredentials: true }, headerOptions)
                if (response.data?.err) history("/sign-in");
                swal({ title: 'Order returned', text: 'Yes! Your order has been returned!', icon: 'success', timer: 5000, buttons: false, })
            })
            showAllOrder()
        },
        userFine = async () => {
            if (fine !== order.fine && fine !== 0) {
                const { _id } = order
                tryCatch(async () => {
                    const response = await axios.patch(`${url}/admin/fine`, { _id, fine }, { withCredentials: true }, headerOptions)
                    if (response.data?.err) history("/sign-in");
                })
                showAllOrder()
            }
        }
    useEffect(() => {
        registerLocale("en-GB", enGB);
        userFine()
    }, []);

    return (
        <>
            <tr className="cell">
                <td data="Order #" title={order._id}>{order._id?.slice(0, 8)}..</td>
                <td data="Book Title">{title}</td>
                <td data="User Email">{email}</td>
                <td data="Issue Date" style={{ whiteSpace: 'nowrap' }}>{order.createdAt?.slice(0, 10)}</td>
                <td data="Fine" className="text-lg-center"><span style={order.paid || (order.fine === 0 && order.status === 'returned') ? { textDecoration: 'line-through double red' } : {}}>{order.fine}</span></td>
                <td data="Status" style={{ whiteSpace: 'nowrap' }}>
                    <span className={(order.status === 'rejected' ? 'text-danger' : 'text-success')}>{order.status[0].toUpperCase()}{order.status.slice(1)}
                        <i className={"mx-2 " + (order.status === 'rejected' ? 'fa fa-times' : 'fas fa-check')}></i>
                    </span>
                </td>
                <td data="Action" style={{ whiteSpace: 'nowrap' }} className='text-lg-center'>
                    {
                        (order.status) === 'pending' ? (
                            <>
                                <div style={{ cursor: 'pointer', padding: '3px 5px' }} title="Accept"
                                    onClick={() => acceptOrder(order._id)}
                                    className="btn mx-2 btn-success m-0 text-white ">
                                    <i className="fa fa-check"></i>
                                </div>
                                <div style={{ cursor: 'pointer', padding: '4px 8px' }} title="Reject"
                                    onClick={() => rejectOrder(order._id)}
                                    className="btn mx-2 btn-danger m-0">
                                    <i className="fa fa-times"></i>
                                </div>
                            </>
                        ) : (
                            <>
                                {(order.status === 'returned') ?
                                    <button disabled={((order.fine === 0 || order.paid) ? true : false)} onClick={paidHandler} title="Paid" className='btn-success' style={order.paid || order.fine === 0 ? { opacity: '0.4', cursor: 'pointer' } : {}}>Paid</button>
                                    : <>
                                        {
                                            (order.status === 'accepted' && order.returnDate) ?
                                                <button disabled={(order.paid ? true : false)} onClick={returnBookOrderHandler} title="Return" className='btn-danger' style={order.paid ? { opacity: '0.4', cursor: 'pointer' } : {}}>Return</button>
                                                : <i className="fas fa-exclamation-triangle text-danger" style={{ fontSize: '21px' }}></i>
                                        }
                                    </>
                                }
                            </>
                        )
                    }
                </td >
                <td data="Assign Return Date" className='text-lg-center' style={{}}>
                    {
                        (order.status === 'accepted') ?
                            <>
                                {
                                    order.returnDate ?
                                        <><i className="fas fa-calendar-check" style={{ color: 'green', fontSize: '20px' }} title='Assigned Return Date'></i><span style={{ whiteSpace: 'nowrap' }}> {order.returnDate?.slice(0, 10)}</span></>
                                        :
                                        <span className="btn-success" style={{ padding: '6px' }} title='Assign Return Date' onClick={() => { handleShow(); setDate(new Date()) }}><i className="fas fa-calendar-plus" style={{ color: 'pink', fontSize: '20px' }}></i><span> Assign</span></span>
                                }
                            </>
                            :
                            <>
                                {
                                    (order.status === 'returned') ?
                                        <><i className="fas fa-calendar-times" title='This order has been returned' style={{ color: 'green', fontSize: '20px' }}></i> <span style={{ whiteSpace: 'nowrap' }}> {order.returnDate?.slice(0, 10)}</span></>
                                        :
                                        <><i className="fas fa-calendar-times" title='You can not assign return date.Accept Order first' style={{ color: 'red', fontSize: '20px' }}></i><span style={{ whiteSpace: 'nowrap' }}> {order.returnDate?.slice(0, 10)}</span></>
                                }
                            </>
                    }
                </td>
            </tr >
            <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Assign Return Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={timeDatePicker}>
                        <div className="form-group p-2">
                            <label>Set Date</label>
                            <DatePicker
                                selected={date}
                                onChange={() => { date.setHours(23, 59, 59, 999); setDate(date) }}
                                dateFormat={'dd/MM/yyyy'}
                                locale={'en-GB'}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="text-center p-2">
                            <button type="submit" className="btn px-4 btn-primary">
                                <b>Date Set</b>
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Order
