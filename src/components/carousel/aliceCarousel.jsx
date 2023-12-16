import React, { useState, useEffect } from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { CourseItem } from "../../pages/home/components/courses-section/coursesSection";

const handleDragStart = (e) => e.preventDefault();


const CoursesCarousel = ({ list }) => {
    return (
        <div dir='ltr' className='m-0 p-3'>
            <AliceCarousel mouseTracking items={
                list.map(item =>
                    <CourseItem key={item?.id ? item.id : Math.random()} {...item} />
                )
            } />
        </div>
    );
}

export default CoursesCarousel;