import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import CourseVideoItem from "./sessionLearninigSlideItem.component";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Button, Skeleton } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import {
  useClassRoomSetStateContext,
  useClassRoomStateContext,
} from "../../../core/contexts/classRoom/classRoom";
import LockIcon from "@mui/icons-material/Lock";
import ClassRoomBreadCrumb from "../../../components/breadCrumbs/classRoomBreadCrumb/classRoomBreadCrumb.component";
import { useClassRoomActions } from "../../../core/contexts/classRoom/classRoom";
import { useWindowDimensions } from "../../../core/custom-hooks/getWindowDimensions";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CourseVideoEducation = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();

  const { breadCrumbActions } = useClassRoomActions();
  const { set_sessionLearningData } = useClassRoomSetStateContext();
  const { sessionLearningData } = useClassRoomStateContext();

  const [sessionLessons, set_sessionLessons] = useState([]);
  const [currentLesson, set_currentLesson] = useState(null);
  const [currentLessonIndex, set_currentLessonIndex] = useState(0);
  const [typeId, set_typeId] = useState();
  const [pageDataOnFinishQuestions, set_pageDataOnFinishQuestions] = useState();
  const [showConfetti, set_showConfetti] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowConfetti = () => {
    set_showConfetti(true);
    setTimeout(() => {
      set_showConfetti(false);
    }, 6000);
  };
  useEffect(() => {

    console.log('start')

    if (sessionLearningData?.sessionLearningData) {
      console.log('success')
      set_pageDataOnFinishQuestions(sessionLearningData);
      set_sessionLessons(sessionLearningData?.sessionLearningData);
      set_typeId(sessionLearningData?.sessionId);
      // make decision

      let allAreUnocked = false;
      const unLockedLessons = sessionLearningData?.sessionLearningData.filter(
        (item) => !item.isLocked
      );

      if (
        unLockedLessons?.length ===
        sessionLearningData?.sessionLearningData?.length
      ) {
        ///////
        //Check "HasNotSeenLessonVideoYet" Flag If Current Lesson Is Last Lesson
        ///////
        if (
          sessionLearningData?.sessionLearningData[
            sessionLearningData?.sessionLearningData?.length - 1
          ]?.hasNotSeenLessonVideoYet === true
        ) {
          allAreUnocked = false;
        } else {
          if (
            sessionLearningData?.sessionLearningData[
              sessionLearningData?.sessionLearningData?.length - 1
            ]?.hasOwnProperty("hasNotSeenLessonVideoYet")
          ) {
            handleShowConfetti();
            toast.success(
              <div className="text-wrap">
                شما آموزش های این جلسه را با موفقیت به اتمام رسانده اید.
              </div>
            );
          }
          allAreUnocked = true;
        }
      }
      ///////
      if (allAreUnocked) {
        set_currentLesson(sessionLearningData?.sessionLearningData[0]);
        set_currentLessonIndex(0);
      } else {
        const lastUnlocked = unLockedLessons[unLockedLessons.length - 1];
        set_currentLesson(lastUnlocked);
        set_currentLessonIndex(unLockedLessons.length - 1);
      }
      ///////
    } else {
      console.log('error')
     
       navigate(-1);
    }
  }, [sessionLearningData]);

  const slideNext = () => {
    // const index = sessionLessons.findIndex(
    //   (item) => item?.id === currentLesson.id
    // );

      
      console.log('sessionLessons[currentLessonIndex + 1]',sessionLessons[currentLessonIndex + 1])
    if (currentLessonIndex < sessionLessons?.length - 1) {
      if (sessionLessons[currentLessonIndex + 1]?.isLocked) {
        handleSeeQuestion();
      } else {
        set_currentLessonIndex(currentLessonIndex + 1);
        set_currentLesson(null);
        setTimeout(() => {
          set_currentLesson(sessionLessons[currentLessonIndex + 1]);
        }, 200);
      }
    }
  };

  const slidePerv = () => {
    // const index = sessionLessons.indexOf(currentLesson);
    if (currentLessonIndex > 0) {
      set_currentLessonIndex(currentLessonIndex - 1);
      set_currentLesson(null);
      setTimeout(() => {
        set_currentLesson(sessionLessons[currentLessonIndex - 1]);
      }, 200);
    }
  };

  const gotoToSlide = (index) => {
    // const indx = sessionLessons.findIndex(
    //   (item) => item?.id === currentLesson.id
    // );
    if (index > currentLessonIndex) {
      if (sessionLessons[index]?.isLocked) {
        handleSeeQuestion();
        return;
      }
    }
    if (index <= sessionLessons?.length - 1) {
      set_currentLessonIndex(index);
      set_currentLesson(null);
      setTimeout(() => {
        set_currentLesson(sessionLessons[index]);
      }, 200);
      handleClose();
    }
  };

  const handleSeeQuestion = () => {
    // toast.error(<div className="text-wrap">{' قسمت  بعدی برای شما قابلیت دسترسی  ندارد'}</div>);
    breadCrumbActions.set_breadCrumb_questions({
      title: "سوالات",
      link: "/question-engine",
    });
    if(currentLesson?.questions.length ==0)
    {
      toast.error(<div className="text-wrap">{'داده ای برای نمایش وجود ندارد.با پشتیبانی تماس بگیرید.'}</div>);
    }
    set_sessionLearningData({
      questions: currentLesson?.questions,
      typeId: typeId,
      learningId: currentLesson?.id,
      baseAnsweringType: 0,
      pageDataOnFinishQuestions: {
        path: "/session-learning",
        lessonId: currentLesson?.id,
        data: pageDataOnFinishQuestions,
      },
    });
    navigate("/question-engine");

   
  };

  const activeLesson = {
    data: currentLesson,
    isLastItem: currentLessonIndex === sessionLessons?.length - 1,
    isFirstItem: currentLessonIndex === 0,
    index: currentLessonIndex,
  };

  return (
    <div className="p-3 flex-grow-1 d-flex flex-column justify-content0start align-items-stretch">
      {showConfetti && (
        <Confetti recycle={false} width={width} height={height} />
      )}
      <div className="d-flex flex-row justify-content-between align-items-center">
        <Button
          style={{
            minWidth: "0px",
          }}
          color="primary"
          className="items-counter fs-6 ps-0"
          onClick={handleClickOpen}
        >
          {sessionLessons?.length > 0 &&
            currentLessonIndex + 1 + "/" + (sessionLessons?.length || 0)}
        </Button>
        <ClassRoomBreadCrumb />
      </div>
      <div className="mt-3 d-flex flex-column justify-content-start align-items-stretch">
        {currentLesson ? (
          <CourseVideoItem
            handleSeeQuestion={handleSeeQuestion}
            data={{
              ...currentLesson,
              typeId: typeId,
            }}
            allLessons={sessionLessons}
            index={currentLessonIndex}
            handleShowConfetti={handleShowConfetti}
          >
            <div className="navigate-bar mt-2 m-0 p-0 d-flex flex-row justify-content-between align-items-cneter">
              <div style={{ width: "72px" }}>
                {!activeLesson.isLastItem && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={slideNext}
                  >
                    <NavigateNext />
                  </Button>
                )}
              </div>
              {currentLesson?.title && (
                <div className="m-0 mt-3 p-0 ">{currentLesson?.title}</div>
              )}
              <div style={{ width: "72px" }}>
                {!activeLesson.isFirstItem && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={slidePerv}
                  >
                    <NavigateBefore />
                  </Button>
                )}
              </div>
            </div>
          </CourseVideoItem>
        ) : (
          <Skeleton
            variant="rectangular"
            width={width * 0.9518}
            height={height * 0.4499}
          />
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <div
          style={{
            maxWidth: "450px",
            minWidth: "300px",
          }}
          dir="rtl  "
          className=" p-3 d-flex flex-column justify-content-start align-items-stretch"
        >
          {sessionLessons?.length > 0 &&
            sessionLessons?.map((item, index) => (
              <Button
                style={{
                  borderWidth: currentLesson?.id === item?.id ? "3px" : "1px",
                }}
                key={item?.id}
                className="my-2 d-flex flex-row justify-content-between align-items-center"
                variant="outlined"
                color="primary"
                onClick={() => {
                  gotoToSlide(index);
                }}
              >
                <span className="m-0 p-0 d-flex flex-row justify-content-start align-items-center">
                  {item?.isLocked && <LockIcon color="primary" />}
                  {!item?.isLocked && <LockOpenIcon color="primary" />}
                  <span className="ms-2">{item?.title}</span>
                </span>
                <span>{`${index + 1}/${sessionLessons?.length}`}</span>
              </Button>
            ))}
        </div>
      </Dialog>
    </div>
  );
};

export default CourseVideoEducation;
