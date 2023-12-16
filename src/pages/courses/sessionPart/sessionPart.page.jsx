import React, { useEffect, useState } from "react";
import SessionPartSlideItem from "./components/sessionPartSlideItem/sessionPartSlideItem.component";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import http from "../../../core/services/http";
import "swiper/css/navigation";
import "swiper/css";
import "./style/style.css";
import { session_apiCalls } from "../../../core/services/agent";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
import { baseUrl } from "../../../core/services/baseUrl";

const SessionPart = (props) => {
  // routing hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { classRoomInfo } = useClassRoomStateContext();
  // data
  const [currentItem, set_currentItem] = useState();
  const [sessionPartItems, set_sessionPartItems] = useState([]);
  const [sessionPartQuestions, set_sessionPartQuestions] = useState([]);
  const [sessionPartType, set_sessionPartType] = useState([]);
  const [hasExercise, setHasExercise] = useState();
  const [sessionId, set_sessionId] = useState();
  // swiper state
  const [swiper, setSwiper] = useState(null);
  const [counter, setCounter] = useState(1);
  const [currentItemIndex, set_currentItemIndex] = useState(0);

  useEffect(() => {
    if (location?.state?.sessionPartItems) {
      set_sessionPartItems(location?.state?.sessionPartItems);
      set_currentItem(location?.state?.sessionPartItems[0]);
      set_sessionPartType(location?.state?.sessionPartType);
      setHasExercise(location?.state?.hasExercise);
      set_sessionId(location?.state?.sessionId);
    }
  }, [location?.state]);

  const handleGoNext = () => {
    // const index = currentItemIndex;
    if (
      currentItemIndex >= 0 &&
      currentItemIndex < sessionPartItems?.length - 1 &&
      sessionPartItems?.length > 0
    ) {
      set_currentItemIndex((currentItemIndex) => currentItemIndex + 1);
      set_currentItem(null);
      setTimeout(() => {
        set_currentItem(sessionPartItems[currentItemIndex + 1]);
      }, 200);
    }
  };

  const handleGoPervious = () => {
    // const index = sessionPartItems.indexOf(currentItem);

    if (currentItemIndex > 0) {
      set_currentItemIndex((currentItemIndex) => currentItemIndex - 1);
      set_currentItem(null);
      setTimeout(() => {
        set_currentItem(sessionPartItems[currentItemIndex - 1]);
      }, 200);
    }
  };

  useEffect(() => {
    if (currentItemIndex === sessionPartItems?.length - 1) {
      if (classRoomInfo?.classroomId && !hasExercise) {
        apiCaller({
          api: session_apiCalls.apiCall_completeSessionpart,
          apiArguments: {
            classroomId: classRoomInfo?.classroomId,
            sessionPartId: id,
            percent: 0,
          },
          toastMessage: false,
        });
      }
    }
  }, [currentItemIndex]);

  const getSessionPartTitle = () => {
    switch (sessionPartType) {
      case 0:
        return "Vocabulary";
      case 1:
        return "Grammar";
      case 2:
        return "Speaking";
      case 3:
        return "Listening";
      case 4:
        return "Conversation";
      case 5:
        return "Reading";
      case 6:
        return "نکات آموزشی";
    }
  };

  // sliding Swiper
  const slidingSwiper = (btnName) => {
    if (btnName === "Next") {
      document.querySelector(".swiper-button-next").click();
      document
        .querySelector(".hidden-scrollbar")
        .scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    if (btnName === "Previous") {
      document.querySelector(".swiper-button-prev").click();
      document
        .querySelector(".hidden-scrollbar")
        .scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  // handle See sessionPart Questions
  const handleGotoSessionPartQuestions = async (partId) => {
    if (!hasExercise) return;

    await axios
      .post(
        baseUrl + "/courses/getpartquestions?partId=" + partId,
        null,
        {
          headers: {
            Authorization: http.getToken(),
            Version: "ewano"
          },
        }
      )
      .then((resp) => {
        if (resp?.status === 200 && resp?.data.status === "1") {
          if (resp.config.data?.data?.questions?.length > 0) {
            navigate("/question-engine", {
              state: {
                questions: resp?.data.data.questions,
                typeId: sessionId,
                baseAnsweringType: 1,
                pageDataOnFinishQuestions: {
                  path: "/course-detail/" + sessionId,
                },
              },
            });
          }

          // set_sessionPartQuestions(resp?.data.data.questions);
        }
      })
      .catch((exp) => {
        console.log(exp);
      });
  };

  const handleNavigateToSession = () => {
    navigate(-1);
  };

  return (
    <section className="w-100 h-100 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <h3 className="text-center mt-3">
        {sessionPartType && getSessionPartTitle()}
      </h3>
      <div dir="ltr" className="m-0 p-0 my-3 pb-5">
        <SessionPartSlideItem data={currentItem} />
        {/* <Swiper
          dir="ltr"
          className="btn-cursor"
          modules={[Navigation]}
          onSwiper={setSwiper}
          navigation
          onSlideChange={(e) => setCounter(e.activeIndex + 1)}
        >
          {sessionPartItems?.length > 0 &&
            sessionPartItems?.map((item, index) => (
              <SwiperSlide style={{ height: "auto" }} key={item.id}>
                <SessionPartSlideItem
                  isActive={swiper.activeIndex === index}
                  key={item.id}
                  data={item}
                />
              </SwiperSlide>
            ))}
        </Swiper> */}
      </div>

      {/* End Swiper Slider */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
          margin: "0 auto",
          width: "100%",
          maxWidth: "800px",
          zIndex: "10",
          boxShadow: "rgb(204 204 204) 0px -2px 5px 2px",
          backgroundColor: "#fff",
        }}
        className=" py-2 p-0 d-flex w-100 flex-row justify-content-center align-items-center"
      >
        <div
          // onClick={() => slidingSwiper("Next")}
          onClick={handleGoNext}
          className={
            (currentItemIndex === sessionPartItems?.length - 1
              ? "d-none"
              : "") +
            " col-3 m-0 p-3 mx-2 align-middle text-center font-15 btn-cursor text-white"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          {" < "}
          {" بعدی"}
        </div>
        {hasExercise ? (
          <div
            onClick={() => handleGotoSessionPartQuestions(id)}
            className={
              (currentItemIndex === sessionPartItems?.length - 1
                ? "d-flex"
                : "d-none") +
              " col-5 m-0 d-flex justify-content-center align-items-center mb-2 mx-2 p-3 text-center btn-cursor text-white"
            }
            style={{ backgroundColor: "#82c91e", borderRadius: "10px" }}
          >
            {" "}
            مشاهده سوالات{" "}
          </div>
        ) : null}
        <div
          // onClick={() => slidingSwiper("Previous")}
          onClick={handleGoPervious}
          className={
            (currentItemIndex === 0 ? "d-none" : "") +
            " col-3 m-0 p-3 mx-2 me-1 align-middle text-center font-15 btn-cursor text-white"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          {"قبلی "} {" >"}
        </div>
        <div
          onClick={handleNavigateToSession}
          className={
            (currentItemIndex === 0 ? "d-none" : "") +
            " m-0 p-3 mx-2 me-1 align-middle text-center font-15 cursor-pointer text-white text-nowrap"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          بازگشت به جلسه
        </div>
      </div>
    </section>
  );
};

export default SessionPart;
