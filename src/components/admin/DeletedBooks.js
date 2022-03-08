import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import Search from '../search/Search'
import { filteredBooks } from '../common/searchFilter/bookSearchFilter'
import { headerOptions, adminToken, url } from '../properties/Properties'
import Loader from '../loader/Loader'
import { tryCatch } from '../utils/tryCatchHandle'
const DeletedBooks = () => {
    const [books, setBooks] = useState([]),
        [searchValue, setSearchValue] = useState(""),
        [loader, setLoader] = useState(true),
        history = useNavigate(),
        showAllDeletedBooks = async () => {
            if (adminToken) {
                tryCatch(async () => {
                    const response = await axios.get(`${url}/admin/deleted-books`, { withCredentials: true }, { headers: headerOptions })
                    if (response.data?.err) history("/sign-in");
                    setBooks(response.data)
                })
                setLoader(false)
            } else { history("/sign-in"); }
        },
        searchHandler = (e) => { setSearchValue(e.target.value) }
    useEffect(() => {
        showAllDeletedBooks();
    }, [])
    let filterBooks = filteredBooks(books, searchValue)
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
                                                <BookCard key={index} book={book} showAllDeletedBooks={showAllDeletedBooks} setLoader={setLoader} />
                                            )
                                        }
                                    })}

                                </div>
                            </div>
                        </div>
                    </>
            }
        </div >
    )
}

export default DeletedBooks
