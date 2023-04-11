import React, { Component } from "react";
// import { Router, Link, Switch, Route, Routes } from 'react-router-dom'
// import { FaUserAlt } from "react-icons/fa";
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import Overlay from "react-overlay-component";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavbarComponent.css';

class NavbarComponent extends Component {

    state = {
        adminoverlay: false,
        memberoverlay: false
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleMemberClick = this.handleMemberClick.bind(this);
        this.handleAdminClick = this.handleAdminClick.bind(this);

    }

    configs = {
        animate: true
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleMemberClick() {
        this.setState((prevState) => ({ memberoverlay: !prevState.memberoverlay }));
    }

    handleAdminClick() {
        this.setState((prevState) => ({ adminoverlay: !prevState.adminoverlay }));
    }

    faStyle = {
        color: 'white'
    }

    render() {
        const { email, password } = this.state;
        const isButtonDisabled = email === '' || password === '';
        return (
            <>
                <Navbar className="container-fluid" bg="light">
                    <Container>
                        <Navbar.Brand href="/">Fitfinity HealthClub</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="navbarlink">
                            <Nav className="ms-auto">
                                <Nav.Link href="/workout">The Workout</Nav.Link>
                                <Nav.Link href="/locations">Locations</Nav.Link>
                                <Nav.Link href="/memberships">Membership</Nav.Link>
                                <NavDropdown title="Login" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={this.handleMemberClick}>Member Login</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.handleAdminClick}>Admin Login</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* <header>
                    <div className="header">
                        <nav className="navigation">
                            <a href="/" className="navbar-logo">Fitfinity HealthClub</a>
                            <div className="navbar-right">
                                <a href="/workout">The Workout</a>
                                <a href="/locations">Locations</a>
                                <a href="/memberships">Membership</a>
                                <a onClick={this.handleJoinClick}><FaUserAlt style={this.faStyle} size={17} /></a>
                                
                            </div>
                        </nav>
                    </div>
                </header> */}

                {/* Member Login */}
                <div >
                    <Overlay configs={this.configs} isOpen={this.state.memberoverlay} closeOverlay={this.handleMemberClick}>
                        <div className="overlayclass">
                            <h5 className='text-center mb-2'>Member Login</h5>
                            <Form onSubmit={this.handleMemberClick}>
                                <Form.Group id='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' name='email' value={email} onChange={this.handleInputChange} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' name='password' value={password} onChange={this.handleInputChange} required></Form.Control>
                                </Form.Group>
                                <Button type='submit' className='w-100 mt-2' disabled={isButtonDisabled}>Login</Button>
                            </Form>
                        </div>
                    </Overlay>
                </div>

                {/* Admin Login */}
                <div >
                    <Overlay configs={this.configs} isOpen={this.state.adminoverlay} closeOverlay={this.handleAdminClick}>
                        <div className="overlayclass">
                            <h5 className='text-center mb-2'>Admin Login</h5>
                            <Form onSubmit={this.handleAdminClick}>
                                <Form.Group id='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' required></Form.Control>
                                </Form.Group>
                                <Form.Group id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' required></Form.Control>
                                </Form.Group>
                                <Button type='submit' className='w-100 mt-2' disabled={true}>Login</Button>
                            </Form>
                        </div>
                    </Overlay>
                </div>
            </>
        );
    }
}

export default NavbarComponent;