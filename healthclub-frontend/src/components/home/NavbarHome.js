import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberLogin from '../member/MemberLogin.js';
import AdminLogin from '../admin/AdminLogin.js';
import { useNavigate } from 'react-router-dom';
import FitfinityLogo from '../../assets/videos/FitfinityLogo.gif';

function NavbarHome() {
    const navigate = useNavigate();
    const [memberModalShow, setMemberModalShow] = React.useState(false);
    const [adminModalShow, setAdminModalShow] = React.useState(false);

    const [userType, setUserType] = React.useState('');
    const [username, setUsername] = React.useState('');

    useEffect(() => {
        const storedObject = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
        console.log("loggedin user data==>", storedObject);
        if (storedObject) {
            if (storedObject.token) {
                setUserType(storedObject.role);
                setUsername(storedObject.user);
            }
        }
    }, [])

    const handleLogout = (event) => {
        window.sessionStorage.removeItem("USER_DETAILS");
        setUserType('');
        setUsername('');
        navigate('/');
    }


    return (
        <>
            <Navbar className="container-fluid" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        {/* <img
                            alt=""
                            src={FitfinityLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '} */}
                        Fitfinity HealthClub
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="navbarlink">
                        <Nav className="ms-auto">
                            {/* Public Navs */}
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/workout">The Workout</Nav.Link>
                            <Nav.Link href="/locations">Locations</Nav.Link>
                            <Nav.Link href="/memberships">Membership</Nav.Link>
                            {userType === '' ? (
                                <>
                                    <NavDropdown title="Login" id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={() => setMemberModalShow(true)}>Member Login</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => setAdminModalShow(true)}>Admin Login</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : null}
                            {/* Admin Navs */}
                            {userType === 'STAFF' ? (
                                <>
                                    <Nav.Link href="/adminpage">Dashboard</Nav.Link>
                                    <Nav.Link href="/adminpage/enrollmember">Register Members</Nav.Link>
                                    <Nav.Link href="/adminpage/logmember">Checkin Members</Nav.Link>
                                </>
                            ) : null}
                            {/* Member Navs */}
                            {userType === 'MEMBER' ? (
                                <>
                                    <Nav.Link href="/memberpage/activities">Activities</Nav.Link>
                                    <Nav.Link href="/memberpage/memberclasses">Classes</Nav.Link>
                                    <Nav.Link href="/memberpage/tracker">Workout Tracker</Nav.Link>
                                </>
                            ) : null}

                            {(userType === 'STAFF' || userType === 'MEMBER') ? (
                                <>
                                    <NavDropdown title={username} id="basic-nav-dropdown">
                                        <NavDropdown.Item >User Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <MemberLogin
                show={memberModalShow}
                onHide={() => setMemberModalShow(false)}
            />

            <AdminLogin
                show={adminModalShow}
                onHide={() => setAdminModalShow(false)}
            />
        </>
    )
}

export default NavbarHome;