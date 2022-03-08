import React, { useState, useEffect, useRef } from 'react'
import { ErrorToast, SuccessToast } from '../error/Error'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import io from 'socket.io-client'
import { headerOptions, adminToken, userToken, url } from '../properties/Properties'
import Order from './Order'
import ModalBody from './OrderModalBody'
import { calculateFine } from '../common/fine/CalculateFine'
import Search from '../search/Search'
import { filteredOrders } from '../common/searchFilter/orderSearchFilter'
import Loader from '../loader/Loader'
const Orders = () => {
    const [orders, setOrders] = useState([]),
        socket = useRef(io(url)),
        [totalFine, setTotalFine] = useState(0),
        [searchValue, setSearchValue] = useState(""),
        [loader, setLoader] = useState(true),
        [show, setShow] = useState(false),
        [modalOrder, setModalOrder] = useState({ id: '', image: '', title: '', author: '', edition: '', date: '', returnDate: '' }),
        history = useNavigate(),
        showAllOrder = async () => {
            if (userToken) {
                const response = await axios.get(`${url}/user/orders`, { withCredentials: true }, headerOptions)
                if (response.data?.err) { history('/sign-in') }
                setOrders(response.data)
                setLoader(false)
            }
            else if (adminToken) { history("/admin/books"); }
            else { history("/sign-in"); }
        },
        modalShow = (id) => {
            let modalOrderNow = orders.filter(order => order._id === id)
            setModalOrder({
                id: id,
                image: modalOrderNow[0].bookId.image,
                title: modalOrderNow[0].bookId.title,
                author: modalOrderNow[0].bookId.author,
                edition: modalOrderNow[0].bookId.edition,
                date: modalOrderNow[0].createdAt,
                returnDate: modalOrderNow[0].returnDate
            })
            setShow(true)
        },
        totalFineCalculate = async () => {
            const response = await axios.get(`${url}/user/fine`, { withCredentials: true }, headerOptions)
            if (!response.data?.err && response.data) { setTotalFine(response.data) } else { setTotalFine(0) }
        },
        searchHandler = (e) => { setSearchValue(e.target.value) }
    useEffect(() => {
        if (orders) {
            orders.forEach(order => {
                socket.current.emit("addOrder", order._id)
            })
        }
        /*  socket.current.on('getOrders', (orders) => {
             //console.log(orders)
         })
         socket.current.on('getAdmins', (admins) => {
             console.log(admins)
         })  */
        socket.current.on('orderUpdated', (data) => {
            const findUpdatedOrder = orders?.find(order => order._id == data._id)
            if (findUpdatedOrder) {
                SuccessToast(`Order ${data.status}`)
                showAllOrder();
            }
        })
        socket.current.on('orderReturnedDateAssign', (data) => {
            const findUpdatedOrder = orders?.find(order => order._id == data._id)
            if (findUpdatedOrder) {
                SuccessToast(`Return Date Assigned for an order`)
                showAllOrder();
            }
        })
        socket.current.on('orderPaid', (data) => {
            const findPaidOrder = orders?.find(order => order._id == data._id)
            if (findPaidOrder) {
                SuccessToast(`Payment Successful`)
                totalFineCalculate()
                showAllOrder();
            }
        })
        socket.current.on('orderReturned', (data) => {
            const findPaidOrder = orders?.find(order => order._id == data._id)
            if (findPaidOrder) {
                SuccessToast(`An Order's Status Changed`)
                showAllOrder();
            }
        })
    }, [orders])

    useEffect(() => {
        showAllOrder();
        totalFineCalculate()
    }, [totalFine])
    const filterOrders = filteredOrders(orders, searchValue, "user")
    return (
        <div style={{ marginTop: "82px" }}>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <div className="container mt-3" style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '20px', color: 'brown' }}>
                                Total Fine(TK) : {totalFine}
                            </div>
                        </div>
                        <Search searchHandler={searchHandler} />
                        <div className="container mt-3">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-10">
                                    <div className="rounded">
                                        <div className="table-responsive table-borderless">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order #LMS</th>
                                                        <th>Book Name</th>
                                                        <th>Issue date</th>
                                                        <th>Return Date</th>
                                                        <th>Status</th>
                                                        <th>Fine(TK)</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="table-body" className="table-body">
                                                    {filterOrders?.map((order, index) => {
                                                        let fine = calculateFine(order.returnDate, order.status)
                                                        if (order.bookId) {
                                                            return (
                                                                <Order order={order} showAllOrder={showAllOrder} totalFineCalculate={totalFineCalculate} fine={fine || 0} key={index} title={order.bookId.title} modalShow={modalShow} setLoader={setLoader} />
                                                            )
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal show={show} onHide={() => setShow(false)} animation={true} aria-labelledby="contained-modal-title-vcenter" className="modal">
                            <Modal.Header closeButton>
                                <Modal.Title>Order History</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <ModalBody modalOrder={modalOrder} />
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>}
        </div>
    )
}

export default Orders
