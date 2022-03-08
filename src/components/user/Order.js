import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { headerOptions, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle';
const Order = ({ order, fine, totalFineCalculate, title, modalShow, showAllOrder, setLoader }) => {
    const history = useNavigate(),
        deleteOrderHandler = async () => {
            let willDelete = await swal({ title: "Are you sure?", text: "Once deleted, you will not be able to recover this order!", icon: "warning", buttons: ["Cancel", "Yes, Delete it"], dangerMode: true, })
            if (willDelete) {
                setLoader(true)
                tryCatch(async () => {
                    await axios.delete(`${url}/user/orders/${order._id}`, { withCredentials: true }, headerOptions)
                    swal({ title: 'Order Deleted', text: 'Yes! Your order has been deleted!', icon: 'success', timer: 5000, buttons: false, })
                })
                showAllOrder()
            }
        },
        renewOrderHandler = () => {
            setLoader(true)
            tryCatch(async () => { await axios.patch(`${url}/user/orders/${order._id}`, {}, { withCredentials: true }, headerOptions) })
            showAllOrder()
        },
        userFine = () => {
            if (fine !== order.fine && fine !== 0) {
                const { _id } = order
                tryCatch(async () => {
                    const response = await axios.patch(`${url}/user/fine`, { _id, fine }, { withCredentials: true }, headerOptions)
                    if (response.data?.err) { history('/sign-in') }
                })
                showAllOrder();
                totalFineCalculate()
            }
        }
    useEffect(() => {
        userFine()
    }, [])
    return (
        <>
            <tr className="cell">
                <td data-toggle="modal" onClick={() => modalShow(order._id)} data-target="#orderModal" data="Order #">{order._id}</td>
                <td data-toggle="modal" onClick={() => modalShow(order._id)} data-target="#orderModal" data="Book Title">{title}</td>
                <td data-toggle="modal" onClick={() => modalShow(order._id)} data-target="#orderModal" data="Issue Date">{order.createdAt?.slice(0, 10)}</td>
                <td data-toggle="modal" onClick={() => modalShow(order._id)} data-target="#orderModal" data="Return Date">{order.returnDate ? order.returnDate?.slice(0, 10) : '...'}</td>
                <td data-toggle="modal" onClick={() => modalShow(order._id)} data-target="#orderModal" data="Status">
                    <span className={(order.status === 'rejected' ? 'text-danger' : 'text-success')}>{order.status[0].toUpperCase()}{order.status.slice(1)}
                        <i className={"mx-2 " + (order.status === 'rejected' ? 'fa fa-times' : 'fas fa-check')}></i>
                    </span>
                </td>
                <td data-toggle="modal" data-target="#orderModal" data="Fine(TK)" className='text-lg-center'>
                    <span style={(order.fine && !order.paid) ? { color: 'red' } : {}}>{order.fine}</span>{(order.status === 'returned' && order.fine !== 0) ? (order.status === 'returned' && order.paid) ? <b className='text-success'> Paid</b> : <b className='text-danger'> UnPaid</b> : null}
                </td>
                <td data="Action" className='text-lg-center'>
                    {
                        (order.returnDate) ?
                            <button style={{ cursor: 'pointer', padding: '3px 5px' }} disabled={(order.fine === 0 && order.status === 'accepted') ? false : true} title="Renew" onClick={renewOrderHandler}
                                className="btn btn-success m-0 text-white">Renew
                            </button>
                            :
                            <button disabled={(order.status === 'pending') ? false : true} style={{ cursor: 'pointer', padding: '3px 5px' }} title="Delete" onClick={deleteOrderHandler}
                                className="btn btn-danger m-0 text-white delete"><i className="fas fa-trash-alt"></i>
                            </button>
                    }
                </td>

            </tr>

        </>
    )
}
export default Order
