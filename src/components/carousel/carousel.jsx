import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CourseItem } from "../../pages/home/components/courses-section/coursesSection";
import "./styles/styles.css";
import {
  baseUrl,
  fileBaseUrl,
  imagesBaseUrl,
} from "../../core/services/baseUrl";

const DefaultCarousel = ({ list, slideComponent: SlideComponent, ...rest }) => {
  return (
    <>
      <Carousel {...rest} swipeable={true}>
        {list.map((item) => (
          <SlideComponent key={item?.id ? item.id : Math.random()} {...item} />
        ))}
      </Carousel>
    </>
  );
};

//====================================================================================== //

const FirstPageCarouselSlide = ({ ...data }) => {
  return (
    <div
      style={{ height: "360px" }}
      className="m-0 p-0 firstPageCarousel-item noselect position-relative"
    >
      <img
        src={data?.src}
        alt={data.alt}
        className="m-0 p-0 noselect "
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          boxShadow: "0 4px 5px 0px #ebebeb",
        }}
      />
      <caption
        className="mx-auto text-center"
        style={{
          position: "absolute",
          bottom: "27px",
          left: "0",
          right: "0",
        }}
      >
        {data.alt.replaceAll("-", " ")}
      </caption>
    </div>
  );
};

export const FirstPageCarousel = ({ list }) => {
  return (
    <div dir="ltr" className="m-0 p-0 firstPageCarousel">
      <DefaultCarousel
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        list={list}
        slideComponent={FirstPageCarouselSlide}
      />
    </div>
  );
};

//====================================================================================== //

//====================================================================================== //

const LandingPageCarouselSlide = ({ ...data }) => {
  return (
    <div className="m-0 p-1 px-0  landingPageCarousel-item noselect">
      <img
        src={fileBaseUrl + data?.imageUrl}
        alt="..."
        className="m-0 p-0 noselect box-rounded-1"
        style={{ maxWidth: "100%", maxHeight: "300px" }}
      />
    </div>
  );
};

export const LandingPageCarousel = ({ list }) => {
  return (
    <div dir="ltr" className="m-0 p-0 landingPageCarousel">
      <DefaultCarousel
        showIndicators={true}
        infiniteLoop={false}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        list={list}
        slideComponent={LandingPageCarouselSlide}
      />
    </div>
  );
};

//====================================================================================== //

//====================================================================================== //

const LandingPageCoursesCarouselSlide = (props) => {
  return (
    <div
      style={{ maxWidth: "calc(100vw - 2rem)" }}
      className="m-0 p-1 px-2  landingPageCarousel-item noselect"
    >
      <CourseItem {...props} />
    </div>
  );
};

export const LandingPageCoursesCarousel = ({ list }) => {
  return (
    <div dir="ltr" className="m-0 p-0 landingPageCarousel">
      <DefaultCarousel
        showIndicators={false}
        infiniteLoop={false}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        list={list}
        slideComponent={LandingPageCoursesCarouselSlide}
      />
    </div>
  );
};

//====================================================================================== //
