import React, { useState, useEffect } from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Card, CardHeader } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import AnimatedNumber from 'react-animated-numbers';
import { OverviewTotalCustomers } from './OverviewTotalCustomers.js';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AdminAuth from '../../context/AdminAuth.js'
import AdminNavbar from './AdminNavbar.js'
import * as API from '../../actions/API.js';
import './AdminDashboard.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);


const options = {
    scales: {
        y: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const horizontalOptions = {
    indexAxis: 'y'
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        // },
    },
};

//Get all the dashboard values from backend
function AdminDashboard() {
    const [userName, setUserName] = useState('')
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [location, setLocation] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [startDateValue, setStartDateValue] = useState(dayjs('2023-01-01'));
    const [endDateValue, setEndDateValue] = useState(dayjs('2023-10-31'));
    const [noOfClasses, setNoOfClasses] = useState(0);
    const [noOfEnrollments, setNoOfEnrollments] = useState(0);
    const [noOfEnrollmentsPossible, setNoOfEnrollmentsPossible] = useState('');
    const [noOfHoursSpent, setNoOfHoursSpent] = useState(0);

    const [differenceInDays, setDifferenceInDays] = useState(0);
    const [differenceInWeeks, setDifferenceInWeeks] = useState(0);
    const [differenceInMonths, setDifferenceInMonths] = useState(0);
    const [freeTrailMembersCount, setFreeTrailMembersCount] = useState(0);

    const [open, setOpen] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const [visitorDataByDate, setVisitorDataByDate] = useState({
        labels: [],
        datasets: [
            {
                label: 'Members visiting Gym by Date',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                // borderWidth: 2,
                // barPercentage: 0.5,
                // barThickness: 6,
                // maxBarThickness: 8,
                // minBarLength: 2,
            },
        ]
    });

    const [visitorDataByDateGroup, setVisitorDataByDateGroup] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of visitors on Weekday/Weekend',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    });

    const [visitorDataByDay, setVisitorDataByDay] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of visitors by Day',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                hoverOffset: 5
            },
        ],
    });

    const [visitorDataByHour, setVisitorDataByHour] = useState({
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
        ],
        datasets: [
            {
                label: 'Number of visitors by Hour',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
        ],
    });

    const [hoursSpentByDate, setHoursSpentByDateByDate] = useState({
        labels: [],
        datasets: [
            {
                label: 'Hours Spent by Visitors per Day',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                // borderWidth: 2,
                // barPercentage: 0.5,
                // barThickness: 6,
                // maxBarThickness: 8,
                // minBarLength: 2,
            },
        ]
    });

    useEffect(() => {
        const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
        const capitalizedUsername = memberData.user.charAt(0).toUpperCase() + memberData.user.slice(1);

        let adminHomeGym;
        API.fetchUserDetails(memberData.email).then(response => {
            window.sessionStorage.setItem("USER_DATA", JSON.stringify(response.data));
            adminHomeGym = response.data.homeGym;
            console.log('adminHomeGym ID==>', adminHomeGym)
            setUserName(response.data.firstName + ' ' + response.data.lastName)
            API.getLocationDetails(adminHomeGym).then(response => {
                setCity(response.data.city)
                API.fetchGyms(response.data.city)
                    .then(response => {
                        setLocationList(response.data);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                setLocation(adminHomeGym);
                //getAnalytics()               

            }).catch(error => {
                console.log(error);
            })
            //Set Gym location and city based on HomeGym, so need all locations with Ids
            // setUserId(response.data.id)
        }).catch(error => {
            console.log(error);
        })

        API.getGymCities()
            .then(response => {
                console.log(response.data)
                setCityList(response.data);
            })
            .catch(error => {
                console.log(error);
            })



        // calling analytics API on page load

    }, [])

    const handleCityChange = (event) => {
        setCity(event.target.value);
        API.fetchGyms(event.target.value)
            .then(response => {
                setLocationList(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city && location && startDateValue && endDateValue && startDateValue <= endDateValue) {
            getAnalytics()
        }
        else {
            //alert('Please fill in all required fields and select a valid date range.');
            setOpen(true)
            setErrorMessage('Please ensure that the Start Date entered is earlier than the End Date.')
            console.log('invalid details')
        }

    };

    const getAnalytics = () => {
        // make API calls for all the Analytics to display below
        const startDate = startDateValue.format('YYYY-MM-DD')
        const endDate = endDateValue.format('YYYY-MM-DD')
        API.getGymAnalytics(location, startDate, endDate)
            .then(response => {
                const analytics = response.data;
                setNoOfClasses(analytics.numberOfClasses)
                setNoOfEnrollments(analytics.enrollments)
                setNoOfEnrollmentsPossible('Out of ' + analytics.enrollmentsPossible + ' possible enrollments!')
                let hoursSpent = 0;
                if (analytics.totalHoursSpent != 0) {
                    hoursSpent = analytics.totalHoursSpent
                }
                setNoOfHoursSpent(hoursSpent)
            })
            .catch(error => {
                console.log(error);
            })

        API.getVisitorsByHour(location, startDate, endDate)
            .then(response => {
                const resp = response.data
                const dateVisitorsData = {}; // variable to store Date Vs Vistors Data
                const daysVisitorsData = {}; // variable to store Day Vs Vistors Data (Mon, Tue, Wed..., Sun)
                const dayGroupVisitorsData = {}; // variable to store Weekend/Weekday Vs Vistors Data
                const timeVisitorsData = {}; // variable to store Weekend/Weekday Vs Vistors Data
                const sortedResp = resp.sort((a, b) => {
                    const dateA = a[0];
                    const dateB = b[0];
                    if (dateA < dateB) {
                        return -1;
                    }
                    if (dateA > dateB) {
                        return 1;
                    }
                    return 0;
                });
                sortedResp.forEach(item => {
                    const date = item[0].split(" ")[0]; // extracting the date portion from the timestamp
                    const dayGroup = item[2]; // Weekend or Weekday
                    const dayType = item[1]; // Mon, Tue, Wed, .., Sun
                    const numValue = item[3]; // # of visitors
                    const hour = item[0].substring(11, 13);

                    if (dateVisitorsData[date]) {
                        dateVisitorsData[date] += numValue;
                    } else {
                        dateVisitorsData[date] = numValue;
                    }

                    if (dayGroupVisitorsData[dayGroup]) {
                        dayGroupVisitorsData[dayGroup] += numValue;
                    } else {
                        dayGroupVisitorsData[dayGroup] = numValue;
                    }

                    if (daysVisitorsData[dayType]) {
                        daysVisitorsData[dayType] += numValue;
                    } else {
                        daysVisitorsData[dayType] = numValue;
                    }

                    if (timeVisitorsData[hour]) {
                        timeVisitorsData[hour] += numValue;
                    } else {
                        timeVisitorsData[hour] = numValue;
                    }
                });

                const timeArray = [];
                timeArray.push(timeVisitorsData['00'] ?? 0)
                timeArray.push(timeVisitorsData['01'] ?? 0)
                timeArray.push(timeVisitorsData['02'] ?? 0)
                timeArray.push(timeVisitorsData['03'] ?? 0)
                timeArray.push(timeVisitorsData['04'] ?? 0)
                timeArray.push(timeVisitorsData['05'] ?? 0)
                timeArray.push(timeVisitorsData['06'] ?? 0)
                timeArray.push(timeVisitorsData['07'] ?? 0)
                timeArray.push(timeVisitorsData['08'] ?? 0)
                timeArray.push(timeVisitorsData['09'] ?? 0)
                timeArray.push(timeVisitorsData['10'] ?? 0)
                timeArray.push(timeVisitorsData['11'] ?? 0)
                timeArray.push(timeVisitorsData['12'] ?? 0)
                timeArray.push(timeVisitorsData['13'] ?? 0)
                timeArray.push(timeVisitorsData['14'] ?? 0)
                timeArray.push(timeVisitorsData['15'] ?? 0)
                timeArray.push(timeVisitorsData['16'] ?? 0)
                timeArray.push(timeVisitorsData['17'] ?? 0)
                timeArray.push(timeVisitorsData['18'] ?? 0)
                timeArray.push(timeVisitorsData['19'] ?? 0)
                timeArray.push(timeVisitorsData['20'] ?? 0)
                timeArray.push(timeVisitorsData['21'] ?? 0)
                timeArray.push(timeVisitorsData['22'] ?? 0)
                timeArray.push(timeVisitorsData['23'] ?? 0)


                setVisitorDataByDate((prevState) => ({
                    ...prevState,
                    labels: Object.keys(dateVisitorsData),
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: Object.values(dateVisitorsData),
                        },
                    ],
                }));

                setVisitorDataByDateGroup((prevState) => ({
                    ...prevState,
                    labels: Object.keys(dayGroupVisitorsData),
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: Object.values(dayGroupVisitorsData),
                        },
                    ],
                }));

                setVisitorDataByDay((prevState) => ({
                    ...prevState,
                    labels: Object.keys(daysVisitorsData),
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: Object.values(daysVisitorsData),
                        },
                    ],
                }));

                setVisitorDataByHour((prevState) => ({
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: timeArray//Object.values(daysVisitorsData),
                        },
                    ],
                }));
            })
            .catch(error => {
                console.log(error);
            })

        API.getTimeSpentByDate(location, startDate, endDate)
            .then(response => {
                const resp = response.data;
                const timeSpentBasedOnDate = {};
                const sortedResp = resp.sort((a, b) => {
                    const dateA = a[0];
                    const dateB = b[0];
                    if (dateA < dateB) {
                        return -1;
                    }
                    if (dateA > dateB) {
                        return 1;
                    }
                    return 0;
                });
                sortedResp.forEach(item => {
                    const date = item[0]
                    const hours = item[1];
                    if (timeSpentBasedOnDate[date]) {
                        timeSpentBasedOnDate[date] += hours;
                    } else {
                        timeSpentBasedOnDate[date] = hours;
                    }
                });

                setHoursSpentByDateByDate((prevState) => ({
                    ...prevState,
                    labels: Object.keys(timeSpentBasedOnDate),
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: Object.values(timeSpentBasedOnDate),
                        },
                    ],
                }));
            })
            .catch(error => {
                console.log(error);
            })

        API.getFreeTrailMembers()
            .then(response => {
                setFreeTrailMembersCount(response.data.length)
            })
            .catch(error => {
                console.log(error);
            })

        const start = new Date(startDateValue);
        const end = new Date(endDateValue);
        const differenceInMilliseconds = end - start;
        const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        const differenceInWeeks = Math.round(differenceInDays / 7);
        const differenceInMonths = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));

        setDifferenceInDays(differenceInDays);
        setDifferenceInWeeks(differenceInWeeks);
        setDifferenceInMonths(differenceInMonths);
    }



    return (
        <>
            <AdminNavbar />
            <div className='divClass'>
                <div style={{ marginTop: '80px', marginLeft: '20px' }}>
                    <Typography variant="h5" sx={{ mb: 5 }}>
                        Hi {userName}, Welcome back
                    </Typography>
                </div>


                <Typography align='center' gutterBottom variant="h5" >
                    FITFINITY OVERVIEW
                </Typography>
                <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                    <Grid container spacing={3}>
                        {/* First grid */}
                        <Grid item xs={3}>
                            <Grid container spacing={3}>
                                <FormControl required style={{ width: '200px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="Start Date"
                                                value={startDateValue}
                                                onChange={(newValue) => setStartDateValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={3}>
                                <FormControl required style={{ width: '200px' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="End date"
                                                value={endDateValue}
                                                onChange={(newValue) => setEndDateValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={3}>
                                <FormControl required style={{ width: '200px' }}>
                                    <InputLabel id="demo-simple-select-label">SelectCity</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="Select City"
                                        onChange={handleCityChange}
                                    >
                                        {cityList.map((filter) => (
                                            <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={3}>
                                <FormControl required style={{ width: '200px' }}>
                                    <InputLabel id="demo-simple-select-label">Select Gym Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={location}
                                        label="Select Gym Location"
                                        onChange={handleLocationChange}
                                    >
                                        {locationList.map((filter) => (
                                            <MenuItem key={filter.id} value={filter.id}>{filter.address}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={3}>
                                <Button variant="contained" color="primary" type="submit"
                                    onClick={handleSubmit}>
                                    Display Data
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            {/* Add something here */}
                            <Typography variant="h5" sx={{ mb: 3, mt: 10 }}>
                                Gym Analytics for:
                            </Typography>
                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <p style={{ marginRight: '30px' }}>Days
                                    <AnimatedNumber
                                        includeComma
                                        animateToNumber={differenceInDays}
                                        fontStyle={{ fontSize: 32 }}
                                        locale="en-US"
                                        configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                        ]}
                                    ></AnimatedNumber>
                                </p>
                                <p style={{ marginRight: '30px' }}>Weeks
                                    <AnimatedNumber
                                        includeComma
                                        animateToNumber={differenceInWeeks}
                                        fontStyle={{ fontSize: 32 }}
                                        locale="en-US"
                                        configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                        ]}
                                    ></AnimatedNumber>
                                </p>
                                <p style={{ marginRight: '30px' }}>Months
                                    <AnimatedNumber
                                        includeComma
                                        animateToNumber={differenceInMonths}
                                        fontStyle={{ fontSize: 32 }}
                                        locale="en-US"
                                        configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                        ]}
                                    ></AnimatedNumber>
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={false}
                                        sx={{ height: '100%' }}
                                        value={noOfClasses}
                                        overviewType="Total Classes"
                                        iconElement={<SportsGymnasticsIcon />}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value={noOfEnrollments}
                                        overviewType="Total Class Enrollments"
                                        footerText={noOfEnrollmentsPossible}
                                        iconElement={<UsersIcon />}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value={noOfHoursSpent}
                                        overviewType="Total Hours Spent"
                                        iconElement={<HourglassTopIcon />}

                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value={freeTrailMembersCount}
                                        overviewType="Free Trail Members"
                                        iconElement={<UsersIcon />}

                                    />
                                </Paper>
                            </Grid>


                            <Grid item xs={12} md={6} lg={8}>
                                <Card>
                                    <CardHeader title="Number of visitors" subheader="Per Day" />
                                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                        <Bar options={options} data={visitorDataByDate} />
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader title="Number of visitors" subheader="Day of the Week" />
                                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                        <Pie data={visitorDataByDay} />
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6} lg={8}>
                                <Card>
                                    <CardHeader title="Number of visitors" subheader="Hourly" />
                                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                        <Line options={lineOptions} data={visitorDataByHour} />
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader title="Number of visitors" subheader="Weekend/WeekDay" />
                                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                        <Bar options={horizontalOptions} data={visitorDataByDateGroup} />
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6} lg={8}>
                                <Card>
                                    <CardHeader title="Hours Spent by Visitors per Day" subheader="Per Day" />
                                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                                        <Bar options={options} data={hoursSpentByDate} />
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}


export default AdminAuth(AdminDashboard);