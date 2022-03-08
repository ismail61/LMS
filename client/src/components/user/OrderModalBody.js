import React from 'react'
import './css/Modal.css'
const ModalBody = ({ modalOrder }) => {
    return (
        <>
            <h6>Item Details</h6>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3"> 
                    <img className="img-fluid" src={modalOrder.image} /> 
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9">
                    <ul type="none">
                        <li>Book Name: <b>{modalOrder.title}</b></li>
                        <li>Author: <b>{modalOrder.author}</b></li>
                        <li>Edition: <b>{modalOrder.edition}</b></li>
                    </ul>
                </div>
            </div>
            <h6 className='order-details'>Order Details</h6>
            <div className="row">
                <div className="col-md-12">
                    <ul type="none">
                        <li>Order #LMS: <span style={{ fontWeight: 'bold' }}>{modalOrder.id}</span> </li>
                        <li>Order Date: <span style={{ fontWeight: 'bold' }}>{modalOrder.date?.slice(0, 10)}</span> </li>
                    </ul>
                </div>
            </div>
            <h6 className='return-details'>Return Details</h6>
            <div className="row" style={{ borderBottom: 'none' }}>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <ul type="none">
                        <li className="left">Return Date :</li>
                    </ul>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <ul type="none" style={{ borderBottom: 'none' }}>
                        <li><span style={{ fontWeight: 'bold' }}>{modalOrder?.returnDate?.slice(0, 10)}</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ModalBody
