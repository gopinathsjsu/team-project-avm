import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');

    useEffect(() => {
        const storedObject = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
        console.log("loggedin user data==>", storedObject);
        if (storedObject) {
            if (storedObject.token) {
                setUsername(storedObject.user);
            }
        }
    }, [])

    const handleLogout = (event) => {
        window.sessionStorage.removeItem("USER_DETAILS");
        setUsername('');
        navigate('/');
    }


    return (
        <>
            <Navbar className="container-fluid" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        Fitfinity HealthClub
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="navbarlink">
                        <Nav className="ms-auto">
                            {/* Public Navs */}
                            {/* <Nav.Link href="/workout">The Workout</Nav.Link>
                            <Nav.Link href="/locations">Locations</Nav.Link>
                            <Nav.Link href="/memberships">Membership</Nav.Link> */}
                            {/* Admin Navs */}

                            <Nav.Link href="/adminpage">Dashboard</Nav.Link>
                            <Nav.Link href="/adminpage/enrollmember">Register Members</Nav.Link>
                            <Nav.Link href="/adminpage/logmember">Checkin Members</Nav.Link>
                            <NavDropdown title={username} id="basic-nav-dropdown">
                                <NavDropdown.Item >User Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default AdminNavbar;