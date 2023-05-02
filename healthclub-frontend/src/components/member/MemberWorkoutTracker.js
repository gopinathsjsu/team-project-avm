import * as React from 'react';
import { useState } from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import MemberNavbar from './MemberNavbar.js'


import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const workouts = [
    {
        value: 'Cardio',
        label: 'Cardio',
    }
];



function handleSubmit() {

}

export default function MemberHome() {
    const [startTime, setStartTime] = useState(dayjs(new Date()));
    const [endTime, setEndTime] = useState(dayjs(new Date()));
    const [workout, setWorkout] = useState('');

    return (
        <>
            <MemberNavbar />
            <div style={{ marginTop: '80px', marginLeft: '20px' }}>
                <div>
                    <FormControl required style={{ width: '180px' }}>
                        <InputLabel id="demo-simple-select-label">Choose Workout</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={workout}
                            label="Workout"
                            onChange={(newValue) => setWorkout(newValue)}
                        >
                            {workouts.map((workout) => (
                                <MenuItem key={workout.value} value={workout.value}>{workout.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                            <TimePicker
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                            />
                        </LocalizationProvider>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </DemoContainer>
                </div>
            </div>

        </>
    );
}


