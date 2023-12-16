import React, { useState, useEffect, useMemo, useRef } from "react";
import QuestionContainer from "./question.container";
import { useLocation, useNavigate } from "react-router";
import { Button, Drawer } from "@mui/material";
import Countdown from "react-countdown";
import { exam_apiCalls, session_apiCalls } from "../../core/services/agent";
import { apiCaller } from "../../core/custom-hooks/useApi";
import {
  useClassRoomStateContext,
  useClassRoomSetStateContext,
} from "../../core/contexts/classRoom/classRoom";
import QuestionsNavModal from "./components/questionsNavModal/questionsNavModal.component";
import ClassRoomBreadCrumb from "../breadCrumbs/classRoomBreadCrumb/classRoomBreadCrumb.component";
import {
  convertFullDateAndTime,
  convertTimeSpan,
} from "../../core/utils/utils";
import Toolbar from "../toolbar/toolbar.component";
import { useLoadingContext } from "../../core/contexts/loading/loading";

const QuestionsIterator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classRoomInfo, sessionLearningData } = useClassRoomStateContext();
  const { set_sessionLearningData } = useClassRoomSetStateContext();
  const [questions, set_questions] = useState([]);
  const [curentQuestion, set_curentQuestion] = useState();

  const [baseAnsweringType, set_baseAnsweringType] = useState();
  const [typeId, set_typeId] = useState();
  const [pageDataOnFinishQuestions, set_pageDataOnFinishQuestions] = useState();
  const [finish, set_finish] = useState(false);
  const [lessonId, set_lessonId] = useState();
  const [learningId, set_learningId] = useState();
  const [responseTime, set_responseTime] = useState();
  const [examFinishState, set_examFinishState] = useState();

  useEffect(() => {
    if (sessionLearningData?.questions?.length > 0) {
      set_questions(sessionLearningData?.questions);
      set_learningId(sessionLearningData?.learningId);
      set_curentQuestion(sessionLearningData?.questions[0]);
      set_baseAnsweringType(sessionLearningData?.baseAnsweringType);
      if (sessionLearningData?.baseAnsweringType === 3) {
        set_responseTime(sessionLearningData?.responseTime);
      }
      set_typeId(sessionLearningData?.typeId);
      set_pageDataOnFinishQuestions(
        sessionLearningData?.pageDataOnFinishQuestions
      );
      set_lessonId(sessionLearningData?.pageDataOnFinishQuestions?.lessonId);
    } else {
      navigate(-1);
    }
  }, [
    sessionLearningData?.questions,
    sessionLearningData?.typeId,
    sessionLearningData?.baseAnsweringType,
    sessionLearningData?.pageDataOnFinishQuestions,
  ]);

  const gotoNextQuestion = async (didUserAnswerdRight) => {
    const index = questions.findIndex(
      (item) =>
        item?.id === curentQuestion.id &&
        item?.questionType === curentQuestion.questionType
    );

    // if user answerd right => set it is answered right

    if (
      curentQuestion.isCorrect !== didUserAnswerdRight ||
      questions[index].tryCounter === 0
    ) {
      const cloneQuestions = JSON.parse(JSON.stringify(questions));
      cloneQuestions[index].isCorrect = didUserAnswerdRight;
      if (cloneQuestions[index].tryCounter === 0) {
        cloneQuestions[index].tryCounter = 1;
      }
      set_questions(cloneQuestions);
    }

    // handle goto next question
    if (index < questions?.length - 1) {
      if (curentQuestion?.questionType === 3) {
        set_curentQuestion(null);
        setTimeout(() => {
          set_curentQuestion(questions[index + 1]);
        }, 500);
      } else {
        set_curentQuestion(null);
        setTimeout(() => {
          set_curentQuestion(questions[index + 1]);
        }, 400);
      }
    } else {
      if (baseAnsweringType === 3) {
        set_compeleted(true);
        await handle_finishExam();
        set_finish(true);
        return;
      } else if (baseAnsweringType === 0) {
        const { data, status } = await apiCaller({
          api: session_apiCalls.apiCall_completelearning,
          apiArguments: {
            classroomId: classRoomInfo?.classroomId,
            learningId: learningId,
          },
          toastMessage: false,
        });
      } else if (baseAnsweringType === 1) {
        await apiCaller({
          api: session_apiCalls.apiCall_completeSessionpart,
          apiArguments: {
            classroomId: classRoomInfo?.classroomId,
            sessionPartId: typeId,
            percent: 0,
          },
          toastMessage: false,
        });
      }
      // set_finish(true);
      handleBackToSessionLearning();
    }
  };

  const answerSheetCorrection = ({
    mixedAnswers,
    contentType,
    answeringType,
  }) => {
    const currentQuestionClone = JSON.parse(JSON.stringify(curentQuestion));
    ///////////////////////
    if (
      currentQuestionClone?.questionType === 1 ||
      currentQuestionClone?.questionType === 0
    ) {
      const newData = currentQuestionClone?.data?.data.map((item, index) => {
        const mixedBody = {
          userAnswerBody: null,
          correctAnswerBody: null,
          isRight: false,
        };

        const emptyFields = item.body.split("##").length;

        if (emptyFields === 3) {
          // console.log(mixedAnswers[index].userAnswer.options);
          // console.log(mixedAnswers[index].correctAnswer.options);
        }
        if (contentType === 0) {
          if (emptyFields === 1) {
            mixedBody.userAnswerBody = item.body;
            mixedBody.isRight = null;
          } else {
            //////////////////////////////////////////////////
            //////////////////////////////////////////////////
            let questionBody = item.body;
            if (item.body?.includes("\r\n")) {
              for (let i = 0; i < item.body?.split("\r\n")?.length - 1; i++) {
                questionBody = questionBody.replace("\r\n", "<br />");
              }
            }
            //////////////////////////////////////////////////
            //////////////////////////////////////////////////

            let uab = questionBody;
            let cab = questionBody;
            for (let i = 0; i < emptyFields - 1; i++) {
              uab = uab.replace(
                "##",
                mixedAnswers[index].userAnswer.options[i]
              );
              cab = cab.replace(
                "##",
                mixedAnswers[index].correctAnswer.options[i]
              );
            }
            // if (currentQuestionClone?.data?.answeringType === 2) {
            //   uab = uab.toLowerCase();
            //   cab = cab.toLowerCase();
            // }
            mixedBody.userAnswerBody = uab;
            mixedBody.correctAnswerBody = cab;
            mixedBody.isRight = uab.toLowerCase() === cab.toLowerCase();
          }
        } else {
          mixedBody.isRight =
            mixedAnswers[index].userAnswer.options[0].toLowerCase() ===
            mixedAnswers[index].correctAnswer.options[0].toLowerCase();
          mixedBody.userAnswerBody = mixedAnswers[index].userAnswer.options[0];
          mixedBody.correctAnswerBody =
            mixedAnswers[index].correctAnswer.options[0];
          mixedBody.body = item.body;
        }

        return mixedBody;
      });

      currentQuestionClone.data.mixedAnswers = newData;
    }
    if (currentQuestionClone?.questionType === 3) {
      const newData = {
        userAnswers: mixedAnswers?.userAnswer,
        correctAnswers: mixedAnswers?.correctAnswer,
        allOptions: currentQuestionClone?.data?.options,
      };

      currentQuestionClone.data.mixedAnswers = newData;
    }
    if (currentQuestionClone?.questionType === 4) {
      const newData = {
        userAnswers: mixedAnswers?.userAnswer,
        correctAnswers: mixedAnswers?.correctAnswer,
      };

      currentQuestionClone.data.mixedAnswers = newData;
    }

    set_curentQuestion(currentQuestionClone);
  };

  const handleBackToSessionLearning = () => {
    if (baseAnsweringType === 0) {
      let pgdata = JSON.parse(JSON.stringify(pageDataOnFinishQuestions));
      const lessons = pageDataOnFinishQuestions.data.sessionLearningData;
      const index = lessons.findIndex((item) => item.id === lessonId);

      /////// یک فلگ برای آخرین ویدیو بزارم که توی صفحه سشن لرنینگ که برمیگردم
      /////// بدونم که آخرین ویدیو تازه آنلاک شده و ویدیوش رو کاربر هنوز ندیده و باید ببینه

      ///////
      if (
        index === lessons?.length - 2 &&
        lessons[index + 1].isLocked === true
      ) {
        lessons[index + 1].hasNotSeenLessonVideoYet = true;
      }

      ///////////
      if (index < lessons?.length - 1) {
        lessons[index + 1].isLocked = false;
      }
      //////////
      pgdata.data.sessionLearningData = lessons;
      pgdata.data.questions = sessionLearningData?.questions;
      pgdata.data.baseAnsweringType = sessionLearningData?.baseAnsweringType;

      set_sessionLearningData({ ...pgdata.data });
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  const slideTo = (index) => {
    if (
      index ===
      questions.findIndex(
        (item) =>
          item?.id === curentQuestion.id &&
          item?.questionType === curentQuestion.questionType
      )
    )
      return;
    if (curentQuestion?.questionType === 3) {
      set_curentQuestion(null);
      setTimeout(() => {
        set_curentQuestion(questions[index]);
      }, 500);
    } else {
      set_curentQuestion(null);
      setTimeout(() => {
        set_curentQuestion(questions[index]);
      }, 400);
    }
  };

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

  const handle_finishExam = async () => {
    const { data, status } = await apiCaller({
      api: exam_apiCalls.apiCall_finishExam,
      apiArguments: typeId,
      onErrorMessage:
        "اتمام آزمون با خطا مواجه شد . لطفا مجددا دکمه اتمام را بفشارید .",
      onSuccess: ({ data }) => {
        set_examFinishState(data?.data);
      },
    });
  };

  const handleAnswerAgain = async () => {
    const currentAnswerIndex = questions.findIndex(
      (item) =>
        item?.id === curentQuestion.id &&
        item?.questionType === curentQuestion.questionType
    );
    set_curentQuestion(null);
    setTimeout(() => {
      set_curentQuestion(questions[currentAnswerIndex]);
    }, 400);
  };

  const { handleOpen, handleClose } = useLoadingContext();
  const restartExam = async () => {
    handleOpen();
    apiCaller({
      api: exam_apiCalls.apiCall_startExam,
      apiArguments: sessionLearningData?.typeId,
      onErrorMessage: "شروع آزمون با خطا مواجه شد .",
      onSuccess: () => {
        if (sessionLearningData?.questions?.length > 0) {
          set_questions(undefined);
          set_curentQuestion(undefined);
          set_finish(false);
          set_examFinishState(undefined);
          set_compeleted(false);
          set_responseTime(undefined);
          setTimeout(() => {
            set_questions(sessionLearningData?.questions);
            set_curentQuestion(sessionLearningData?.questions[0]);
            set_responseTime(sessionLearningData?.responseTime);
          }, 200);
        } else {
          navigate(-1);
        }
      },
      onEnd: () => {
        handleClose();
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "300px",
      }}
      className="questions-wrapper m-0 p-0 "
    >
      {!finish && (
        <div
          id="questions-counter"
          className=" p-3 d-flex flex-row justify-content-between align-items-center"
        >
          <QuestionsNavModal
            questions={questions}
            currentQuestion={curentQuestion}
            slideTo={slideTo}
          />

          <ClassRoomBreadCrumb />
          <Toolbar question={curentQuestion} isVocab={false} isBookmark={false} />
        </div>
      )}
      <div className="m-0 my-1 px-3 p-0">
        {responseTime && !compeleted && renderCountDownWithMemo}
      </div>
      {!finish && curentQuestion && (
        <>
          <button
            id="answer-again-btn"
            onClick={handleAnswerAgain}
            className="d-none"
          ></button>
          <QuestionContainer
            answerSheetCorrection={answerSheetCorrection}
            typeId={typeId}
            baseAnsweringType={baseAnsweringType}
            gotoNextQuestion={gotoNextQuestion}
            isLastQuestion={
              questions.findIndex(
                (item) =>
                  item?.id === curentQuestion.id &&
                  item?.questionType === curentQuestion.questionType
              ) ===
              questions?.length - 1
            }
            {...curentQuestion}
          />
        </>
      )}
      {finish && (
        <div className="p-3 h-100 d-flex flex-column justify-content-start align-items-start">
          {baseAnsweringType === 3 && (
            <>
              <div className="m-0 p-0 mb-3 d-flex flex-row justify-content-start align-items-start">
                <span className="me-2"> وضعیت قبولی : </span>
                <span
                  className={
                    (examFinishState?.isQualified
                      ? "text-center"
                      : "text-danger") + " me-2"
                  }
                >
                  {" "}
                  {examFinishState?.isQualified === false ? "رد" : "قبول"}{" "}
                </span>
              </div>
              <div className="m-0 p-0 mb-3 d-flex flex-row justify-content-start align-items-start">
                <span className="me-2"> امتیاز : </span>
                <span className="me-2"> {examFinishState?.score} درصد</span>
              </div>
              <div className="m-0 p-0 mb-3 d-flex flex-row justify-content-start align-items-start">
                <span className="me-2"> مدت زمان پاسخگویی : </span>
                <span className="me-2">
                  {" "}
                  {/* {examFinishState.responseTime?.includes(".")
                    ? examFinishState?.responseTime?.split(".")[0]
                    : examFinishState?.responseTime}{" "} */}
                  {convertTimeSpan(examFinishState?.responseTime, 0)}
                </span>
              </div>
              <div className="m-0 p-0 mb-3 d-flex flex-row justify-content-start align-items-start">
                <span className="me-2"> تاریخ شروع آزمون : </span>
                <span className="me-2">
                  {" "}
                  {convertFullDateAndTime(examFinishState?.start)}{" "}
                </span>
              </div>
              <div className="m-0 p-0 mb-3 d-flex flex-row justify-content-start align-items-start">
                <span className="me-2"> تاریخ پایان آزمون : </span>
                <span className="me-2">
                  {" "}
                  {convertFullDateAndTime(examFinishState?.finished)}{" "}
                </span>
              </div>
            </>
          )}
          {examFinishState?.isQualified === false ? (
            <p className="fs-6 my-3 text-justify">
              لرنستی عزیز ، متاسفانه شما موفق نشدین که نمره ی قبولی ازمون پایان
              این‌ دوره رو کسب کنید . ولی مجددا میتونین تو ازمون شرکت کنید و یه
              بار دیگه معلومات خودتون رو بسنحید. البته پیشنهاد تیم‌ اموزشی لرنست
              اینه که قبل از امتحان‌ مجدد یک بار دیگه تمام جلسات اموزشی این دوره
              رو مشاهده و نکات اموزشیشو مرور کنید و سپس تو امتحان پایان دوره .
              شرکت کنید .
            </p>
          ) : (
            <p className="fs-6 p-0 my-3  text-justify">
              از طرف تیم اموزشی مجموعه به شما لرنستی عزیز تبریک میگیم که تونستین
              این دوره ی اموزشی رو با موفقیت به پایان برسونین ، تمام جلسات این
              لول برای شما باز خواهند موند که برای مرور مطالبی که فراگرفتین
              مجددا بتونین جلسات رو مشاهده کنید. لول بعدی الان برای شما باز شده
              و میتونین ثبت نام اون دوره رو انجام بدین.
            </p>
          )}

          <div className="m-0 p-0 gap-2 mt-3 d-flex flex-row justify-content-start align-items-stretch w-100">
            {examFinishState?.isQualified === false && (
              <Button
                onClick={restartExam}
                variant="contained"
                color="primary"
                className="flex-grow-1"
              >
                آزمون مجدد
              </Button>
            )}
            <Button
              className=" align-self-center flex-grow-1"
              variant="contained"
              color="primary"
              onClick={handleBackToSessionLearning}
            >
              {baseAnsweringType === 0 && "بازگشت به آموزش"}
              {baseAnsweringType === 1 && "بازگشت به جلسه"}
              {baseAnsweringType === 2 && "بازگشت به سرگرمی"}
              {baseAnsweringType === 3 && "بازگشت به دوره"}
            </Button>
          </div>
        </div>
      )}

      <div
        style={{ height: "70px", color: "transparent" }}
        className="noselect"
      >
        dasdasdasdasd
      </div>
    </div>
  );
};

export default QuestionsIterator;
