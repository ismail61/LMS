import React from 'react'
import { Table } from 'react-bootstrap'
import Order from './Order'
const Orders = (props) => {
    if (props?.orders?.length > 0) {
        return (
            <div>
                <b style={{fontSize : '20px'}}>Last 4 Orders :</b>
                <div className="mt-3" >
                    <Table responsive bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Order #LMS</th>
                                <th>Book Title</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Accept/Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.orders?.slice(0, 4)?.map((order, index) => {
                                    if (order.bookId && order.userId) {
                                        return (
                                            <Order key={index} id={order._id} title={order.bookId.title} name={order.userId.name} email={order.userId.email} status={order.status} />
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <b style={{fontSize : '20px'}}>No Orders</b>
            </div>
        )
    }

}

export default Orders
