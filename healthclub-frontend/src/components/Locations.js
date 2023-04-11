import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Membership.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Membership() {
    let text = useRef(null);

    useEffect(() => {
        gsap.to(text, {
            duration: 1,
            y: '10',
            opacity: 1,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete ',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    return (
        <div className="membership">
            <div className="membership--container">
                <h1>Locations</h1>
                <p className="membership--desc">
                    
                </p>
                <div
                    className="membership--wrap"
                    ref={(el) => {
                        text = el;
                    }}
                >
                </div>
            </div>
        </div>
    );
}
