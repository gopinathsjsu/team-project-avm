import React, { useRef, useEffect } from "react";
import '../../styles/HeroSection.css';
import { Power3, gsap } from "gsap"
import { Typography } from '@mui/material';
export default function HeroSection() {

    let text = useRef(null);
    const tl = gsap.timeline();

    useEffect(() => {
        tl.to(text, 0.6, { opacity: 1, y: 0, ease: Power3 });
    }, []);

    return (
        <div className="hero-container" id="hero">
            <div className="hero--header" ref={el => { text = el }}>
                <Typography variant="h1">Fitfinity</Typography>
                <Typography variant="h3">Shape your body like the way you want it.</Typography>
                <Typography variant="h3">Starts From <span><sup>$</sup>15/<small>month</small></span></Typography>
            </div>
        </div>
    )
}