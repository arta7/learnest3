import React, { useState, useEffect } from "react";

import { CourseItem } from "../../pages/home/components/courses-section/coursesSection";
import Carousel from "nuka-carousel";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

const CoursesNukaCarousel = ({ list }) => {
  return (
    <div dir="ltr" className="m-0 p-0 maxWidth">
      <Carousel withoutControls={true}>
        {list.map((item) => (
          <div key={item?.id} className="p-3">
            <CourseItem {...item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CoursesNukaCarousel;
