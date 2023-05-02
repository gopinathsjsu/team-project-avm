import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

import * as API from '../../actions/API.js';
import AuthContext from '../../context/AuthContext';


function MemberLogin(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [isLoggedIn, setIsLoggedIn] = useState(userIsAuthenticated())
    const [isError, setIsError] = useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    const handleMemberLogin = (event) => {
        event.preventDefault();
        const role = 'MEMBER';
        console.log('username=>' + email)
        console.log('password=>' + password)        
        const data = { email, password, role };
        console.log(data);
        if (!(email && password)) {
            setIsError(true)
            return;
        }
        API.login(data)
            .then(response => {
                console.log(response);
                console.log(response.data);
                const decoded = decodeToken(response.data.token);
                console.log("decoded token", decoded);
                console.log("decoded token sub=>", decoded.sub); //given user email! - change to return user from BE
                const userDetails = { token: response.data.token, role: decoded.role, user: decoded.sub.split("@")[0]};
                console.log("userDetails ", userDetails);
                window.sessionStorage.setItem("USER_DETAILS", JSON.stringify(userDetails));
                props.onHide(); // hide only when admin is loggedin successfully
                if (window.sessionStorage.getItem("USER_DETAILS")) {
                    navigate('/memberpage/activities'); // navigate to member page
                }




            })
            .catch(error => {
                console.log(error);
                setIsError(true);
            })


    }

    return (
        <>
            <Modal {...props} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Member Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faLock} className="mr-2" />
                                Password</Form.Label>
                            <Form.Control
                                name="password"
                                value={password}
                                placeholder="*******" type="password" onChange={handlePasswordChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="Submit" variant="primary"
                        onClick={handleMemberLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MemberLogin;