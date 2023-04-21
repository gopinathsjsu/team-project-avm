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


import * as API from '../../actions/API.js';

gsap.registerPlugin(ScrollTrigger);



export default function Membership() {
    let text = useRef(null);

    useEffect(() => {
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

    const onGetScheduleClick = (gymLocation) => {
        console.log(gymLocation)
        API.fetchGymSchedule(gymLocation)
            .then(response => {              
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };



    return (
        <>
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

            <div style={{marginLeft:'20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="search"
                            type="search"
                            label="Location (City)"
                            value={searchTerm}
                            placeholder="Ex: San Jose"
                            onChange={handleSearchChange}
                            sx={{ width: 300 }}
                        />
                        <IconButton onClick={handleGymClick} aria-label="search">
                            <SearchIcon color='primary' sx={{ fontSize: 40 }} />
                        </IconButton>

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
                                            <Button  onClick={() =>onGetScheduleClick(location.id)} size="small" color="primary">
                                               View Schedule
                                            </Button>
                                        </CardActions>
                                    </Card>
                                // </Grid>
                            ))}
                        {/* </Grid> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Maps />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
