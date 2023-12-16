import { Button, Skeleton } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { LandingPageCarousel } from "../../components/carousel/carousel";
import LevelsSection from "./components/levels-section/levelsSection";
import "./styles/styles.css";
import sliderImg from "../../assets/img/sliders/first-page/s1.png";
import CoursesSection from "./components/courses-section/coursesSection";
import { home_apiCalls } from "../../core/services/agent";
import { toast } from "react-toastify";

import AppTour from "../../components/appTour/appTours.component";

const LandingPage = (props) => {
  const [dashboard, set_dashboard] = useState(null);

  useEffect(() => {
    const getDashboardInfo = async () => {
      await home_apiCalls
        .apiCall_getDashboardInfo()
        .then((resp) => {
          if (resp.status === 200) {
            set_dashboard(resp.data.data);
          }
        })
        .catch((ex) => {
          toast.error("دریافت اطلاعات با خطا مواجه شد .");
        });
    };
    getDashboardInfo();
  }, []);

  return (
    <section className=" m-0 p-0 mb-5 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch ">
      <div className="m-0 p-0 my-4 p-3">
        {!dashboard && (
          <>
            {/* Levels Section Skeleton */}
            <div className=" m-0 p-0 d-flex flex-row justify-content-between align-items-center">
              <Skeleton
                style={{
                  borderRadius: ".8rem",
                }}
                variant="rectangular"
                width={55}
                height={55}
              />
              <Skeleton variant="circular" width={170} height={170} />
              <Skeleton
                style={{
                  borderRadius: ".8rem",
                }}
                variant="rectangular"
                width={55}
                height={55}
              />
            </div>
            {/* ProgressBar Skeleton */}
            <Skeleton
              className="mt-3"
              variant="rectangular"
              width={"100%"}
              height={20}
            />
            <Skeleton
              className="align-self-center mx-auto"
              width={150}
              variant="text"
            />
            {/* Carousel Skeleton */}
            <Skeleton
              className="my-4"
              variant="rectangular"
              width={"100%"}
              height={308}
              style={{
                borderRadius: ".8rem",
              }}
            />
            {/* Current Courses Skeleton */}
            <Skeleton
              className="mt-5 align-self-center mx-auto"
              width={150}
              height={40}
              variant="text"
            />
            <Skeleton
              className="mt-2"
              variant="rectangular"
              width={"100%"}
              height={170}
              style={{
                borderRadius: ".8rem",
              }}
            />
          </>
        )}
        {dashboard && (
          <LevelsSection
            interaction={dashboard?.intraction}
            gem={dashboard?.gems}
            level={dashboard?.level?.id}
            scores={dashboard?.scores}
            className="my-4 "
          />
        )}

        {dashboard && <LandingPageCarousel list={dashboard?.banners} />}
      </div>
      {dashboard?.myCourses && (
        <CoursesSection myCourses={dashboard?.myCourses} />
      )}

      {dashboard && <AppTour page="landingPageSteps" />}
    </section>
  );
};

export default LandingPage;

/*
[{ id: 0, src: sliderImg }, { id: 1, src: sliderImg }, { id: 2, src: sliderImg }]
*/
