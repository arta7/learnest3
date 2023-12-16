import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import parse from "html-react-parser";
import ReactPlayer from "react-player";

import { fileBaseUrl } from "../../../core/services/baseUrl";
import { Button } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { session_apiCalls } from "../../../core/services/agent";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import useVisibilityChange from "../../../core/custom-hooks/useVisibilityChange.hook";
import { toast } from "react-toastify";

const CourseVideoItem = ({
  children,
  data,
  allLessons,
  handleSeeQuestion,
  index,
  handleShowConfetti,
  ...rest
}) => {
  const navigate = useNavigate();
  const { handleOpen, handleClose } = useLoadingContext();
  const [
    lastVideo_CompleteSesionLearningApi_called,
    set__lastVideo_CompleteSesionLearningApi_called,
  ] = useState(false);
  const [videoEnded, set_videoEnded] = useState(false);
  const { classRoomInfo } = useClassRoomStateContext();
  const [lessonId, set_lessonId] = useState();
  const videoPlayerRef = useRef();
  const [playing, set_playing] = useState(false);

  useVisibilityChange({
    onHide: () => {
      videoPlayerRef?.current?.pause();
    },
  });

  const handleVideoEnded = () => {
    set_videoEnded(true);
    if (
      data.hasOwnProperty("hasNotSeenLessonVideoYet") &&
      data?.questions?.length === 0
    ) {
      handleShowConfetti();
      toast.success(
        <div className="text-wrap">
          شما آموزش های این جلسه را با موفقیت به اتمام رسانده اید.
        </div>
      );
    }
  };

  useEffect(() => {
    if (data.id !== lessonId) {
      set_videoEnded(false);
      set_lessonId(data.id);
    }
  }, [data]);

  const [completeLearningApiCalled, set_completeLearningApiCalled] =
    useState(false);
  const handleStart = async () => {
    if (data?.questions?.length === 0 && !completeLearningApiCalled) {
      set_completeLearningApiCalled(true);
      await apiCaller({
        api: session_apiCalls.apiCall_completelearning,
        apiArguments: {
          classroomId: classRoomInfo?.classroomId,
          learningId: data?.id,
        },
        toastMessage: false,
        onSuccess: (resp) => {
          if (
            parseInt(resp.data.status) === 1 &&
            allLessons?.findIndex((item) => item.id === data.id) ===
              allLessons?.length
          ) {
            set__lastVideo_CompleteSesionLearningApi_called(true);
          }
        },
      });
    }
  };

  const lastUnlockedVideoIndex = () => {
    let lastLockedLessonIndex = 0;
    for (let i = 0; i < allLessons?.length; i++) {
      if (!allLessons[i].isLocked) {
        lastLockedLessonIndex = i;
      } else {
        break;
      }
    }

    return lastLockedLessonIndex;
  };

  return (
    <div className="course-video-item m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div className="video-container flex-grow-1 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
        {data?.videoUrl && (
          <video
            ref={videoPlayerRef}
            controls
            width="100%"
            height={"auto"}
            muted={true}
            onEnded={handleVideoEnded}
            onPlay={handleStart}
          >
            <source src={fileBaseUrl + data?.videoUrl} />
          </video>
        )}
      </div>
      {children}
      {data?.content && (
        <div className="m-0 mt-3 p-0 mb-6 ">
          {parse(
            data?.content?.toString()?.replaceAll("<p>", '<p dir="auto">')
          )}
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          maxWidth: "800px",
          left: "0",
          right: "0",
        }}
        className=" mx-auto py-2 pb-3 p-0 d-flex flex-row justify-content-center align-items-center"
      >
        {data?.questions?.length > 0 &&
          (videoEnded ||
            (!data?.isLocked && index < lastUnlockedVideoIndex())) && (
            <Button
              className="fs-6"
              variant="contained"
              color="primary"
              onClick={handleSeeQuestion}
            >
              مشاهده سوالات
            </Button>
          )}
        {data?.questions?.length === 0 &&
          videoEnded &&
          lastVideo_CompleteSesionLearningApi_called && (
            <Button
              className="fs-6"
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              بازگشت به جلسه
            </Button>
          )}
      </div>
    </div>
  );
};

export default CourseVideoItem;
