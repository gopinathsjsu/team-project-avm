import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/home/Home.js';
import Workouts from './components/home/Workouts.js';
import Membership from './components/home/Membership.js';
import Locations from './components/home/Locations.js';
import Schedule from './components/home/Schedule.js';
import MemberHome from './components/member/MemberHome.js';
import MemberSchedule from './components/member/MemberSchedule.js';
import MemberWorkoutTracker from './components/member/MemberWorkoutTracker.js';
import AdminDashboard from './components/admin/AdminDashboard.js';
import MemberForm from './components/admin/MemberForm.js';
import CheckInCheckOut from './components/admin/CheckInCheckOut.js';

function App() {
  return (
    <Router>
      {/* <NavbarHome /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="*" element={<Navigate to="/" />} />
        
        <Route path='/' element={<Home />} />
        <Route path="/workout" element={<Workouts />} />
        <Route path="/memberships" exact element={<Membership />} />
        <Route path="/locations" exact element={<Locations />} />
        <Route path="/schedule/:gymId" exact element={<Schedule />} />
        {/* Admin Routes */}
        <Route path="/adminpage" element={<AdminDashboard />} />        
        <Route path="/adminpage/enrollmember" element={<MemberForm />} />
        <Route path="/adminpage/logmember" element={<CheckInCheckOut />} />
        {/* Member Routes */}
        <Route path="/memberpage/activities" element={<MemberHome />} />
        <Route path="/memberpage/memberclasses" element={<MemberSchedule />} />
        <Route path="/memberpage/tracker" element={<MemberWorkoutTracker />} />
        
        
        
        {/* <Route path='/login' element={<Login />} />
        <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/memberpage" element={<PrivateRoute><MemberPage /></PrivateRoute>} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
