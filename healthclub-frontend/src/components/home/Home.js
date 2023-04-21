import React, { Component } from "react";
import HeroSection from './HeroSection.js';
import '../../styles/Home.css';

import vid from '../../assets/videos/trainingVideo.mp4';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="video-container">
                    <video autoPlay loop muted src={vid} id='myVideo'>
                    </video>
                    <div className="text-overlay">
                        <HeroSection />
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;