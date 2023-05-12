import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import MemberNavbar from './MemberNavbar.js'
import * as API from '../../actions/API.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import MemberAuth from '../../context/MemberAuth.js'
import { Pie } from 'react-chartjs-2';
import { Card, CardHeader } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

ChartJS.register(ArcElement, Tooltip, Legend);

const filters = [
    { value: 'last-week', label: "Past Week" },
    { value: 'last-month', label: "Past Month" },
    { value: 'last-90-days', label: "Last 90 days" }
];

function MemberHome() {


    const [filterValue, setFilterValue] = React.useState('last-week');
    const [userId, setUserId] = React.useState();
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = React.useState('');
    const [noOfClassEnrollments, setNoOfClassEnrollments] = React.useState(0);

    const [data, setData] = useState({
        labels: ['CARDIO', 'TRAINING', 'WEIGHT_TRAINING', 'TREADMILL', 'ROWING', 'HIKING', 'SWIMMING'],
        datasets: [
            {
                label: '# of Mins Spent',
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

    const [classesEnrolled, setClassesEnrolled] = useState({
        labels: ['Classes Enrolled'],
        datasets: [
            {
                label: 'Classes Enrolled',
                data: [],
                backgroundColor: [
                    'rgba(255, 159, 64)',
                ],
                hoverOffset: 5
            },
        ],
    });

    useEffect(() => {
        const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
        const capitalizedUsername = memberData.user.charAt(0).toUpperCase() + memberData.user.slice(1);
        setUserRole(memberData.role)
        let memberId;
        API.fetchMemberDetails(memberData.email).then(response => {
            window.sessionStorage.setItem("USER_DATA", JSON.stringify(response.data));
            memberId = response.data.id;
            setUserId(response.data.id)
            setUserName(response.data.firstName+' '+response.data.lastName)            
            console.log('userid**==>', response.data.id)
            //make API call with default value for Past week!            
            API.getActivitiesBasedOnTimePeriod(memberId, filterValue).then(response => {
                const dataMap = response.data.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

                const valuesArray = [];
                valuesArray.push(dataMap['CARDIO']);
                valuesArray.push(dataMap['TRAINING'])
                valuesArray.push(dataMap['WEIGHT_TRAINING']);
                valuesArray.push(dataMap['TREADMILL'])
                valuesArray.push(dataMap['ROWING'])
                valuesArray.push(dataMap['HIKING'])
                valuesArray.push(dataMap['SWIMMING'])                

                setData((prevState) => ({
                    ...prevState,
                    // labels: keys,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: valuesArray,
                        },
                    ],
                }));
            }).catch(error => {
                console.log(error);
            })

            API.getCountOfClassesEnrolledBasedOnTimePeriod(memberId, filterValue).then(response => {
                const count = response.data;
                console.log('classes==>', response.data)
                setNoOfClassEnrollments(count !=0 ? count : 0)
                // setClassesEnrolled((prevState) => ({
                //     ...prevState,
                //     // labels: keys,
                //     datasets: [
                //         {
                //             ...prevState.datasets[0],
                //             data: [count],
                //         },
                //     ],
                // }));
            }).catch(error => {
                console.log(error);
            })

        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        API.getActivitiesBasedOnTimePeriod(userId, event.target.value).then(response => {
            console.log(response.data)
            const dataMap = response.data.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

            const valuesArray = [];
            valuesArray.push(dataMap['CARDIO']);
            valuesArray.push(dataMap['TRAINING'])
            valuesArray.push(dataMap['WEIGHT_TRAINING']);
            valuesArray.push(dataMap['TREADMILL'])
            valuesArray.push(dataMap['ROWING'])
            valuesArray.push(dataMap['HIKING'])
            valuesArray.push(dataMap['SWIMMING']) 

            setData((prevState) => ({
                ...prevState,
                // labels: keys,
                datasets: [
                    {
                        ...prevState.datasets[0],
                        data: valuesArray,
                    },
                ],
            }));
        }).catch(error => {
            console.log(error);
        })

        API.getCountOfClassesEnrolledBasedOnTimePeriod(userId, event.target.value).then(response => {
            console.log('response.data classes==>', response)
            const count = response.data;
            setNoOfClassEnrollments(count)
            // setClassesEnrolled((prevState) => ({
            //     ...prevState,
            //     // labels: keys,
            //     datasets: [
            //         {
            //             ...prevState.datasets[0],
            //             data: [count],
            //         },
            //     ],
            // }));
        }).catch(error => {
            console.log(error);
        })
    };
    return (
        <>
            <MemberNavbar />
            <div style={{ marginTop: '80px', marginLeft: '20px' }}>
                <Typography variant="h5" sx={{ mb: 5 }}>
                    Hi {userName}, Welcome back
                </Typography>
            </div>
            <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                <Typography align='center' gutterBottom variant="h5" >
                    VIEW YOUR ACTIVITIES
                </Typography>
                <FormControl required style={{ width: '180px' }}>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterValue}
                        label="Filter"
                        onChange={handleFilterChange}
                    >
                        {filters.map((filter) => (
                            <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ marginTop: '30px' }}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} lg={3}>
                            <Card>
                                <CardHeader title="Hours spent on Activities" subheader={filterValue} />
                                <Box sx={{ p: 5, pb: 2 }} dir="ltr">
                                    {userRole === 'MEMBER' ? (
                                        <>
                                            <Doughnut data={data} />
                                        </>
                                    ) :
                                        <>
                                            <p>You do not have access to view this data. <BlockIcon color='error' /></p>
                                        </>
                                    }
                                </Box>
                            </Card>
                        </Grid>
                        <Grid xs={12} sm={6} lg={3}>
                            <Card>
                                <CardHeader title="# of Class Enrollments" subheader={filterValue} />
                                <Box sx={{ p: 5, pb: 2 }} dir="ltr">
                                    {userRole === 'MEMBER' ? (
                                        <>
                                            {/* <Pie data={classesEnrolled} /> */}
                                            <Typography variant="h5" sx={{ mb: 5 }} align='center'>{noOfClassEnrollments}</Typography>
                                        </>
                                    ) :
                                        <>
                                            <p>You do not have access to view this data. <BlockIcon color='error' /></p>
                                        </>
                                    }
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default MemberAuth(MemberHome)