import axios from 'axios';
import cors from 'cors';

// Constants
const LOGOUT = 'LOGOUT';
const api = 'http://localhost:8080/api/v1';
// Actions

export const register = (payload) => {
    return axios.post(`${api}/auth/register`, payload);
}

export const login = (payload) => {
    return axios.post(`${api}/auth/authenticate`, payload);
}

export const logout = () => {
    return { type: LOGOUT };
};

export const fetchGyms = (city) => {
    console.log('city in api.js method==>', city);
    console.log(`${api}/gym/${city}`);
    return axios.get(`${api}/gym/${city}`);
}

export const fetchGymSchedule = (gymId) => {
    console.log('gymId in api.js method==>', gymId);
    console.log(`${api}/gym/schedule/${gymId}`);
    return axios.get(`${api}/gym/schedule/${gymId}`);
}

export const fetchMemberDetails = () => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    const email = 'tom@gmail.com';
    return axios.get('http://localhost:8080/api/v1/admin/member', { email }, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Headers': '*'
        },
        mode: 'no-cors',
        //credentials: true
    });
    
}

export const checkInMembers = (gymId, email) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    const corsOptions = {
        origin: 'http://localhost:3000', // specify the URL of your server
    };

    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(cors(corsOptions));
    return axiosInstance.post('http://localhost:8080/api/v1/admin/member/checkIn', { gymId, email }, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        mode: 'cors',
        credentials: 'include'
    });
}

export const checkOutMembers = (userGymVisitId) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.put('http://localhost:8080/api/v1/admin/member/checkOut?userGymVisitId', { userGymVisitId }, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        },
        mode: 'cors',
        credentials: 'include'
    });
}

export const getCheckedInUsers = (gymId) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get('http://localhost:8080/api/v1/admin/member/currentCheckedInList', { gymId }, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`,
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Credentials':'true',
            // 'Access-Control-Allow-Headers': '*'
        },
        //mode: 'no-cors',
        //credentials: 'include'
    });
}


/*
headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
}
*/


/*

Mark Entry time (member name/ID, DateTime, location)  - POST request
Get members with entry time posted - home location, today's Date
After exit time load table again and disable the exit time button
Get Instructors
Dashboard APIs


*/
