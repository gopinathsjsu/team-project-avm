import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import FreeTrialMembers from './FreeTrialMembers'
import * as API from '../../actions/API.js';
import AdminNavbar from './AdminNavbar.js'
import AdminAuth from '../../context/AdminAuth.js'




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpgradeNonMembers() {

    useEffect(() => {

    }, [])

    const [open, setOpen] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <AdminNavbar />
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <div style={{ marginTop: '50px' }}>
                        <Box sx={{ flexGrow: 1, py: 8, }}>
                            <FreeTrialMembers />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default AdminAuth(UpgradeNonMembers);