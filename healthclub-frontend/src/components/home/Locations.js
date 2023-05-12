import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Membership.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Maps from './Maps';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Avatar, Card, CardContent, CardHeader, IconButton, CardActions, } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome.js';
import MenuItem from '@mui/material/MenuItem';

import * as API from '../../actions/API.js';

gsap.registerPlugin(ScrollTrigger);



export default function Membership() {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [location, setLocation] = useState('');
    const [locationList, setLocationList] = useState([]);
    let text = useRef(null);

    useEffect(() => {
        API.getGymCities()
            .then(response => {
                console.log(response.data)
                setCityList(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        gsap.to(text, {
            duration: 1,
            y: '10',
            opacity: 1,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete ',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        console.log(searchTerm);
    }

    const [gymData, setGymData] = useState([]);

    const handleGymClick = () => {
        let city = searchTerm;//'Milpitas';
        API.fetchGyms(city)
            .then(response => {
                //console.log(response.data);
                setGymData(response.data);
                console.log(gymData);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onGetScheduleClick = (gymId) => {
        navigate(`/schedule/${gymId}`);
        console.log(gymId)
        // API.fetchGymSchedule(gymId)
        //     .then(response => {              
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    };

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
        navigate(`/schedule/${event.target.value}`);
    };



    return (
        <>
            <NavbarHome />
            <div className="membership">
                <div className="membership--container">
                    <h1>Locations</h1>
                    <p className="membership--desc">
                        Find a Fitfinity Gym Near You.
                    </p>
                    <div
                        className="membership--wrap"
                        ref={(el) => {
                            text = el;
                        }}
                    >
                    </div>
                </div>
            </div>

            <div style={{ marginLeft: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                            <Grid item xs={6}>
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
                            {/* <Grid container spacing={2}> */}
                            {gymData.map((location) => (
                                // <Grid item xs={3}>
                                <Card key={location.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="location">
                                                <LocationOnSharpIcon color='primary' />
                                            </Avatar>
                                        }
                                        title={location.name}
                                        subheader={location.address}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {location.city} {location.state} {location.country}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => onGetScheduleClick(location.id)} size="small" color="primary">
                                            View Schedule
                                        </Button>
                                    </CardActions>
                                </Card>
                                // </Grid>
                            ))}
                            {/* </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Maps />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
