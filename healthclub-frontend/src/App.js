import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/home/Home.js';
import NavbarHome from './components/home/NavbarHome.js';
import Workouts from './components/home/Workouts.js';
import Membership from './components/home/Membership.js';
import Locations from './components/home/Locations.js';
import Schedule from './components/home/Schedule.js';
import MemberHome from './components/member/MemberHome.js';
import AdminDashboard from './components/admin/AdminDashboard.js';
import MemberForm from './components/admin/MemberForm.js';
import CheckInCheckOut from './components/admin/CheckInCheckOut.js';


function App() {
  return (
    <Router>
      <NavbarHome />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/workout" element={<Workouts />} />
        <Route path="/memberships" exact element={<Membership />} />
        <Route path="/locations" exact element={<Locations />} />
        <Route path="/schedule" exact element={<Schedule />} />

        <Route path="/adminpage" element={<AdminDashboard />} />
        <Route path="/memberpage" element={<MemberHome />} />
        <Route path="/enrollmember" element={<MemberForm />} />
        <Route path="/logmember" element={<CheckInCheckOut />} />
        
        {/* <Route path='/login' element={<Login />} />
        <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/memberpage" element={<PrivateRoute><MemberPage /></PrivateRoute>} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
