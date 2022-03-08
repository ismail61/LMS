import React from 'react'
import { useNavigate } from 'react-router-dom';
const Order = ({ id, title, name, email, status }) => {
    const history = useNavigate()
    return (
        <>
            <tr className="cell">
                <td data="Order #">{id}</td>
                <td data="Book Title">{title}</td>
                <td data="User Name">{name}</td>
                <td data="User Email">{email}</td>
                <td data="Accept/Reject" className='text-lg-center'>
                    {
                        (status) === 'pending' ? (
                            <>
                                <button className='btn-success px-3' onClick={() => history('/admin/orders')}>Details</button>
                            </>
                        ) : (
                            <>
                                <span className={(status === 'rejected' ? 'text-danger' : 'text-success')}>{status[0].toUpperCase()}{status.slice(1)}
                                    <i className={"mx-2 " + (status === 'rejected' ? 'fas fa-times' : 'fa fa-check')}></i>
                                </span>
                            </>
                        )
                    }
                </td >
            </tr >
        </>
    )
}

export default Order
