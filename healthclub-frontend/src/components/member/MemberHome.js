import * as React from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MemberNavbar from './MemberNavbar.js'

const filters = [
    { value: 'Week', label: "Week" },
    { value: 'Month', label: "Month" },
    { value: '90 days', label: "90 days" }
];

export default function MemberHome() {


    const [filterValue, setFilterValue] = React.useState('');

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        //make API call before and modify the response array based on filter or make API call everytime the filter changes.
    };
    return (
        <>
            <MemberNavbar />
            <div style={{ marginTop: '80px', marginLeft: '20px' }}>
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
            <div className='divClass'>
                <Box
                    sx={{
                        // display: 'flex',
                        // '& > :not(style)': {
                        //     m: 1,
                        //     width: 'fit-content',
                        //     height: 'fit-content',

                        // },
                        flexGrow: 1,
                        py: 8
                    }}
                >


                    <Container maxWidth="xl">

                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>

                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>

                                    {/* <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    /> */}
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    {/* <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="5"
                                        overviewType="Total Locations"
                                    /> */}
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    {/* <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    /> */}
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    {/* <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    /> */}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>
            </div>
        </>
    );
}
