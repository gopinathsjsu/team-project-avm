import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Membership.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavbarHome from './NavbarHome.js';
import Image1 from '../../assets/images/WorkoutGym.jpg';
import Image2 from '../../assets/images/Treadmill.jpg';
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
            },
        });
    }, []);

    let cor3 = useRef(null);
    useEffect(() => {
        gsap.to(cor3, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: cor3,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete',
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
            },
        });
    }, []);

    let corri3 = useRef(null);
    useEffect(() => {
        gsap.to(corri3, {
            delay: 0.4,
            duration: 1,
            x: '0',
            y: '0',
            opacity: 1,
            stagger: 0.4,
            ease: 'ease-in',
            scrollTrigger: {
                trigger: corri3,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'restart complete ',
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
                        src={Image1}
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
                        Our treadmills are designed to provide a comfortable and challenging workout,
                        with adjustable speeds and incline levels to cater to all fitness levels.
                        Whether you are a beginner or an experienced athlete, our treadmills can help you achieve your fitness goals.
                        So come on in, and let us help you take your fitness to the next level with our top-of-the-line treadmills! 
                        </p>
                        {/* <Button buttonStyle="btn--primary" buttonSize="btn--large">
            Join Us{' '}
        </Button> */}
                    </div>
                    <img
                        src={Image2}
                        alt="membership"
                        ref={(el) => {
                            cor2 = el;
                        }}
                    />
                </div>
            </div>

            <div className="join-us">
                <div className="joinus--container">
                    <img
                        src="https://sm.askmen.com/t/askmen_in/photo/default/askmen-coolestgym-th_fmq6.h720.jpg"
                        alt="membership"
                        ref={(el) => {
                            cor3 = el;
                        }}
                    />
                    <div
                        className="joinus--headline"
                        ref={(el) => {
                            corri3 = el;
                        }}
                    >
                        <h3>Rowing</h3>
                        <p>
                        At our gym store, we believe that rowing is one of the most effective workouts you can do.
                        Not only does it engage multiple muscle groups at once, but it also provides a low-impact, 
                        full-body workout that can help you build strength, burn calories,and improve your cardiovascular health. 
                        Our rowing machines are top-of-the-line, with features like adjustable resistance levels and 
                        comfortable seating to help you get the most out of your workout. 
                        So why not give it a try and see how rowing can help you reach your fitness goals? Come on in and get rowing today! </p>
                        {/* <Button buttonStyle="btn--primary" buttonSize="btn--large">
            Join Us{' '}
        </Button> */}
                    </div>
                </div>
            </div>

        </>
    );
}