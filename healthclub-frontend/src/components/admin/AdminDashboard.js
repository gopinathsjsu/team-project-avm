import * as React from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { OverviewTotalCustomers } from './OverviewTotalCustomers.js';
import AdminDashboardCSS from './AdminDashboard.css'
import Customers from './customers'

const drawerWidth = 240;


const openDashboard = () => {

}
const openMembers = () => {

}

//Get all the dashboard values from backend
export default function AdminDashboard() {
    return (
        <>
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
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={false}
                                        sx={{ height: '100%' }}
                                        value="1.7k"
                                        overviewType="Total Members"
                                    />
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    />
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="5"
                                        overviewType="Total Locations"
                                    />
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    />
                                </Paper>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                lg={3}
                            >
                                <Paper elevation={3}>
                                    <OverviewTotalCustomers
                                        difference={16}
                                        positive={true}
                                        sx={{ height: '100%' }}
                                        value="10"
                                        overviewType="Total Classes"
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Customers />
                </Box>
            </div>
        </>
    );
}
