import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Card, Box, Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOn from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Members from './Members'
import * as API from '../../actions/API.js';
import AdminNavbar from './AdminNavbar.js'
import AdminAuth from '../../context/AdminAuth.js'




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CheckInCheckOut() {

    useEffect(() => {
        const adminData = JSON.parse(window.sessionStorage.getItem("USER_DATA"));
        const gymId = '' + adminData.homeGym;
        const email = ''
        setFormData({ gymId, email });
        API.getLocationDetails(adminData.homeGym).then(response => {            
            setCity(response.data.city)           
            setLocation(response.data.address);                          
            setLocationId(response.data.id)
        }).catch(error => {
            console.log(error);
        })

    }, [])

    const formRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [membersUpdated, setMembersUpdated] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [city, setCity] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [locationId, setLocationId] = React.useState('');

    const [formData, setFormData] = useState({
        gymId: '',
        email: ''
    });

    // const handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     console.log(value)
    //     setFormData({ ...formData, [name]: value });
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        //const gymId = formRef.current.gymId.value;
        const gymId = locationId
        const email = formRef.current.email.value;
        setFormData({ email });
        const data = { gymId, email };
        //setMembersUpdated(!membersUpdated);
        //make an API call!               
        API.checkInMembers(data)
            .then(response => {
                console.log(response.data);
                setErrorReg(false);
                setMembersUpdated(!membersUpdated);
            })
            .catch(error => {
                console.log('error in checkin')
                console.log(error);
                setErrorReg(true);
                setErrorMessage(error.response.data);
            })
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <AdminNavbar />
            <div style={{ marginLeft: '100px', marginTop: '100px', width: 'fit-content' }} role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit">
                        Fitfinity Healthclub
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                    >
                        {city}
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        aria-current="page"
                    >
                        {location}
                    </Link>
                </Breadcrumbs>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div style={{marginTop: '10px', marginLeft: '20px'}}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                py: 8,
                            }}
                        >
                            <Container maxWidth="xs">
                                <Typography align='center' gutterBottom variant="overline" >
                                    Checkin Members
                                </Typography>
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="memberLocation"
                                                // select
                                                label="Location"
                                                variant='outlined'
                                                defaultValue={locationId}
                                                disabled
                                                fullWidth
                                                name='gymId'
                                                hidden
                                                // value={formData.gymId}
                                                // onChange={handleInputChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOn />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >
                                                {/* {locations.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))} */}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="memberEmail"
                                                label="Member Email"
                                                variant="outlined"
                                                fullWidth
                                                name='email'
                                                type="email"
                                                //value={formData.email}
                                                //onChange={handleInputChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Check-in
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div style={{ marginTop: '10px' }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                py: 8,
                            }}
                        >
                            {locationId ? (
                                <Members gymId={locationId} membersUpdated={membersUpdated} setMembersUpdated={setMembersUpdated} />
                            ) : (
                                <div>Loading.....</div>
                            )}
                        </Box>
                    </div>
                </Grid>
            </Grid>




            <Stack spacing={2} sx={{ width: '100%' }}>
                {errorReg === false ? (
                    <Snackbar open={open} autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Member is checked-in successfully.
                        </Alert>
                    </Snackbar>
                ) :
                    <Snackbar open={open} autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                }
            </Stack>
        </>
    );
}

export default AdminAuth(CheckInCheckOut);