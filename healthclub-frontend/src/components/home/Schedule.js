import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import * as API from '../../actions/API.js';
import NavbarHome from './NavbarHome.js';
import './Schedule.css'

export default function Schedule() {
    const { gymId } = useParams();
    const [schedules, setSchedules] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [location, setLocation] = React.useState('');

    useEffect(() => {
        API.getLocationDetails(gymId)
            .then(response => {
                setCity(response.data.city);
                setLocation(response.data.address);
            })
            .catch(error => {
                console.log(error);
            })

        API.fetchGymSchedule(gymId)
            .then(response => {
                const modifiedSchedules = response.data.map(schedule => {
                    schedule.startTime[1] -= 1;
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
                        endTimeOnly: checkoutimeOnly,//formattedEndTime
                    };
                });
                setSchedules(modifiedSchedules)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 60));

    const filteredClasses = schedules.filter((cls) => {
        const classDate = new Date(cls.startTime);
        return classDate >= startOfWeek && classDate <= endOfWeek;
    });

    return (
        <>
            <NavbarHome />
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
                                    </div>
                                    <br />
                                </div>
                            </div>
                        ))}
                    </>
                ) :
                    <>
                        <Typography style={{ marginLeft: '100px' }} align='center' gutterBottom variant="h5" >
                            There are no upcoming Classes for this location.
                        </Typography>
                    </>
                }
            </div>

        </>
    );
}