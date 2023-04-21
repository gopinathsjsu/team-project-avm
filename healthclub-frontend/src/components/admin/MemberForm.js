import React, { useState } from 'react';
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

import './MemberForm.css'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MemberForm() {
    const [memberFirstName, setMemberFirstName] = useState('');
    const [memberLastName, setMemberLastName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [open, setOpen] = useState(false);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        //make an API call!
        setOpen(true) // toast message if success!
        //need to send role as member
        // You can use the memberName and memberEmail to send a request to your server to enroll a new member
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
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