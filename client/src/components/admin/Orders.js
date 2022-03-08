import React, { useState, useEffect, useRef } from 'react'
import { SuccessToast } from '../error/Error'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import Order from './Order'
import { headerOptions, adminToken, userToken, url } from '../properties/Properties'
import { calculateFine } from '../common/fine/CalculateFine'
import Search from '../search/Search'
import { tryCatch } from '../utils/tryCatchHandle'
import { filteredOrders } from '../common/searchFilter/orderSearchFilter'
import Loader from '../loader/Loader'
const Orders = () => {
    const [orders, setOrders] = useState([]),
        socket = useRef(io(url)),
        [admin, setAdmin] = useState({}),
        [searchValue, setSearchValue] = useState(""),
        [loader, setLoader] = useState(true),
        history = useNavigate(),
        showAllOrder = async () => {
            if (adminToken) {
                const response = await axios.get(`${url}/admin/orders`, { withCredentials: true }, headerOptions)
                if (response.data?.err) history("/sign-in");
                setOrders(response.data)
                setLoader(false)
            }
            else if (userToken) { history("/user/books"); }
            else history("/sign-in");
        },
        adminInfo = async () => {
            if (!adminToken) history("/sign-in");
            const response = await axios.get(`${url}/admin/account`, { withCredentials: true }, headerOptions)
            if (response.data?.err) history("/sign-in");
            setAdmin(response.data)
        },
        rejectOrder = async (id) => {
            setLoader(true)
            tryCatch(async () => {
                await axios.patch(`${url}/admin/orders/rejected/${id}`, { status: 'rejected' }, { withCredentials: true }, headerOptions)
                SuccessToast('Order Rejected')
            })
            showAllOrder();
        },
        acceptOrder = async (id) => {
            setLoader(true)
            tryCatch(async () => {
                await axios.patch(`${url}/admin/orders/accepted/${id}`, { status: 'accepted' }, { withCredentials: true }, headerOptions)
                SuccessToast('Order Accepted')
            })
            showAllOrder();
        },
        searchHandler = (e) => { setSearchValue(e.target.value) }

    useEffect(() => {
        if (admin) socket.current.emit('addAdmin', admin._id)
        /*  socket.current.on('getAdmins', (admins) => {
             console.log(admins)
         }) */
        socket.current.on('orderPlaced', (data) => {
            if (admin._id === data.adminId) {
                SuccessToast(`New Order Placed`)
                showAllOrder();
            }
        })
        socket.current.on('orderRenewed', (data) => {
            if (admin._id === data.adminId) {
                SuccessToast(`An order has been renewed`)
                showAllOrder();
            }
        })
        socket.current.on('orderDeleted', (data) => {
            if (admin._id === data.adminId) {
                SuccessToast(`An order has been deleted by user for some reason`)
                showAllOrder();
            }
        })
    }, [orders])


    useEffect(() => {
        adminInfo()
        showAllOrder();
    }, [])
    const filterOrders = filteredOrders(orders, searchValue, "admin")
    return (
        <div className='admin-content' style={{ marginTop: "90px" }}>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <Search searchHandler={searchHandler} />
                        <div className="container mt-3" >
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-12">
                                    <div className="rounded">
                                        <div className="table-responsive table-borderless">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order #LMS</th>
                                                        <th title='Book Title'>Book Title</th>
                                                        {/* <th title="User Name">User Name</th> */}
                                                        <th title="User Email">User Email</th>
                                                        <th title="Issue Date">Issue Date</th>
                                                        <th title="Order Fine">Fine</th>
                                                        <th title="Status">Status</th>
                                                        <th>Action</th>
                                                        <th title="Assign Return Date">Assign RD <i title="Return Date" className="fas fa-info-circle"></i></th>
                                                    </tr>
                                                </thead>
                                                <tbody id="table-body" className="table-body">
                                                    {
                                                        filterOrders?.map((order, index) => {
                                                            let fine = calculateFine(order.returnDate, order.status)
                                                            if (order.bookId && order.userId) {
                                                                return (
                                                                    <Order setLoader={setLoader} showAllOrder={showAllOrder} key={index} fine={fine || 0} order={order} title={order.bookId.title} email={order.userId.email} acceptOrder={acceptOrder} rejectOrder={rejectOrder} />
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Orders
