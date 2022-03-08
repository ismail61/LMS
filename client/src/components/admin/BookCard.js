import React from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import { headerOptions, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle'
const BookCard = ({ book, editBook, showAllBooks, showAllDeletedBooks, setLoader }) => {
    const deleteHandlerBook = async () => {
        let willDelete = await swal({ title: "Are you sure?", icon: "warning", buttons: ["Cancel", "Yes, Delete it"], dangerMode: true, })
        if (willDelete) {
            setLoader(true)
            await tryCatch(async () => {
                await axios.patch(`${url}/admin/books/delete/${book._id}`, {}, { withCredentials: true }, { headers: headerOptions })
                swal({ title: 'Book Deleted', text: 'Yes! Your Book has been deleted!', icon: 'success', timer: 5000, buttons: ["OK"] })
            })
            showAllBooks()
        }
    },
        restoreHandlerBook = async () => {
            let willStore = await swal({ title: "Are you sure?", icon: "info", buttons: ["Cancel", "Yes, restore it"], dangerMode: true, })
            if (willStore) {
                setLoader(true)
                await tryCatch(async () => {
                    await axios.patch(`${url}/admin/books/restore/${book._id}`, {}, { withCredentials: true }, { headers: headerOptions })
                    swal({ title: 'Restored', text: 'Yes! Your Book has been Restored!', icon: 'success', timer: 5000, buttons: ["OK"] })
                })
                showAllDeletedBooks();
            }
        },
        permanentDeleteHandlerBook = async () => {
            let willDelete = await swal({ title: "Are you sure?", text: "Once deleted, you will not be able to recover this book!", icon: "warning", buttons: ["Cancel", "Yes, Delete it"], dangerMode: true, })
            if (willDelete) {
                setLoader(true)
                tryCatch(async () => {
                    await axios.delete(`${url}/admin/books/delete/${book._id}`, { withCredentials: true }, headerOptions)
                    swal({ title: 'Book Deleted', text: 'Yes! This book has been deleted!', icon: 'success', timer: 5000, buttons: false, })
                })
                showAllDeletedBooks()
            }
        }
    return (
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div className="card">
                <a className="img-card">
                    <img src={book.image} />
                </a>
                <div className="card-content">
                    <h4 className="card-title">
                        {book.title}
                    </h4>
                    <p>
                        Edition : <b>{book.edition}</b>
                    </p>
                    <div style={{ float: 'right' }}>
                        Written By : {book.author}
                    </div>
                </div>
                <div className="footer mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='text-success' style={{ fontSize: '22px' }}>Qty : {book?.quantity}</div>
                        {
                            showAllBooks ?
                                <>
                                    <div>
                                        <i onClick={() => editBook(book)} data-toggle="modal" data-target="#myModal" title="Edit" className="far fa-edit m-1 px-1 text-success edit"></i>
                                        <i onClick={deleteHandlerBook} title="Delete" className="fas fa-trash-alt m-1 px-1 text-danger delete"></i>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        {book.ordered === false ? <i onClick={permanentDeleteHandlerBook} title="Permanent Delete" className="fas fa-trash-alt m-1 px-1 text-danger edit"></i> : null}
                                        <i onClick={restoreHandlerBook} title="Restore" className="fas fa-trash-restore m-1 px-1 text-success edit"></i>
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

export default BookCard
