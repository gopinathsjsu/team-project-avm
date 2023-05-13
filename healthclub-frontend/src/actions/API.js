import axios from 'axios';

// Constants
//const api = 'http://localhost:8080/api/v1';
const api = 'http://healthclub-671190449.us-east-2.elb.amazonaws.com/api/v1'
// Actions

/* ******** PUBLIC APIs *********** */

/* Register new user - Admin, Member */
export const register = (payload) => {
    return axios.post(`${api}/auth/register`, payload);
}

/* Login authentication API - Admin, Member */
export const login = (payload) => {
    return axios.post(`${api}/auth/authenticate`, payload);
}

/* API to fetch gyms based on the given city */
export const fetchGyms = (city) => {
    return axios.get(`${api}/gym/${city}`);
}

/* API to fetch gym schedules based on the given gym ID */
export const fetchGymSchedule = (gymId) => {
    return axios.get(`${api}/gym/schedule/${gymId}`);
}

/* API to fetch gym schedules based on the given gym ID */
export const getGymActivities = () => {
    return axios.get(`${api}/gym/activity`);
}

/* API to fetch all the gym cities */
export const getGymCities = () => {
    return axios.get(`${api}/gym/city`);
}

/* API to fetch all the gym location details */
export const getLocationDetails = (gymId) => {
    return axios.get(`${api}/gym/details/${gymId}`);
}

/****************** 
*****************  ADMIN APIs *****************
******************/

/* API to fetch any user details based on the given email of the user */
export const fetchUserDetails = (email) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));    
    return axios.get(`${api}/admin/member/${email}`, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to check-in members into the gym */
export const checkInMembers = (payload) => {    
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.post(`${api}/admin/member/checkIn`, payload, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to check-out members out of the gym */
export const checkOutMembers = (payload) => {    
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.put(`${api}/admin/member/checkOut`, payload, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to get a list of checked-in members into the gym */
// Only for current date??? - Ideally current date
export const getCheckedInUsers = (gym) => {
    let gymId = gym.gymId;
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/admin/member/currentCheckedInList/${gymId}`, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`,
        }
    });
}

/* API to get Gym analytics for the given location and Date range */
export const getGymAnalytics = (location, startDate, endDate) => {       
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/admin/analytics/${location}?startDate=${startDate}&endDate=${endDate}`,  {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to get Gym Visitors by hour for the given location and Date range */
export const getVisitorsByHour = (location, startDate, endDate) => {    
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/admin/analytics/${location}/visitors-by-hour?startDate=${startDate}&endDate=${endDate}`,  {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to get time sent by the vistors by date for the given location and Date range */
export const getTimeSpentByDate = (location, startDate, endDate) => {    
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/admin/analytics/${location}/hours-spent?startDate=${startDate}&endDate=${endDate}`,  {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to get a list of all free trail members */
export const getFreeTrailMembers = () => {    
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/admin/free-trial-members`,  {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}

/* API to upgrade free trial members  */
export const upgradeFreeTrailMembers = (payload) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.post(`${api}/admin/upgrade`, payload, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}
/****************** 
*****************  MEMBER APIs *****************
******************/


/* API to fetch member and free trial user details based on the given email of the user */
export const fetchMemberDetails = (email) => {
    const adminData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));    
    return axios.get(`${api}/member/user/${email}`, {
        headers: {
            'Authorization': `Bearer ${adminData.token}`
        }
    });
}


/* API for members to register for a class */
/*
{   
    "userId": 2,
    "scheduleId": 9
}
*/
export const registerForClass = (payload) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.post(`${api}/member/user/book`, payload, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}

/* API for members to get his upcoming/reserved classes */
export const getUserUpcomingClasses = (userId) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/member/user/${userId}/schedule`, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}

/* API for members to log their activities (in minutes) */
/*
{   
    "userId":1,
    "activity":Cardio,
    "timeInMinutes":10
}
*/
export const logMemberActivity = (payload) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.post(`${api}/member/user/activity`, payload, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}

/* API for members to get all their activities data */
export const getMemberActivities = (userId) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/member/user/${userId}/activity`, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}

/* API for members to get all their activities data for the selected time period */
export const getActivitiesBasedOnTimePeriod = (userId, timePeriod) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/member/user/${userId}/activity/${timePeriod}`, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}

/* API for members to get all their classes enrolled count for the selected time period */
export const getCountOfClassesEnrolledBasedOnTimePeriod = (userId, timePeriod) => {
    const memberData = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));
    return axios.get(`${api}/member/user/${userId}/schedule/${timePeriod}`, {
        headers: {
            'Authorization': `Bearer ${memberData.token}`,
        }
    });
}