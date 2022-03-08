import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import DashboardTop from './dashboard/DashboardTop'
import Orders from './dashboard/Orders'
import { headerOptions, adminToken, userToken, url } from '../properties/Properties'
import '../admin/css/dashboard.css'
import Loader from '../loader/Loader'
import { tryCatch } from '../utils/tryCatchHandle'
const Dashboard = () => {
    const [orders, setOrders] = useState([]),
        [loader, setLoader] = useState(true),
        [books, setBooks] = useState(0),
        [pendingOrder, setPendingOrder] = useState(0),
        [returnedOrder, setReturnedOrder] = useState(0),
        [totalFine, setTotalFine] = useState(0),
        [users, setUsers] = useState(0),
        history = useNavigate(),
        commonGetRequest = async (path, setState) => {
            tryCatch(async () => {
                const response = await axios.get(`${url}/${path}`, { withCredentials: true }, headerOptions)
                if (!response.data.err) {
                    if (path === 'admin/books' || path === 'users') setState(response.data?.length || 0)
                    else setState(response.data || 0)
                    setLoader(false)
                } else { history("/sign-in"); }
            })
        },
        showAllOrder = async () => {
            if (adminToken) { commonGetRequest('admin/orders', setOrders) }
            else if (userToken) { history("/user/books"); } else history("/sign-in");
        },
        pendingOrderCount = async () => {
            commonGetRequest('admin/pending-orders', setPendingOrder)
        },
        returnedOrderCount = async () => {
            commonGetRequest('admin/returned-orders', setReturnedOrder)
        },
        allBooksCount = async () => {
            commonGetRequest('admin/books', setBooks)
        },
        allUsers = async () => {
            commonGetRequest('users', setUsers)
        },
        totalFineCollection = async () => {
            commonGetRequest('admin/total-fine', setTotalFine)
        }
    useEffect(() => {
        showAllOrder();
        pendingOrderCount();
        returnedOrderCount()
        allBooksCount();
        allUsers()
        totalFineCollection();
    }, [])
    return (
        <div className='admin-content' style={{ marginTop: "90px" }} >
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <div className='container-lg container-md'>
                            <div className='row'>
                                {
                                    (books || orders || users) ? <DashboardTop count={[pendingOrder, books, orders?.length, returnedOrder, users, totalFine]} /> : null
                                }
                            </div>
                            <hr style={{ margin: '0', color: '#913831', height: '2px' }} />
                            <div className='row'>
                                <Orders orders={orders} />
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Dashboard
