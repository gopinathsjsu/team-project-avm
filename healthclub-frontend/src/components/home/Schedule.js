import React, { useRef, useEffect, useState } from 'react';
import './Schedule.css'

export default function Schedule() {

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const classes = [
        {
            date: 'Mon, Apr 18 2023',
            title: 'Yoga',
            time: '6:00 PM - 7:00 PM',
            instructor: 'John Smith',
            image: 'yoga.jpg',
        },
        {
            date: 'Mon, Apr 18 2023',
            title: 'Yoga',
            time: '6:00 PM - 7:00 PM',
            instructor: 'John Smith',
            image: 'yoga.jpg',
        },
        {
            date: 'Sun, Apr 22 2023',
            title: 'Pilates',
            time: '5:30 PM - 6:30 PM',
            instructor: 'Mary Johnson',
            image: 'pilates.jpg',
        },
        {
            date: 'Fri, May 7',
            title: 'Spinning',
            time: '7:00 AM - 8:00 AM',
            instructor: 'Tom Davis',
            image: 'spinning.jpg',
        },
    ];

    const filteredClasses = classes.filter((cls) => {
        const classDate = new Date(cls.date);
        console.log(classDate)
        return classDate >= startOfWeek && classDate <= endOfWeek;
      });

    return (
        <>
            <div style={{marginTop:'100px'}} className="class-schedule">
                {filteredClasses.map((cls) => (
                    <div key={cls.title} className="class-item">
                        <div className="class-date">{cls.date}</div>
                        {/* <div className="class-image">
                            <img src={cls.image} alt={cls.title} />
                        </div> */}
                        <div className="class-details">
                            <div className="class-title">{cls.title}</div>
                            <div className="class-time">{cls.time}</div>
                            <div className="class-instructor">{cls.instructor}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}