import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import * as API from '../../actions/API.js';


function AdminLogin(props) {
    const navigate = useNavigate();

    //const { userIsAuthenticated, userLogin } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [isLoggedIn, setIsLoggedIn] = useState(userIsAuthenticated())
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    const handleAdminLogin = (event) => {
        event.preventDefault();
        console.log('username=>' + email)
        console.log('password=>' + password)
        const role = 'STAFF';
        const data = { email, password, role };
        console.log(data);
        if (!(email && password)) {
            //setIsError(true)
            return;
        }
        API.login(data)
            .then(response => {
                const decoded = decodeToken(response.data.token);
                console.log("decoded token", decoded);
                console.log("decoded token sub=>", decoded.sub); //given user email! - change to return user from BE
                const userDetails = { token: response.data.token, role: decoded.role, user: decoded.sub.split("@")[0], email: decoded.sub };
                console.log("userDetails ", userDetails);
                window.sessionStorage.setItem("USER_DETAILS", JSON.stringify(userDetails));
                props.onHide(); // hide only when admin is loggedin successfully
                if (window.sessionStorage.getItem("USER_DETAILS")) {
                    navigate('/adminpage'); // navigate to admin page
                }
            })
            .catch(error => {
                setErrorMessage(error.response.data)
                console.log(error);
            })


    }

    return (
        <>
            <Modal {...props} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                &nbsp;
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
                                &nbsp;
                                Password</Form.Label>
                            <Form.Control
                                name="password"
                                value={password}
                                placeholder="*******" type="password" onChange={handlePasswordChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p style={{ float: 'left', color: 'red' }}>{errorMessage}</p>
                    <Button type="Submit" variant="primary"
                        onClick={handleAdminLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminLogin;