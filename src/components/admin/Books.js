import React, { useState, useEffect } from 'react'
import { ErrorToast, SuccessToast } from '../error/Error'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import { Modal } from 'react-bootstrap'
import { tryCatch } from '../utils/tryCatchHandle'
import ImageInput from '../forms/bookForms/Image'
import Input from '../forms/bookForms/Input'
import Submit from '../forms/bookForms/Submit'
import LoadingSubmit from '../forms/bookForms/LoadingSubmit'
import { bookValidateValue } from '../validators/bookValidator'
import Search from '../search/Search'
import { filteredBooks } from '../common/searchFilter/bookSearchFilter'
import { inputNames, labels, placeholders, headerOptions, adminToken, url } from '../properties/Properties'
import Loader from '../loader/Loader'
const Books = () => {
    const [show, setShow] = useState(false),
        [book, setBook] = useState({ isbn: '', title: '', author: '', edition: '', quantity: '', image: '' }),
        [books, setBooks] = useState([]),
        [searchValue, setSearchValue] = useState(""),
        [submitLoading, setSubmitLoading] = useState(false),
        [loader, setLoader] = useState(true),
        history = useNavigate(),
        showAllBooks = async () => {
            if (adminToken) {
                tryCatch(async () => {
                    const response = await axios.get(`${url}/admin/books`, { withCredentials: true }, { headers: headerOptions })
                    if (!response.data.err) {
                        setBooks(response.data)
                        setLoader(false)
                        //console.log(response.data)
                    } else { history("/sign-in") }
                })
            } else { history("/sign-in"); }
        },
        inputHandler = (event) => {
            const { name, value } = event.target
            setBook((oldBook) => { return { ...oldBook, [name]: value } })
        },
        imageHandler = (event) => {
            setBook((oldBook) => { return { ...oldBook, [event.target.name]: event.target.files[0] } })
        },
        editBook = (book) => {
            setBook(book)
            setShow(true)
        },
        updateBook = async (e) => {
            e.preventDefault()
            const validator = await bookValidateValue(book)
            if (validator.isValid) {
                setSubmitLoading(true)
                const formData = new FormData()
                formData.append('isbn', book.isbn)
                formData.append('title', book.title)
                formData.append('author', book.author)
                formData.append('edition', book.edition)
                formData.append('quantity', book.quantity)
                formData.append('image', book.image)
                await tryCatch(async () => {
                    await axios.patch(`${url}/admin/books/edit/${book._id}`, formData, { withCredentials: true }, { headers: headerOptions })
                    setShow(false)
                    SuccessToast('Updated Successful')
                })
                setSubmitLoading(false)
                showAllBooks()
            } else { ErrorToast(validator.error) }
        },
        searchHandler = (e) => { setSearchValue(e.target.value) }
    useEffect(() => {
        showAllBooks();
    }, [])
    const filterBooks = filteredBooks(books, searchValue)
    return (
        <div className='admin-content' style={{ marginTop: "90px" }}>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <Search searchHandler={searchHandler} />
                        <div className="content mt-3">
                            <div className="container">
                                <div className="row" id="books">
                                    {filterBooks?.map((book, index) => {
                                        if (book.title && book.isbn) {
                                            return (
                                                <BookCard key={index} book={book} editBook={editBook} showAllBooks={showAllBooks} setLoader={setLoader} />
                                            )
                                        }
                                    })}

                                </div>
                            </div>
                        </div>
                        <Modal show={show} onHide={() => { setShow(false); showAllBooks(); }} animation={true} aria-labelledby="contained-modal-title-vcenter">
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Book</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='table-responsive'>
                                    <form className="table mt-5" onSubmit={updateBook}>
                                        <table border="1" align="center" cellPadding="5" cellSpacing="5">
                                            {inputNames.map((inputName, idx) => {
                                                return (<Input key={idx} inputHandler={inputHandler} label={labels[idx]} placeholder={placeholders[idx]} book={book[inputName]} name={inputName} />)
                                            })}
                                            <ImageInput imageHandler={imageHandler} required={false} />
                                            {
                                                submitLoading ?
                                                    <LoadingSubmit />
                                                    : <Submit value="UPDATE" />
                                            }
                                        </table>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
            }
        </div >
    )
}

export default Books
