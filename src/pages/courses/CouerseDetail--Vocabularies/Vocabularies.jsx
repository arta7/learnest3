import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Navigation } from "swiper";
import VocabItem from "./components/VocabItem/VocabItem";
import VocabModal from "./components/VocabModal/VocabModal";
import Toolbar from "../../../components/toolbar/toolbar.component";
import ClassRoomBreadCrumb from "../../../components/breadCrumbs/classRoomBreadCrumb/classRoomBreadCrumb.component";
import {
  useClassRoomActions,
  useClassRoomStateContext,
} from "../../../core/contexts/classRoom/classRoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style/style.scss";
import { Button, IconButton } from "@mui/material";
import useAddToLeitnerPosition from "../../../components/toolbar/use_AddToLeitner_Position.hook";
import { LeitnerIcon } from "../../../components/icons/icons";
import AddToLeitner from "../../../components/toolbar/components/addToLeitner.component";
import AppTour from "../../../components/appTour/appTours.component";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { session_apiCalls } from "../../../core/services/agent";

const Vocabularies = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { breadCrumbActions } = useClassRoomActions();

  const [vocabularies, set_vocabularies] = useState([]);
  const [counter, setCounter] = useState(1);

  // state for swiper
  const [swiper, setSwiper] = useState(null);

  // Vocab Modal State
  const [openModal, setOpenModal] = useState(false);
  const [selectedModalValue, setSelectedMOdalValue] = useState(null);
  const [sessionId, set_sessionId] = useState();
  ////////////////////////////////////////////////////////////////////
  const { left, bottom } = useAddToLeitnerPosition();
  const [showAddToLeitner, set_showAddToLeitner] = useState(true);
  const [addedToLeitnerItems, set_addedToLeitnerItems] = useState([]);
  const [openAddToLeitner, set_openAddToLeitner] = useState(false);
  const handleToggleLeitnerDialog = () => {
    set_openAddToLeitner(!openAddToLeitner);
  };
  const handleAddTo_addedToLeitnerItems = (vocabFront) => {
    set_addedToLeitnerItems([...addedToLeitnerItems, vocabFront]);
  };
  /////////////////////////////////////////////////////////////////////
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (value) => {
    setOpenModal(false);
    setSelectedMOdalValue(value);
  };

  useEffect(() => {
    if (location?.state) {
      set_vocabularies(location.state?.vocabs);
      set_sessionId(location.state?.sessionId);
    }
  }, [location?.state]);

  // Sliding Swiper
  const slidingSwiper = (btnName) => {
    if (btnName === "Next") {
      document.querySelector(".swiper-button-next").click();
    }
    if (btnName === "Previous") {
      document.querySelector(".swiper-button-prev").click();
    }
  };

  // handle Modal Items Click
  const handleModalItemsClick = (indx) => {
    swiper.slideTo(indx - 1);
    setCounter(indx);
    setOpenModal(false);
  };

  const handleSeeQuestions = () => {
    if (vocabularies?.length >= 4)
      navigate("/vocabulariesquestion", {
        state: {
          vocabs: [...vocabularies],
          sessionId: sessionId,
          sessionPartId: id,
          vocabQuestionsToAnswer: location.state.vocabQuestionsToAnswer,
        },
      });
  };
  const { classRoomInfo } = useClassRoomStateContext();
  const handleCall_compeleteSessionPart = () => {
    apiCaller({
      api: session_apiCalls.apiCall_completeSessionpart,
      apiArguments: {
        classroomId: classRoomInfo?.classroomId,
        sessionPartId: id,
        percent: 0,
      },
      toastMessage: false,
    });
  };

  useEffect(() => {
    if (counter === vocabularies?.length) {
      /// call api
      if (classRoomInfo?.classroomId) {
        handleCall_compeleteSessionPart();
      }
    }
  }, [counter]);

  return (
    <section className="m-0 p-3 p-0 vocab-section pb-5">
      <div
        onClick={handleOpenModal}
        className=" cursor-pointer m-0 p-0 d-flex flex-row justify-content-between align-items-baseline"
      >
        {counter}/{vocabularies?.length}
        <ClassRoomBreadCrumb />
      </div>
      {vocabularies &&
        vocabularies?.length > 0 &&
        vocabularies?.[swiper?.activeIndex] && (
          <Toolbar
            isVocab={true}
            front={vocabularies[swiper.activeIndex].phrase}
            back={vocabularies[swiper.activeIndex].meaning}
          />
        )}
      {/* Start Swiper Slider */}
      <Swiper
        className="mb-6"
        dir="ltr"
        modules={[Navigation]}
        onSwiper={setSwiper}
        navigation
        onSlideChange={(e) => setCounter(e.activeIndex + 1)}
      >
        <VocabModal
          handleModalItemsClick={handleModalItemsClick}
          vocabularies={vocabularies}
          handleCloseModal={handleCloseModal}
          openModal={openModal}
          selectedModalValue={selectedModalValue}
        />
        {vocabularies?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <VocabItem
              isCurrent={swiper.activeIndex === index}
              key={item.id}
              data={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* End Swiper Slider */}

      {/* Add To Leitner Vocab */}
      <AppTour page="vocabularies" />

      {/* Navigatin Between Vocabs */}
      <div
        style={{
          maxWidth: "800px",
          width: "100vw",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "#fff",
          zIndex: "10",
        }}
        className="mx-auto bg-white m-0 p-0 p-2 d-flex flex-column justify-content-between align-items-stretch"
      >
        <div className="d-flex flex-row justify-content-between align-items-stretch">
          {/**************************************/}
          {
            // location.state.vocabQuestionsToAnswer > 0 &&
            vocabularies?.length === counter && (
              <div
                className="m-0 p-0 pe-1 flex-grow-1"
                style={{
                  width: "calc(50% - 2rem)",
                  opacity: vocabularies?.length < 4 ? "0" : "1",
                  visibility: vocabularies?.length < 4 ? "hidden" : "visible",
                }}
              >
                <div
                  onClick={handleSeeQuestions}
                  className={
                    " m-0 p-3 d-flex justify-content-center align-items-center text-center btn-cursor text-white"
                  }
                  style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
                >
                  مشاهده سوالات
                </div>
              </div>
            )
          }
          {/*  */}
          <div
            style={{
              width: "calc(50% - 2rem)",
            }}
            className={
              (counter === vocabularies?.length ? "d-none" : "") +
              "  m-0 p-0 pe-1  flex-grow-1"
            }
          >
            <div
              onClick={() => {
                if (counter !== vocabularies?.length) slidingSwiper("Next");
              }}
              className={
                " m-0 p-3 align-middle text-center font-15 btn-cursor text-white noselect "
              }
              style={{
                backgroundColor: "#228be6",
                borderRadius: "10px",
              }}
            >
              {"< بعدی"}
            </div>
          </div>
          {/*  */}
          <div>
            {!addedToLeitnerItems.includes(
              vocabularies[swiper?.activeIndex]?.phrase
            ) && (
              <>
                <Button
                  id="addToLeitner"
                  style={{
                    // position: "fixed",
                    // left,
                    // bottom,
                    width: "5rem",
                    height: "100%",
                    minWidth: "5rem",
                    // borderRadius: "50%",
                    padding: "0",
                    zIndex: "10",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleToggleLeitnerDialog}
                  className="d-flex box-rounded-1 flex-column justify-content-center align-items-center"
                >
                  <LeitnerIcon
                    width="27"
                    height="20"
                    // viewBox="0 0 27 20"
                    lightness="contrastText"
                  />
                  <span
                    style={{ fontSize: "0.5rem", lineHeight: "0.9rem" }}
                    className=""
                  >
                    افزودن به لایتنر
                  </span>
                </Button>
                <AddToLeitner
                  open={openAddToLeitner}
                  onClose={handleToggleLeitnerDialog}
                  isVocab={true}
                  toggle={handleToggleLeitnerDialog}
                  front={vocabularies[swiper?.activeIndex]?.phrase}
                  back={vocabularies[swiper?.activeIndex]?.meaning}
                  onSucceed={() => {
                    handleAddTo_addedToLeitnerItems(
                      vocabularies[swiper?.activeIndex]?.phrase
                    );
                  }}
                />
              </>
            )}
          </div>
          {/*  */}
          <div
            className="m-0 p-0 ps-1 flex-grow-1"
            style={{
              width: "calc(50% - 2rem)",
            }}
          >
            <div
              onClick={() =>
                counter - 1 === 0 ? () => {} : slidingSwiper("Previous")
              }
              className={
                (counter - 1 === 0 ? "disabled-btn" : "") +
                "  m-0 p-3 align-middle text-center font-15 btn-cursor text-white noselect "
              }
              style={{
                backgroundColor: counter - 1 === 0 ? "#999" : "#228be6",
                borderRadius: "10px",
                transition: "0.3s",
              }}
            >
              {"قبلی >"}
            </div>
          </div>
          {/**************************************/}
        </div>
        <div
          onClick={() => navigate(-1)}
          className={
            (vocabularies?.length === counter ? "" : "d-none") +
            " col-12 m-0 p-2 mt-2  align-middle text-nowrap text-center font-15 btn-cursor text-white"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          {"بازگشت به صفحه قبل"}
        </div>
      </div>
    </section>
  );
};

export default Vocabularies;
