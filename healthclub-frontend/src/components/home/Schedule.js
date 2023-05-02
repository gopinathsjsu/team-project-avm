import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import * as API from '../../actions/API.js';
import NavbarHome from './NavbarHome.js';
import './Schedule.css'

export default function Schedule() {
    const { gymId } = useParams();
    const [schedules, setSchedules] = React.useState([]);
    const [city, setCity] = React.useState('');
    const [location, setLocation] = React.useState('');

    useEffect(() => {
        console.log('Schedule is called' + gymId);
        API.fetchGymSchedule(gymId)
            .then(response => {                
                const modifiedSchedules = response.data.map(schedule => {
                    console.log(schedule)
                    setCity(schedule.gym.city);
                    setLocation(schedule.gym.address);
                    const dateObject = new Date(schedule.startTime);
                    const dateOnlyString = dateObject.toDateString();

                    const startTimeOnly = schedule.startTime.split('T')[1].slice(0, 5);;
                    const endTimeOnly = schedule.endTime.split('T')[1].slice(0, 5);;
                    return {
                        ...schedule,
                        classDate: dateOnlyString,
                        startTimeOnly: startTimeOnly,
                        endTimeOnly: endTimeOnly
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
            <NavbarHome/>
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
                {filteredClasses.map((cls) => (
                    <div key={cls.scheduleId} className="class-item">
                        <div className="class-date">{cls.classDate}</div>
                        <div className="class-details">
                            <div className="class-title">{cls.trainer}</div>
                            <div className="class-time">
                                <b>Class Time:</b>
                                {cls.startTimeOnly} - {cls.endTimeOnly}
                            </div>
                            <div className="class-instructor">
                                <b>Instructor:</b> {cls.trainer}
                            </div>
                            <div className="class-instructor">
                                <b>Max Occupancy:</b> {cls.maxOccupancy}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}