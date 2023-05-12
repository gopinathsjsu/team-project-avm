import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/home/Home.js';
import Workouts from './components/home/Workouts.js';
import Membership from './components/home/Membership.js';
import Locations from './components/home/Locations.js';
import Schedule from './components/home/Schedule.js';
import MemberHome from './components/member/MemberHome.js';
import MemberClasses from './components/member/MemberClasses.js';
import MemberWorkoutTracker from './components/member/MemberWorkoutTracker.js';
import AdminDashboard from './components/admin/AdminDashboard.js';
import MemberForm from './components/admin/MemberForm.js';
import CheckInCheckOut from './components/admin/CheckInCheckOut.js';
import UpgradeNonMembers from './components/admin/UpgradeNonMembers.js';

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
        <Route path="/adminpage/upgrade-non-members" element={<UpgradeNonMembers />} />                
        {/* Member Routes */}
        <Route path="/memberpage/activities" element={<MemberHome />} />
        <Route path="/memberpage/memberclasses" element={<MemberClasses />} />
        <Route path="/memberpage/tracker" element={<MemberWorkoutTracker />} />                                      
      </Routes>
    </Router>
  );
}

export default App;
