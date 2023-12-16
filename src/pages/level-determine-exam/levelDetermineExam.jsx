import React, { useState, useEffect, useMemo, useRef } from "react";
import queryString from "query-string";
import Countdown from "react-countdown";
import Button from "@mui/material/Button";
import { placement_apiCalls } from "../../core/services/agent";
import Skeleton from "@mui/material/Skeleton";
import "./styles/styles.scss";
import { toast } from "react-toastify";

import parse from "html-react-parser";
import { useNavigate } from "react-router";
import LevelDetermineDescription from "../level-determine/levelDetermineDescription.component";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { useUserProfileActions } from "../../core/contexts/profile/profileProvider";
import { convertTimeSpan, toFixedIfIsFloat } from "../../core/utils/utils";

const LevelDetermineExam = (props) => {
  const { handleOpen, handleClose } = useLoadingContext();
  const [examId, set_examId] = useState(null);

  const [allQuestionsNumber, set_allQuestionsNumber] = useState(null);
  const [currentQuestion, set_currentQuestion] = useState(1);
  const [responseTime, set_responseTime] = useState(null);
  const [examFinished, set_examFinished] = useState(false);
  const [questions, set_questions] = useState([]);
  const [answerSheet, set_answerSheet] = useState([]);

  const handle_selectAnswer = (e) => {
    const id = e.target.id;

    const parts = id.split("__");
    const qid = parts[0].split("_")[1];
    const aid = parts[1].split("_")[1];

    const newAnswer = { questionId: qid, answerId: aid };
    set_answerSheet([...answerSheet, newAnswer]);

    // goto next question
    set_showNextButton(true);
  };

  const getPlacementTestDetails = async () => {
    handleOpen();
    await placement_apiCalls
      .apiCall_startExam(queryString.parse(window.location.search).id)
      .then((resp) => {
        if (resp.status === 200) {
          set_responseTime(resp.data.data.responseTime);
          set_examId(resp.data.data.id);
          set_questions(resp.data.data.questions);
          set_allQuestionsNumber(resp.data.data.questions.length);
        }
      })
      .catch((ex) => {
        toast.error("دریافت اطلاعات آزمون با خطا مواجه شد .");
      })
      .finally(() => {
        handleClose();
      });
  };
  useEffect(() => {
    if (queryString.parse(window.location.search).id !== "description") {
      getPlacementTestDetails();
      set_currentQuestion(1);
      set_examFinishState(null);
      set_examFinished(false);
      set_answerSheet([]);
    }
  }, [window.location.search]);

  /////////////////// COUNT DOWN CODES : start ////////////////////////
  const countdownRef = useRef();
  const [compeleted, set_compeleted] = useState();

  const handleCountDownCompeleted = () => {
    set_compeleted(true);
    handle_finishExam();
    //blss
  };

  const renderer = ({ hours, minutes, seconds, completed, ...rest }) => {
    if (completed) {
      return "";
    } else {
      // Render a countdown
      return (
        <span className="m-0 my-3 p-0 fs-6 fw-bold align-self-center">
          {(minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)}
        </span>
      );
    }
  };

  const renderCountDownWithMemo = useMemo(
    () => (
      <Countdown
        onComplete={handleCountDownCompeleted}
        ref={countdownRef}
        date={Date.now() + parseInt(responseTime) * 60000}
        renderer={renderer}
      />
    ),
    [compeleted, responseTime]
  );

  /////////////////// COUNT DOWN CODES : end ////////////////////////

  const [showNextButton, set_showNextButton] = useState(false);

  const handle_showNextQuestion = () => {
    if (currentQuestion - 1 < allQuestionsNumber - 1) {
      set_currentQuestion(currentQuestion + 1);
    } else {
      handle_finishExam();
    }

    set_showNextButton(false);
  };

  ////////////////// FINISH EXAM CODES : START ////////////////////////

  const navigate = useNavigate();
  const { getProfileData } = useUserProfileActions();

  const [examFinishState, set_examFinishState] = useState({
    testResultPercent: null,
    totalAnsweredQuestions: null,
    responseTimeSpan: null,
    testStatus: null,
    testStatusString: null,
    description: null,
    currentLevel: {
      id: null,
      title: null,
      scores: null,
    },
    nextLevelId: null,
  });

  const onExamSuccessfull = () => {
    getProfileData();
  };

  const handle_finishExam = async () => {
    set_examFinished(true);

    await placement_apiCalls
      .apiCall_finishExam({ PlacementTestId: examId, Answers: answerSheet })
      .then((resp) => {
        if (resp.status === 200) {
          set_examFinishState(resp.data.data);
          if (resp.data.data.testStatus === 2) {
            onExamSuccessfull();
          }
        }
      })
      .then((ex) => {
        // console.log(ex);
      });
  };

  ////////////////// FINISH EXAM CODES : END ////////////////////////

  ///// Restart Exam
  const restartExam = async () => {
    set_compeleted(false);
    await getPlacementTestDetails();
    set_answerSheet([]);
    set_currentQuestion(1);
    set_examFinishState(null);
    set_examFinished(false);
  };

  const handleBackToMainPage = () => {
    navigate(-2);
  };

  return (
    <section className="m-0 p-3 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
      {!examFinished &&
        queryString.parse(window.location.search).id !== "description" && (
          <>
            <div className="exam-status m-0 mb-3 p-0 d-flex flex-row justify-content-between align-items-center">
              <span className="remain-time">
                {responseTime && renderCountDownWithMemo}
                {!responseTime && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={60}
                    height={20}
                  />
                )}
              </span>
              <span className="answered-questions">
                {allQuestionsNumber ? (
                  `${currentQuestion}/${allQuestionsNumber}`
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={60}
                    height={20}
                  />
                )}
              </span>
            </div>
            <div className="question-holder">
              {questions?.length > 0 &&
                questions.map((item, index) => (
                  <div
                    dir="ltr"
                    key={item?.id}
                    className={
                      (index === currentQuestion - 1 ? "d-flex" : "d-none") +
                      " question-item d-flex flex-column justify-content-start align-items-stretch"
                    }
                  >
                    {/* <div dir="rtl" className="question-title fw-bold fs-6">
                      {item?.title}
                    </div> */}
                    <LevelDetermineDescription
                      title={item?.title}
                      onClick={() => {}}
                    />
                    <div
                      dir="auto"
                      className="current-question bold-large mt-3 direction-auto"
                    >
                      {parse(
                        item?.content
                          ?.toString()
                          ?.replaceAll("<p>", '<p dir="auto">')
                      )}
                    </div>
                    <div className="current-answers d-flex flex-column justify-content-start align-items-stretch">
                      {item.answers.map((item_answer, index1) => (
                        <label
                          htmlFor={
                            "questionId_" +
                            item.id +
                            "__answerId_" +
                            item_answer.id
                          }
                          className="m-0 p-0 mt-2 cursor-pointer d-flex flex-row justify-content-start align-items-center"
                        >
                          <span className="ms-1 fs-6">{index1 + 1 + "-"}</span>
                          <input
                            onChange={handle_selectAnswer}
                            type="radio"
                            name={currentQuestion + "_answer"}
                            id={
                              "questionId_" +
                              item.id +
                              "__answerId_" +
                              item_answer.id
                            }
                            className="ms-2"
                          />
                          <span dir="ltr" className="noselect">
                            {item_answer.content}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              {questions?.length === 0 && (
                <div className="d-flex flex-column justify-content-start align-items-center">
                  <div className="align-self-stretch">
                    <LevelDetermineDescription onClick={() => {}}>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={250}
                        height={20}
                      />
                    </LevelDetermineDescription>
                  </div>
                  <div className="ms-auto my-2">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={250}
                      height={20}
                    />
                  </div>

                  <div className="ms-auto my-2">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={150}
                      height={20}
                    />
                  </div>
                  <div className="ms-auto my-2">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={150}
                      height={20}
                    />
                  </div>
                  <div className="ms-auto my-2">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={150}
                      height={20}
                    />
                  </div>
                  <div className="ms-auto my-2">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={150}
                      height={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      {examFinished &&
        queryString.parse(window.location.search).id !== "description" && (
          <div className="exam-finished d-flex flex-column justify-content-start align-items-stretch">
            {examFinishState && (
              <>
                <span className="my-2">{` امتیاز : ${examFinishState?.testResultPercent} درصد`}</span>
                <span className="my-2">{` زمان آزمون : ${convertTimeSpan(
                  examFinishState?.responseTimeSpan,
                  0
                )}`}</span>

                <span className="my-2">{` وضعیت آزمون : ${examFinishState?.testStatusString}`}</span>
                <div
                  className="m-0 p-0 my-3"
                  dangerouslySetInnerHTML={{
                    __html: examFinishState.description,
                  }}
                ></div>
                {examFinishState?.testStatus === 3 && (
                  <>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                      <Button variant="contained" onClick={restartExam}>
                        آزمون مجدد
                      </Button>
                      <Button
                        className="mx-2"
                        variant="outlined"
                        onClick={handleBackToMainPage}
                      >
                        بازگشت به صفحه اصلی
                      </Button>
                    </div>
                  </>
                )}
                {examFinishState?.testStatus !== 3 && (
                  <>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(
                            "/level-determine-exam?id=" +
                              examFinishState?.nextLevelId,
                            { replace: true }
                          );
                          set_compeleted(true);
                        }}
                      >
                        آزمون مرحله بعدی
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      {queryString.parse(window.location.search).id !== "description" && (
        <div className="tap-next-question-holder d-flex flex-row justify-content-center align-items-center mt-5 my-3">
          {showNextButton && (
            <Button
              variant="outlined"
              onClick={handle_showNextQuestion}
              className="show-next"
            >
              {currentQuestion === allQuestionsNumber
                ? "اتمام آزمون"
                : "مشاهده بعدی"}
            </Button>
          )}
        </div>
      )}
      {queryString.parse(window.location.search).id === "description" && (
        <p>
          سلام زبان اموز عزیز، به لرنست خوش آمدی. برای اینکه بدونی در چه سطحی از
          زبان هستی، بهتره که امتحانات تعیین سطح ما رو شرکت کنی.امتحانا از سطح
          اول شروع میشن و هر امتحانی که قبول بشی امتحان سطح بعدی برات باز میشه
          که اگه فکر میکنی که سطح زبانت بالاتر از اون لولی که قبول شدی هست بتونی
          تو امتحان سطح بعدی هم شرکت کنی و از این راه  سطح واقعی خودتو بسنجی.
          امتحانا هم‌ به این صورت هست که شامل یه تعدادی سوال چند گزینه ای میشه
          که تو زمانی که اول هر ازمون بهت گفته میشه باید اونا رو جواب بدی و در
          صورتی که به حد نصاب قبولی رسیدی، امتحان تعیین سطح بعدی و همچنین تو
          قسمت دوره های اپلیکیشن لول مرتبط با اون سطح و لول های سطح های پایینترش
          برات باز میشن و میتونی هر کدوم از لول های باز شده رو که خواستی ثبت نام
          کنی. البته پیشنهاد اساتید لرنست بهت اینه که از لول اول و استارتر ، که
          برای همه ی زبان اموز ها بدون امتحان تعیین سطح باز هست، شروع کنی که از
          همون اول و به صورت پایه ای از همه ی اموزش های لرنست بهره مند بشی. به
          امید موفقیت برای شما دوست لرنستی ما.
        </p>
      )}
    </section>
  );
};

export default LevelDetermineExam;
