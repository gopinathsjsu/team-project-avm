import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from '../../actions/API.js';
import { useNavigate } from 'react-router-dom';

function MemberNavbar() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [userRole, setUserRole] = React.useState('');

    useEffect(() => {
        const storedObject = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
        console.log("loggedin user data==>", storedObject);
        if (storedObject) {
            if (storedObject.token) {
                //setUsername(storedObject.user);
                setUserRole(storedObject.role)
            }
            API.fetchMemberDetails(storedObject.email).then(response => {
                setUsername(response.data.firstName+' '+response.data.lastName);
            }).catch(error => {
                console.log(error);
            })
        }

    }, [])

    const handleLogout = (event) => {
        window.sessionStorage.removeItem("USER_DETAILS");
        window.sessionStorage.removeItem("USER_DATA");
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
                            {/* Member Navs */}
                            {/* {userRole === 'MEMBER' ? (
                                <> */}
                            <Nav.Link href="/memberpage/activities">Activities</Nav.Link>
                            <Nav.Link href="/memberpage/tracker">Workout Tracker</Nav.Link>
                            {/* </>
                            ) : null} */}
                            <Nav.Link href="/memberpage/memberclasses">Classes</Nav.Link>

                            <NavDropdown title={username} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MemberNavbar;