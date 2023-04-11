import React, { Component } from "react";
// import Overlay from "react-overlay-component";
// import { Router, Link, Switch, Route, Routes } from 'react-router-dom'
import HeroSection from './HeroSection.js';
import './Home.css';
import vid from '../resources/trainingVideo.mp4';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="video-container">
                    <video autoPlay loop muted src={vid} id='myVideo'>
                    </video>
                    <div className="text-overlay"> <HeroSection /> </div>
                </div>

            </div>
        );
    }
}

export default Home;