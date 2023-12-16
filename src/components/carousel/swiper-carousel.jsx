import React, { useState, useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';




import { CourseItem } from "../../pages/home/components/courses-section/coursesSection";

const CoursesCarousel = ({ list }) => {
    return (
        <Swiper
            dir='ltr'
            spaceBetween={50}
            slidesPerView={1}
        >
            {list.map(item =>
                <SwiperSlide style={{maxWidth:"300px"}} key={item?.id ? item.id : Math.random()}>
                    <CourseItem  {...item} />
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default CoursesCarousel;