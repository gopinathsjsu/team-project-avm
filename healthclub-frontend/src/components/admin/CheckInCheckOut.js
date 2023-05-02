import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import LocationOn from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import NumbersIcon from '@mui/icons-material/Numbers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Members from './Members'
import * as API from '../../actions/API.js';
import AdminNavbar from './AdminNavbar.js'




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CheckInCheckOut() {

    useEffect(() => {

    }, [])

    const [membershipId, setMembershipId] = useState('');
    const options = {
        timeZone: 'America/Los_Angeles'

    };
    const [entry, setEntry] = useState(dayjs(new Date().toLocaleString('en-US', options).slice(0, 16)));
    const [exit, setExit] = useState(dayjs(new Date().toISOString().slice(0, 16)));
    const [location, setLocation] = useState(1);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        gymId: '1',
        email: ''
    });
    // const locations = [
    //     {
    //         value: 'San Jose',
    //         label: 'San Jose',
    //     },
    //     {
    //         value: 'San Fransisco',
    //         label: 'San Fransisco',
    //     },
    //     {
    //         value: 'Milipitas',
    //         label: 'Milipitas',
    //     },
    // ];


    const handleMembershipIdChange = (event) => {
        setMembershipId(event.target.value);
    };

    const handleEntryChange = (event) => {
        setEntry(event.target.value);
    };

    // const handleExitChange = (event) => {
    //     setExit(event.target.value);
    // };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value)
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        //make an API call!               
        API.checkInMembers(formData.gymId, formData.email)
            .then(response => {
                console.log(response);
                console.log(response.data);                
            })
            .catch(error => {
                console.log('error in checkin')
                console.log(error);                
            })
        setOpen(true) // toast message if success!
        //need to send role as member
        // You can use the memberName or memberEmail to send a request to your server to enroll a new member
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
         <AdminNavbar />
            <Grid container spacing={2}>
                <Grid item xs={3}>
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
                                    Checkin Members
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="location"
                                                // select
                                                label="Location"
                                                variant='outlined'
                                                disabled
                                                fullWidth
                                                name='gymId'
                                                value={formData.gymId}
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
                                                id="membershipid"
                                                label="Member Email"
                                                variant="outlined"
                                                fullWidth
                                                name='email'
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DateTimePicker']}>
                                                    <DateTimePicker
                                                        disabled="true"
                                                        label="Entry Time"
                                                        value={entry}
                                                        // defaultValue={dayjs('2022-04-17T15:30')}
                                                        onChange={handleEntryChange}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid> */}
                                        {/* <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>                                        
                                            <DateTimePicker
                                                label="Exit Time"
                                                value={exit}
                                                
                                                onChange={handleExitChange}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid> */}
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
                    <div style={{ marginTop: '50px' }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                py: 8,
                                //border: 1
                            }}
                        >
                            <Members gymId={formData.gymId}/>
                        </Box>
                    </div>
                </Grid>
            </Grid>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Member is registered successfully!
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}