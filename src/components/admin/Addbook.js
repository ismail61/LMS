import React, { useState, useEffect } from 'react'
import { ErrorToast, SuccessToast } from '../error/Error'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom';
import ImageInput from '../forms/bookForms/Image'
import Input from '../forms/bookForms/Input'
import Submit from '../forms/bookForms/Submit'
import LoadingSubmit from '../forms/bookForms/LoadingSubmit'
import { bookValidateValue } from '../validators/bookValidator'
import { inputNames, labels, placeholders, headerOptions, adminToken, userToken, url } from '../properties/Properties'
import { tryCatch } from '../utils/tryCatchHandle'
const Addbook = () => {
    const [book, setBook] = useState({ isbn: '', title: '', author: '', edition: '', quantity: '', image: '' }),
        history = useNavigate(),
        [submitLoading, setSubmitLoading] = useState(false),
        validAdmin = async () => {
            if (adminToken) {
                const response = await axios.get(`${url}/admin/add-book`, { withCredentials: true }, headerOptions)
                if (response.data?.err) {
                    history("/sign-in");
                }
            }
            else if (userToken) { history("/user/books"); }
            else history("/sign-in");
        },
        inputHandler = (event) => {
            const { name, value } = event.target
            setBook((oldBook) => { return { ...oldBook, [name]: value } })
        },
        imageHandler = (event) => {
            setBook((oldBook) => { return { ...oldBook, [event.target.name]: event.target.files[0] } })
        },
        addBookSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('isbn', book.isbn)
            formData.append('title', book.title)
            formData.append('author', book.author)
            formData.append('edition', book.edition)
            formData.append('quantity', book.quantity)
            formData.append('image', book.image)
            const validator = await bookValidateValue(book)
            if (validator.isValid) {
                setSubmitLoading(true)
                await tryCatch(async () => {
                    await axios.post(`${url}/admin/add-book`, formData, { withCredentials: true }, { headers: headerOptions })
                    SuccessToast('New Book added Successful')
                    history('/admin/books')
                })
                setSubmitLoading(false)
            } else { ErrorToast(validator.error) }
        }
    useEffect(() => {
        validAdmin();
    }, [])
    return (
        <div className='admin-content' style={{ marginTop: "120px" }}>
            <form className="table" onSubmit={addBookSubmit} >
                <table border="1" align="center" cellPadding="5" cellSpacing="5">
                    {inputNames?.map((inputName, idx) => {
                        return (<Input inputHandler={inputHandler} key={idx} label={labels[idx]} placeholder={placeholders[idx]} book={book[idx]} name={inputName} />)
                    })}
                    <ImageInput imageHandler={imageHandler} required={true} />
                    {
                        submitLoading ?
                            <LoadingSubmit />
                            : <Submit value="SUBMIT" />
                    }
                </table>
            </form>
            <center>
                <div className="container all-books mt-4">
                    To see all books Please visit <NavLink to="/admin/books">Books</NavLink>
                </div>
            </center>
        </div>
    )
}

export default Addbook
