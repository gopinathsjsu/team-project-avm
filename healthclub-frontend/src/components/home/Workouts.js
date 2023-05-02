import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Membership.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavbarHome from './NavbarHome.js';
gsap.registerPlugin(ScrollTrigger);

export default function Workout() {
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

    let cor1 = useRef(null);
    useEffect(() => {
        gsap.to(cor1, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: cor1,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    let cor2 = useRef(null);
    useEffect(() => {
        gsap.to(cor2, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: cor2,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    let corri1 = useRef(null);
    useEffect(() => {
        gsap.to(corri1, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            stagger: 0.4,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: corri1,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete ',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    let corri2 = useRef(null);
    useEffect(() => {
        gsap.to(corri2, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            stagger: 0.4,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: corri2,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete ',
                //options: play, pause, resume, reset, restart, complete, reverse,none
            },
        });
    }, []);

    return (
        <>
            <NavbarHome />
            <div className="membership">
                <div className="membership--container">
                    <h1>Workouts</h1>
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

            <div className="join-us">
                <div className="joinus--container">
                    <img
                        src="https://sm.askmen.com/t/askmen_in/photo/default/askmen-coolestgym-th_fmq6.h720.jpg"
                        alt="membership"
                        ref={(el) => {
                            cor1 = el;
                        }}
                    />
                    <div
                        className="joinus--headline"
                        ref={(el) => {
                            corri1 = el;
                        }}
                    >
                        <h3>How to Join?</h3>
                        <p>
                            Apply online or visit your nearest club and activate your Fitfinity
                            memberships in minutes to train for the future. Our memberships
                            are your shortcut to your fitness ambitions.
                        </p>
                        {/* <Button buttonStyle="btn--primary" buttonSize="btn--large">
            Join Us{' '}
        </Button> */}
                    </div>
                </div>
            </div>


            <div className="join-us">
                <div className="joinus--container">

                    <div
                        className="joinus--headline"
                        ref={(el) => {
                            corri2 = el;
                        }}
                    >
                        <h3>Treadmill</h3>
                        <p>
                            Apply online or visit your nearest club and activate your Fitfinity
                            memberships in minutes to train for the future. Our memberships
                            are your shortcut to your fitness ambitions.
                        </p>
                        {/* <Button buttonStyle="btn--primary" buttonSize="btn--large">
            Join Us{' '}
        </Button> */}
                    </div>
                    <img
                        src="https://sm.askmen.com/t/askmen_in/photo/default/askmen-coolestgym-th_fmq6.h720.jpg"
                        alt="membership"
                        ref={(el) => {
                            cor2 = el;
                        }}
                    />
                </div>
            </div>
        </>
    );
}
