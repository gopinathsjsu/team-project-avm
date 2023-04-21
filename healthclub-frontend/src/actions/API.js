import axios from 'axios';
import { decodeToken } from "react-jwt";

// Constants
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const api = 'http://localhost:8080/api/v1';
// Actions

export const register = (payload) => {
    return axios.post(`${api}/auth/register`,  payload);
}

export const login = (payload) => {
    return axios.post(`${api}/auth/authenticate`,  payload);
}

export const logout = () => {
    return { type: LOGOUT };
};

export const fetchGyms = (city) => {
    console.log('city in api.js method==>',city);
    console.log(`${api}/gym/${city}`);
    return axios.get(`${api}/gym/${city}`);
}

export const fetchGymSchedule = (gymId) => {
    console.log('gymId in api.js method==>',gymId);
    console.log(`${api}/gym/schedule/${gymId}`);
    return axios.get(`${api}/gym/schedule/${gymId}`);
}


/*

Mark Entry time (member name/ID, DateTime, location)  - POST request
Get members with entry time posted - home location, today's Date
After exit time load table again and disable the exit time button
Get Instructors
Dashboard APIs


*/
