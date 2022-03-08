import React, { useState } from 'react'
import './css/slideNav.css'
import { NavLink } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'
const SlideNav = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div>
                <nav id="sidenav">
                    <ul id="main-nav">
                        <li onClick={() => setOpen(false)} >
                            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive? "active": ''}>
                                <i className="fas fa-tachometer-alt icon"></i>
                                Dashboard
                            </NavLink>
                        </li>
                        <li onClick={() => setOpen(!open)} aria-expanded={open}>
                            <a>
                                <i className="fas fa-book icon" ></i>
                                Books <i className="fas fa-angle-down"></i>
                            </a>
                        </li>
                        <Collapse in={open}>
                            <ul className='collapse-books'>
                                <li style={{ listStyleType: "none" }}>
                                    <NavLink to="/admin/books" className={({ isActive }) => isActive? "active": ''}>
                                        <i className="fas fa-book small-icon"></i>
                                        <span>Books</span>
                                    </NavLink>
                                </li>
                                <li style={{ listStyleType: "none" }}>
                                    <NavLink to="/admin/add-book" className={({ isActive }) => isActive? "active": ''}>
                                        <i className="fas fa-book small-icon"></i>
                                        <span> Add Book</span>
                                    </NavLink>
                                </li>
                                <li style={{ listStyleType: "none" }}>
                                    <NavLink to="/admin/deleted-books" className={({ isActive }) => isActive? "active": ''}>
                                        <i className="fas fa-book small-icon"></i>
                                        <span>Deleted Books</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                        <li className='order' onClick={() => setOpen(false)}>
                            <NavLink to="/admin/orders" className={({ isActive }) => isActive? "active": ''}>
                                <i className="fab fa-first-order icon"></i>
                                Orders
                            </NavLink>
                        </li>
                        <li onClick={() => setOpen(false)}>
                            <NavLink to="/admin/users" className={({ isActive }) => isActive? "active": ''}>
                                <i className="fa fa-users icon"></i>
                                Users
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default SlideNav
