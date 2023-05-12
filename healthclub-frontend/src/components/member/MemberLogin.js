import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import * as API from '../../actions/API.js';

function MemberLogin(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [freeTrail, setFreeTrail] = useState(false);
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleMemberLogin = (event) => {
        event.preventDefault();
        let role = 'MEMBER';
        if (freeTrail) {
            role = 'FREE_TRIAL_MEMBER'
        }
        const data = { email, password, role };
        if (!(email && password)) {
            setIsError(true)
            console.log(isError)
            return;
        }
        API.login(data)
            .then(response => {                
                const decoded = decodeToken(response.data.token);
                const userDetails = { token: response.data.token, role: decoded.role, user: decoded.sub.split("@")[0], email: decoded.sub };
                window.sessionStorage.setItem("USER_DETAILS", JSON.stringify(userDetails));
                props.onHide(); // hide only when admin is loggedin successfully
                if (window.sessionStorage.getItem("USER_DETAILS")) {
                    navigate('/memberpage/activities'); // navigate to member page
                }
            })
            .catch(error => {
                console.log(error);
                setIsError(true);                
                setErrorMessage(error.response.data);
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
                        <FormControlLabel control={<Switch checked={freeTrail} onChange={() => setFreeTrail(!freeTrail)} />}
                            label="Are you a Free Trail Member?" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p style={{float:'left', color:'red'}}>{errorMessage}</p>
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