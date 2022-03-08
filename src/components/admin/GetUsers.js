import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { headerOptions, adminToken, userToken, url } from '../properties/Properties'
import SingleUser from './SignleUser'
import Loader from '../loader/Loader'
const GetUsers = () => {
    const [users, setUsers] = useState([]),
        [loader, setLoader] = useState(true),
        history = useNavigate(),
        showAllUsers = async () => {
            if (adminToken) {
                const response = await axios.get(`${url}/users`, { withCredentials: true }, headerOptions)
                if (!response.data.err && response.data) {
                    setUsers(response.data)
                    setLoader(false)
                } else { history("/sign-in"); }
            }
            else if (userToken) { history("/user/books"); } else history("/sign-in");
        }
    useEffect(() => {
        showAllUsers();
    }, [])
    return (
        <div className='admin-content' style={{ marginTop: "90px" }}>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        <div className="container mt-3" >
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-12">
                                    <div className="rounded">
                                        <div className="table-responsive table-borderless">
                                            <Table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Index</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="table-body" className="table-body">
                                                    {
                                                        users?.map((user, index) => {
                                                            if (user.name && user.email) {
                                                                return (
                                                                    <SingleUser inc={index} key={index} name={user.name} email={user.email} />
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
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

export default GetUsers
