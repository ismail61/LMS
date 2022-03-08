import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Offcanvas, Collapse } from 'react-bootstrap'
import { adminToken, userToken } from '../properties/Properties'
import '../admin/css/OffCanvasSlideNav.css'
import '../admin/css/slideNav.css'
const LMSNavbar = () => {
    const [state, setState] = useState('')
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleShow = () => setShow(true);
    const [expanded, setExpanded] = useState(false);
    const Onclick = () => {
        setShow(false);
        setOpen(false)
    }
    const RenderMenu = () => {
        if (state) {
            if (state === 'user') {
                return (
                    <Nav className="mr-auto auth" >
                        <div className="navbar-nav mx-md-0 mx-lg-2">
                            <NavLink to="/user/books" className="nav-item nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}><i className="fas fa-book"></i> Books</NavLink>
                        </div>
                        <div className="navbar-nav mx-md-0 mx-lg-2">
                            <NavLink to="/user/orders" className="nav-item nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}><i className="fab fa-first-order"></i> Orders</NavLink>
                        </div>
                        <div className="navbar-nav mx-md-0 mx-lg-2">
                            <NavLink to="/user/logout" className="nav-item nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                        </div>
                        <NavDropdown title="Profile" id="navbarCollapse">
                            <NavDropdown.Item as={NavLink} to="/user/account" key="1" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>My Account</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/user/books" key="2" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>Books</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/user/orders" key="3" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>My Orders</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                )
            } else if (state === 'admin') {
                return (
                    <>
                        <Offcanvas show={show} onHide={Onclick} className="offcanvas">
                            <div id="mySidenav" className="sidenav">
                                <div className="closebtn" onClick={Onclick} >&times;</div>
                                <ul id="main-nav">
                                    <li onClick={Onclick} >
                                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ''}>
                                            <i className="fas fa-tachometer-alt icon"></i>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="example-collapse-text">
                                        <a>
                                            <i className="fas fa-book icon" ></i>
                                            Books <i className="fas fa-angle-down"></i>
                                        </a>
                                    </li>
                                    <Collapse in={open}>
                                        <div id="example-collapse-text">
                                            <ul className='collapse-books'>
                                                <li style={{ listStyleType: "none" }} onClick={Onclick} >
                                                    <NavLink to="/admin/books" className={({ isActive }) => isActive ? "active" : ''}>
                                                        <i className="fas fa-book small-icon"></i>
                                                        <span>Books</span>
                                                    </NavLink>
                                                </li>
                                                <li style={{ listStyleType: "none" }} onClick={Onclick} >
                                                    <NavLink to="/admin/add-book" className={({ isActive }) => isActive ? "active" : ''}>
                                                        <i className="fas fa-book small-icon"></i>
                                                        <span> Add Book</span>
                                                    </NavLink>
                                                </li>
                                                <li style={{ listStyleType: "none" }} onClick={Onclick} >
                                                    <NavLink to="/admin/deleted-books" className={({ isActive }) => isActive ? "active" : ''}>
                                                        <i className="fas fa-book small-icon"></i>
                                                        <span>Deleted Books</span>
                                                    </NavLink>
                                                </li>
                                            </ul></div>
                                    </Collapse>
                                    <li className='order' onClick={Onclick} >
                                        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "active" : ''}>
                                            <i className="fab fa-first-order icon"></i>
                                            Orders
                                        </NavLink>
                                    </li>
                                    <li onClick={Onclick} >
                                        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "active" : ''}>
                                            <i className="fa fa-users icon"></i>
                                            Users
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Offcanvas>
                        <div className="mr-auto admin-auth" >
                            <NavDropdown title="Profile" id="navbarCollapse">
                                <NavDropdown.Item as={NavLink} to="/admin/account" key="1">My Account</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/admin/orders" key="2">Orders</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/admin/logout" key="3">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </>
                )
            }
        } else {
            return (
                <Nav className="mr-auto auth" >
                    <div className="navbar-nav mx-md-0 mx-lg-2">
                        <NavLink to="/sign-in" className="nav-item nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>
                            <i className="fas fa-sign-in-alt"></i> Signin</NavLink>
                    </div>
                    <div className="navbar-nav mx-md-0 mx-lg-2">
                        <NavLink to="/sign-up" className="nav-item nav-link" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>
                            <i className="fas fa-user-plus"></i> Signup</NavLink>
                    </div>
                </Nav>
            )
        }
    }
    useEffect(() => {
        setState(adminToken ? 'admin' : (userToken) ? 'user' : '')
    }, [adminToken, userToken])
    return (
        <div>
            <Navbar bg='dark' variant="dark" expand="lg" fixed="top" style={{ padding: '1%' }} expanded={expanded}>
                <div className='container'>
                    {
                        state === 'admin' ? (
                            <>
                                <span className='bars-icon' onClick={handleShow}>
                                    <i className="fas fa-bars" style={{ fontSize: '28px', color: '#98cde6' }}></i>
                                </span>
                                <Navbar.Brand><div className="navbar-brand navbar-brand-lg">Library Management <span className="system">System</span></div>
                                    <div className="navbar-brand-small">LMS | Admin</div></Navbar.Brand>
                                <div className="justify-content-end">
                                    <RenderMenu />
                                </div>
                            </>
                        ) : (
                            <>
                                <Navbar.Brand><div className="navbar-brand navbar-brand-lg">Library Management <span className="system">System</span></div>
                                    <div className="navbar-brand-small">LMS || User</div></Navbar.Brand>
                                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="navbarCollapse">
                                    <span className="navbar-toggler-icon">
                                        <i className="fas fa-bars" style={{ fontSize: '28px', color: '#98cde6' }}></i>
                                    </span>
                                </Navbar.Toggle>

                                <Navbar.Collapse id="navbarCollapse" className="justify-content-end">
                                    <RenderMenu />
                                </Navbar.Collapse></>
                        )
                    }
                </div>
            </Navbar>

        </div>
    )
}

export default LMSNavbar
