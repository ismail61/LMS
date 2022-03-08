import React, { useState, useEffect, useRef } from 'react'
import { ErrorToast, SuccessToast } from '../error/Error'
import axios from 'axios'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import { headerOptions, adminToken, userToken, url } from '../properties/Properties'
import BookCard from './BookCard';
import Search from '../search/Search'
import { filteredBooks } from '../common/searchFilter/bookSearchFilter'
import Loader from '../loader/Loader'
import { tryCatch } from '../utils/tryCatchHandle';
const Books = () => {
    const [books, setBooks] = useState([]),
        history = useNavigate(),
        socket = useRef(io(url)),
        [loader, setLoader] = useState(true),
        [searchValue, setSearchValue] = useState(""),
        showBooks = async () => {
            if (userToken) {
                const response = await axios.get(`${url}/user/books`, { withCredentials: true }, { headerOptions })
                if (response.data?.err) { history('/sign-in') }
                setLoader(false)
                setBooks(response.data)
            }
            else if (adminToken) history("/admin/books");
            else history("/sign-in");
        },
        orderHandler = (bookId) => {
            setLoader(true)
            tryCatch(async () => {
                const response = await axios.post(`${url}/user/make-order`, { bookId }, { withCredentials: true }, headerOptions)
                if (response.data?.err) { history('/sign-in') }
                SuccessToast('New Order Successful')
                history("/user/orders");
            })
            setLoader(false)
        },
        searchHandler = (e) => { setSearchValue(e.target.value) }
    useEffect(() => {
        //if(user) socket.current.emit('addUser',user._id)
        /*  socket.current.on('getUsers', (users) => {
            console.log(users)
        })  */
        socket.current.on('bookAdded', () => {
            showBooks()
        })
        socket.current.on('bookDeleted', () => {
            showBooks()
        })
        socket.current.on('bookUpdated', () => {
            showBooks()
        })
    }, [books])
    useEffect(() => {
        showBooks();
    }, [])
    const filterBooks = filteredBooks(books, searchValue)
    return (
        <div style={{ marginTop: "82px" }}>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <Search searchHandler={searchHandler} />
                        <div className="content mt-3">
                            <div className="container-lg">
                                <div className="row" id="books">
                                    {filterBooks?.map((book, index) => {
                                        if (book.title && book.isbn) {
                                            return (
                                                <BookCard key={index} book={book} orderHandler={orderHandler} />
                                            )
                                        }
                                    })}

                                </div>
                            </div>
                        </div>
                    </>}
        </div >
    )
}

export default Books
