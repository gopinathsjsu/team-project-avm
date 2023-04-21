import React from 'react';
import { Link } from 'react-router-dom';


import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberLogin from '../member/MemberLogin.js';
import AdminLogin from '../admin/AdminLogin.js';

import FitfinityLogo from '../../assets/videos/FitfinityLogo.gif';

function NavbarHome() {
    const [memberModalShow, setMemberModalShow] = React.useState(false);
    const [adminModalShow, setAdminModalShow] = React.useState(false);
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
                            <Nav.Link href="/workout">The Workout</Nav.Link>
                            <Nav.Link href="/locations">Locations</Nav.Link>
                            <Nav.Link href="/memberships">Membership</Nav.Link>
                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => setMemberModalShow(true)}>Member Login</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => setAdminModalShow(true)}>Admin Login</NavDropdown.Item>
                            </NavDropdown>
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