import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLocation, useNavigate } from "react-router";
import VocabQuestionsItem from "./components/VocabQuestionsItem";
import { createQuestionList } from "./questionCreator";
import "./style/style.css";
import "swiper/css";
import { Button } from "@mui/material";
import Toolbar from "../../../components/toolbar/toolbar.component";
import ClassRoomBreadCrumb from "../../../components/breadCrumbs/classRoomBreadCrumb/classRoomBreadCrumb.component";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { session_apiCalls } from "../../../core/services/agent";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";

const SeeVocabsQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classRoomInfo } = useClassRoomStateContext();
  const [vocabularies, set_vocabularies] = useState([]);
  const [questions, set_questions] = useState([]);
  const [answerSheet, set_answerSheet] = useState([]);
  const [sessionId, set_sessionId] = useState();
  const [sessionPartId, set_sessionPartId] = useState();

  useEffect(() => {
    if (location?.state?.vocabs) {
      if (location?.state?.vocabs?.length > 30) {
        set_vocabularies(
          location?.state?.vocabs?.slice(
            0,
            location.state.vocabQuestionsToAnswer
          )
        );
      } else {
        set_vocabularies(location?.state?.vocabs);
      }
      set_sessionId(location?.state?.sessionId);
      if (location?.state?.sessionPartId) {
        set_sessionPartId(location?.state?.sessionPartId);
      }
    }
  }, [location?.state]);

  useEffect(() => {
    if (vocabularies.length > 0) {
      const questions = createQuestionList(vocabularies);
      set_questions(questions);
    }
  }, [vocabularies]);

  const [swipe, set_swipe] = useState();
  const [allowSwipe, set_allowSwipe] = useState(false);
  const [trueAnswers, set_trueAnswers] = useState(0);
  const [showNextButton, set_showNextButton] = useState(false);
  const [showSeeResult, set_showSeeResult] = useState(false);
  const [showSeeResultButton, setShowSeeResultButton] = useState(true);
  const [showBackToSessionButton, set_showBackToSessionButton] =
    useState(false);
  const [counter, set_counter] = useState(0);

  const handleSlideToNext = () => {
    set_allowSwipe(true);
    set_counter(counter + 1);
  };

  const handleIncrementTrueAnswers = () => {
    set_trueAnswers(trueAnswers + 1);
  };

  useEffect(() => {
    if (allowSwipe) {
      swipe.slideNext();
      set_allowSwipe(false);
      set_showNextButton(false);
    }
  }, [allowSwipe]);

  const handleCall_compeleteSessionPart = () => {
    apiCaller({
      api: session_apiCalls.apiCall_completeSessionpart,
      apiArguments: {
        classroomId: classRoomInfo?.classroomId,
        sessionPartId: sessionPartId,
        percent: 0,
      },
      toastMessage: false,
    });
  };

  // useEffect(() => {
  //   if (classRoomInfo?.classroomId && sessionPartId)
  //     handleCall_compeleteSessionPart();
  // }, [classRoomInfo?.classroomId, sessionPartId]);

  const handleSeeResult = (e) => {
    set_showSeeResult(true);
    set_showBackToSessionButton(true);

    setShowSeeResultButton(false);
  };

  const handle_addToAnswerSheet = (answerObject) => {
    set_answerSheet([
      ...answerSheet,
      { questionId: answerObject.id, meaning: answerObject.meaning },
    ]);
  };

  const handleBackToSession = () => {
    navigate(-2);
  };

  return (
    <section className="pt-3 d-flex flex-column justify-content-center align-items-center my-auto">
      <div className="d-flex mb-3 flex-column justify-content-between align-items-start w-100 m-0 px-3">
        <div
          dir="ltr"
          className="m-0 p-0 w-100 d-flex flex-row justify-content-start align-items-baseline"
        >
          <ClassRoomBreadCrumb />
        </div>

        {questions && questions?.length > 0 && (
          <Toolbar
            className="w-100 mb-2"
            isVocab={true}
            // front={questions[counter]?.qustionTitle}
            // back={questions[counter]?.correctAnswer}
          />
        )}

        <div
          style={{
            transition: "0.5s",
            minHeight: showSeeResult ? "50vh" : "auto",
          }}
          className={
            (showSeeResult ? "w-100" : "") +
            " d-flex flex-column justify-content-center align-items-center"
          }
        >
          <div className={(showSeeResult ? "fs-5" : "") + " mb-2 m-0 p-0"}>
            <span className={showSeeResult ? "fs-5" : ""}>تعداد پاسخ : </span>
            {questions?.length}/{answerSheet?.length}
          </div>
          <div className={(showSeeResult ? "fs-5" : "") + " m-0 p-0"}>
            <span className={showSeeResult ? "fs-5" : ""}>تعداد صحیح : </span>
            {questions?.length}/{trueAnswers}
          </div>
        </div>
      </div>
      {!showSeeResult && (
        <Swiper
          allowSlideNext={allowSwipe}
          allowSlidePrev={false}
          onSwiper={set_swipe}
          navigation
        >
          {questions?.length > 0 &&
            questions?.map((it) => (
              <SwiperSlide key={it.qustionId}>
                <VocabQuestionsItem
                  {...it}
                  handleSlideToNext={handleSlideToNext}
                  handleIncrementTrueAnswers={handleIncrementTrueAnswers}
                  set_showNextButton={set_showNextButton}
                  handle_addToAnswerSheet={handle_addToAnswerSheet}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {/* {showSeeResult && <div className="see-result">correct answers : {}</div>} */}
      <div className="m-0 p-0 mb-auto">
        {answerSheet?.length !== questions?.length &&
        !showSeeResult &&
        showNextButton ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSlideToNext}
          >
            سوال بعد
          </Button>
        ) : (
          <div style={{ width: "57px", height: "38px" }}></div>
        )}
        {answerSheet?.length === questions.length && showSeeResultButton && (
          <Button variant="contained" color="primary" onClick={handleSeeResult}>
            مشاهده نتیجه
          </Button>
        )}
        {showBackToSessionButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToSession}
          >
            بازگشت به جلسه
          </Button>
        )}
      </div>
    </section>
  );
};

export default SeeVocabsQuestions;
