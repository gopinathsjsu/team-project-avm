import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import WatchIcon from '@mui/icons-material/Watch';
import BlockIcon from '@mui/icons-material/Block';
import MemberNavbar from './MemberNavbar.js'
import * as API from '../../actions/API.js';
import MemberAuth from '../../context/MemberAuth.js'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MemberWorkoutTracker() {
    const [activity, setActivity] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [userId, setUserId] = useState();
    const [open, setOpen] = useState(false);
    const [timeInMinutes, setTimeInMinutes] = React.useState(0);
    const [userRole, setUserRole] = React.useState('');

    useEffect(() => {       
        const memberData = JSON.parse(window.sessionStorage.getItem("USER_DATA"));
        setUserRole(memberData.role)
        setUserId(memberData.id)
        API.getGymActivities()
            .then(response => {                
                setWorkouts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    const handleWorkoutChange = (event) => {
        setActivity(event.target.value);
    };


    const handleSliderChange = (event, newValue) => {
        setTimeInMinutes(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { userId, activity, timeInMinutes }
        API.logMemberActivity(data)
            .then(response => {                
                setOpen(true)
                setActivity('')
                setTimeInMinutes(0)
            })
            .catch(error => {
                console.log(error);
            })

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MemberNavbar />
            {/* <Grid container spacing={2}>
                <Grid item xs={3}> */}
            <div className='memberForm'>
                <Box
                    sx={{
                        flexGrow: 1,
                        py: 8,
                        // border: 2,
                        // borderRadius: 10
                    }}
                >
                    <Container maxWidth="xs">
                        {userRole === 'MEMBER' ? (
                            <>
                                <Typography align='center' gutterBottom variant="h5" >
                                    Track your Activities
                                </Typography> <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="Workout"
                                            select
                                            label="Enter Workout"
                                            variant='outlined'
                                            fullWidth
                                            value={activity}
                                            onChange={handleWorkoutChange}
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <LocationOn />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        >
                                            {workouts.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom >
                                            Time spent on Workout in (Minutes)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <WatchIcon />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Slider
                                            value={timeInMinutes}
                                            valueLabelDisplay="on"
                                            onChange={handleSliderChange}
                                            aria-labelledby="input-slider"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" type="submit"
                                            onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>

                            </>
                        ) :
                            <>
                                <p>You do not have access to this page. <BlockIcon color='error' /></p>
                            </>
                        }
                    </Container>
                </Box>
            </div>
            {/* </Grid>
                <Grid item xs={9}>
                    <div style={{ marginTop: '50px' }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                py: 8,
                                //border: 1
                            }}
                        >
                        </Box>
                    </div>
                </Grid>
            </Grid> */}

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Hours are tracked for {activity} successfully!
                    </Alert>
                </Snackbar>
            </Stack>

        </>
    );
}

export default MemberAuth(MemberWorkoutTracker)


