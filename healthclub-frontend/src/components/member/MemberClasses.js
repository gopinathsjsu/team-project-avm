import React, { useRef, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import * as API from '../../actions/API.js';
import MemberNavbar from './MemberNavbar.js';
import './MemberClasses.css'
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import MemberAuth from '../../context/MemberAuth.js'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MemberClasses() {
    const [schedules, setSchedules] = React.useState([]);
    const [userSchedules, setUserSchedules] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [open, setOpen] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loadUserSchedule, setLoadUserSchedule] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(window.sessionStorage.getItem("USER_DATA"));
        setUserId(userData.id)

        API.getLocationDetails(userData.homeGym).then(response => {
            setCity(response.data.city)
            setLocation(response.data.address);
        }).catch(error => {
            console.log(error);
        })
        //fetch all upcoming schedules
        API.fetchGymSchedule(userData.homeGym)
            .then(response => {
                const modifiedSchedules = response.data.map(schedule => {
                    //console.log(schedule)
                    // setCity(schedule.gym.city);
                    // setLocation(schedule.gym.address);
                    //schedule.startTime[1] -= 1;
                    //schedule.endTime[1] -= 1;
                    const startDateTime = new Date(...schedule.startTime);
                    const endDateTime = new Date(...schedule.endTime);

                    const date = startDateTime.toLocaleDateString();
                    const formattedStartTime = `${(startDateTime.getHours() % 12) || 12}:${startDateTime.getMinutes() < 10 ? '0' : ''}${startDateTime.getMinutes()} ${startDateTime.getMinutes() >= 12 ? 'PM' : 'AM'}`;
                    const formattedEndTime = `${(endDateTime.getHours() % 12) || 12}:${endDateTime.getMinutes() < 10 ? '0' : ''}${endDateTime.getMinutes()} ${endDateTime.getMinutes() >= 12 ? 'PM' : 'AM'}`;

                    const checkInDateTime = schedule.startTime;
                    const checkInDate = checkInDateTime[0] + '-' + checkInDateTime[1].toString().padStart(2, '0') + '-' + checkInDateTime[2].toString().padStart(2, '0')
                    const checkInHours = checkInDateTime[3];
                    const checkInMins = checkInDateTime[4];
                    const checkInTime = checkInDateTime[3].toString().padStart(2, '0') + ':' + checkInDateTime[4].toString().padStart(2, '0')
                    const period = (checkInHours >= 0 && checkInHours < 12) ? 'AM' : 'PM';
                    const checkIntimeOnly = checkInTime + ' ' + period;

                    const checkoutDateTime = schedule.endTime;
                    const checkoutDate = checkoutDateTime[0] + '-' + checkoutDateTime[1].toString().padStart(2, '0') + '-' + checkoutDateTime[2].toString().padStart(2, '0')
                    const checkoutHours = checkoutDateTime[3];
                    const checkoutMins = checkoutDateTime[4];
                    const checkoutTime = checkoutDateTime[3].toString().padStart(2, '0') + ':' + checkoutDateTime[4].toString().padStart(2, '0')
                    const endperiod = (checkoutHours >= 0 && checkoutHours < 12) ? 'AM' : 'PM';
                    const checkoutimeOnly = checkoutTime + ' ' + endperiod

                    return {
                        ...schedule,
                        classDate: date,
                        startTimeOnly: checkIntimeOnly,//formattedStartTime,
                        endTimeOnly: checkoutimeOnly//formattedEndTime
                    };
                });
                setSchedules(modifiedSchedules)
            })
            .catch(error => {
                console.log(error);
            })

        //fetch user's registered classes/schedules
        API.getUserUpcomingClasses(userData.id)
            .then(response => {
                //console.log(response.data)
                const modifiedSchedules = response.data.map(schedule => {
                    //schedule.gymSchedule.startTime[1] -= 1;
                    const startDateTime = new Date(...schedule.gymSchedule.startTime);
                    const endDateTime = new Date(...schedule.gymSchedule.endTime);

                    const date = startDateTime.toLocaleDateString();

                    const formattedStartTime = `${(startDateTime.getHours() % 12) || 12}:${startDateTime.getMinutes() < 10 ? '0' : ''}${startDateTime.getMinutes()} ${startDateTime.getMinutes() >= 12 ? 'PM' : 'AM'}`;
                    const formattedEndTime = `${(endDateTime.getHours() % 12) || 12}:${endDateTime.getMinutes() < 10 ? '0' : ''}${endDateTime.getMinutes()} ${endDateTime.getMinutes() >= 12 ? 'PM' : 'AM'}`;

                    const checkInDateTime = schedule.gymSchedule.startTime;
                    const checkInDate = checkInDateTime[0] + '-' + checkInDateTime[1].toString().padStart(2, '0') + '-' + checkInDateTime[2].toString().padStart(2, '0')
                    const checkInHours = checkInDateTime[3];
                    const checkInMins = checkInDateTime[4];
                    const checkInTime = checkInDateTime[3].toString().padStart(2, '0') + ':' + checkInDateTime[4].toString().padStart(2, '0')
                    const period = (checkInHours >= 0 && checkInHours < 12) ? 'AM' : 'PM';
                    const checkIntimeOnly = checkInTime + ' ' + period;

                    const checkoutDateTime = schedule.gymSchedule.endTime;
                    const checkoutDate = checkoutDateTime[0] + '-' + checkoutDateTime[1].toString().padStart(2, '0') + '-' + checkoutDateTime[2].toString().padStart(2, '0')
                    const checkoutHours = checkoutDateTime[3];
                    const checkoutMins = checkoutDateTime[4];
                    const checkoutTime = checkoutDateTime[3].toString().padStart(2, '0') + ':' + checkoutDateTime[4].toString().padStart(2, '0')
                    const endperiod = (checkoutHours >= 0 && checkoutHours < 12) ? 'AM' : 'PM';
                    const checkoutimeOnly = checkoutTime + ' ' + endperiod

                    return {
                        ...schedule,
                        classDate: date,
                        startTimeOnly: checkIntimeOnly,//formattedStartTime,
                        endTimeOnly: checkoutimeOnly//formattedEndTime
                    };
                });
                setUserSchedules(modifiedSchedules)
            })
            .catch(error => {
                console.log(error);
            })
    }, [loadUserSchedule]);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 60));

    const filteredClasses = schedules.filter((cls) => {
        const classDate = new Date(cls.startTime);
        return classDate >= startOfWeek && classDate <= endOfWeek;
    });

    const handleReserve = (scheduleId) => {
        console.log('scheduleId==>', scheduleId)
        console.log('userId==>', userId)
        const data = { userId, scheduleId };
        API.registerForClass(data)
            .then(response => {
                console.log(response)
                setErrorReg(false);
                setLoadUserSchedule(!loadUserSchedule)
            })
            .catch(error => {
                console.log(error);
                setErrorReg(true);
                setErrorMessage(error.response.data);
            })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MemberNavbar />
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
            <Typography align='center' gutterBottom variant="h5" >
                Upcoming Classes
            </Typography>
            <div style={{ marginTop: '10px' }} className="class-schedule">
                {schedules.length !== 0 ? (
                    <>
                        {schedules.map((cls) => (
                            <div key={cls.scheduleId} className="class-item">
                                <div className="class-date">{cls.classDate}</div>
                                <div className="class-details">
                                    {/* <div className="class-title">{cls.trainer}</div> */}
                                    <div className="class-title">
                                        <b>Class Time:</b>
                                        {cls.startTimeOnly} - {cls.endTimeOnly}
                                    </div>
                                    <div className="class-instructor">
                                        <b>Instructor:</b> {cls.trainer}
                                    </div>
                                    <div className="class-instructor">
                                        <b>Max Occupancy:</b> {cls.maxOccupancy}
                                        <Button
                                            style={{ float: 'right' }}
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleReserve(cls.scheduleId)}>
                                            Reserve
                                        </Button>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        ))}
                    </>
                ) :
                    <>
                        <Typography align='center' gutterBottom variant="h5" >
                            There are no Upcoming Classes.
                        </Typography>
                    </>
                }
            </div>
            <Typography align='center' gutterBottom variant="h5" >
                Your upcoming classes
            </Typography>
            <div style={{ marginTop: '10px' }} className="class-schedule">
                {userSchedules.length !== 0 ? (
                    <>
                        {userSchedules.map((cls) => (
                            <div key={cls.scheduleId} className="class-item">
                                <div className="class-date">{cls.classDate}</div>
                                <div className="class-details">
                                    {/* <div className="class-title">{cls.trainer}</div> */}
                                    <div className="class-title">
                                        <b>Class Time:</b>
                                        {cls.startTimeOnly} - {cls.endTimeOnly}
                                    </div>
                                    {/* <div className="class-instructor">
                                <b>Instructor:</b> {cls.trainer}
                            </div> */}
                                    <div className="class-instructor">
                                        {/* <b>Max Occupancy:</b> {cls.maxOccupancy} */}
                                        <EventAvailableIcon style={{ color: 'Green', float: 'right' }} />
                                    </div>
                                    <br />
                                </div>
                            </div>
                        ))}
                    </>
                ) :
                    <>
                        <Typography align='center' gutterBottom variant="h5" >
                            You aren't registered to any classes.
                        </Typography>
                    </>
                }
            </div>


            <Stack spacing={2} sx={{ width: '100%' }}>
                {errorReg === false ? (
                    <Snackbar open={open} autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            You have registered for class successfully!
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

export default MemberAuth(MemberClasses)