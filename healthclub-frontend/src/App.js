import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavbarComponent from "./components/NavbarComponent.js";
import Membership from "./components/Membership.js";
import Locations from "./components/Locations.js";
import Workout from './components/Workouts';

function App() {
  return (
    <div>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/memberships" exact element={<Membership />} />
          <Route path="/locations" exact element={<Locations />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
