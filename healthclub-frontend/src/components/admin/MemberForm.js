import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';

import './MemberForm.css'
import AdminNavbar from './AdminNavbar.js'
import * as API from '../../actions/API.js';
import AdminAuth from '../../context/AdminAuth.js'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MemberForm() {
    const [memberFirstName, setMemberFirstName] = useState('');
    const [memberLastName, setMemberLastName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [freeTrail, setFreeTrail] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [location, setLocation] = useState('');
    const [locationList, setLocationList] = useState([]);

    const handleMemberFirstNameChange = (event) => {
        setMemberFirstName(event.target.value);
    };

    const handleMemberLastNameChange = (event) => {
        setMemberLastName(event.target.value);
    };

    const handleMemberEmailChange = (event) => {
        setMemberEmail(event.target.value);
    };

    const handleMemberPasswordChange = (event) => {
        setMemberPassword(event.target.value);
    };

    useEffect(() => {
        API.getGymCities()
            .then(response => {
                console.log(response.data)
                setCityList(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const handleCityChange = (event) => {
        setCity(event.target.value);
        API.fetchGyms(event.target.value)
            .then(response => {
                setLocationList(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        console.log(city)
    };

    const handleLocationChange = (event) => {
        console.log(event.target.value)
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(freeTrail)
        //     "firstName": "cvbn",
        // "lastName": "mdfh",
        // "email": "abc@gmail.com",
        // "password": "123",
        // "role": "MEMBER",
        // "homeGym":"1"
        let memberRole = 'MEMBER';
        if (freeTrail) {
            memberRole = 'FREE_TRIAL_MEMBER'
        }
        const data = {
            "firstName": memberFirstName,
            "lastName": memberLastName,
            "email": memberEmail,
            "password": memberPassword,
            "role": memberRole,
            "homeGym": location
        };
        //make an API call!
        API.register(data)
            .then(response => {
                console.log(response);
                console.log(response.data);
                setErrorReg(false);
                setOpen(true)
            })
            .catch(error => {
                console.log(error);
                setErrorReg(true);
                setOpen(true)
            })
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <AdminNavbar />
            <div className='memberForm'>
                <Box
                    sx={{
                        flexGrow: 1,
                        py: 8,
                        //border: 1
                    }}
                >
                    <Container maxWidth="xs">
                        <Typography align='center' gutterBottom variant="overline" >
                            Member Registration
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="member-first-name"
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        value={memberFirstName}
                                        onChange={handleMemberFirstNameChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="member-last-name"
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        value={memberLastName}
                                        onChange={handleMemberLastNameChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="email"
                                        id="member-email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={memberEmail}
                                        onChange={handleMemberEmailChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="member-password"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        value={memberPassword}
                                        type="password"
                                        onChange={handleMemberPasswordChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="city"
                                        select
                                        label="Select City"
                                        variant='outlined'
                                        fullWidth
                                        name='city'
                                        value={city}
                                        onChange={handleCityChange}
                                    >
                                        {cityList.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="location"
                                        select
                                        label="Select Gym Location"
                                        variant='outlined'
                                        fullWidth
                                        name='location'
                                        value={location}
                                        onChange={handleLocationChange}
                                    >
                                        {locationList.map((filter) => (
                                            <MenuItem key={filter.id} value={filter.id}>{filter.address}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Switch checked={freeTrail} onChange={() => setFreeTrail(!freeTrail)} />}
                                        label="Enroll Member for Free Trail" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Enroll Member
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Box>
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                {errorReg === false ? (
                    <Snackbar open={open} autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Member was registered successfully!
                        </Alert>

                    </Snackbar>
                ) :
                    <Snackbar open={open} autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Sorry, there was an issue while registering the user. Try again later!
                        </Alert>
                    </Snackbar>
                }
            </Stack>
        </>
    );
}

export default AdminAuth(MemberForm);