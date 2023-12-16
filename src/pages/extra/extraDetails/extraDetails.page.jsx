import { parse } from "query-string";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { extraMediaTypeEnum } from "../../../core/enums";
import { extra_apiCalls } from "../../../core/services/agent";

import htmlParse from "html-react-parser";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import { fileBaseUrl, imagesBaseUrl } from "../../../core/services/baseUrl";

import {
  useClassRoomSetStateContext,
  useClassRoomStateContext,
} from "../../../core/contexts/classRoom/classRoom";
import ClassRoomBreadCrumb from "../../../components/breadCrumbs/classRoomBreadCrumb/classRoomBreadCrumb.component";
import { useClassRoomActions } from "../../../core/contexts/classRoom/classRoom";

import "./styles.scss";
import { Button } from "@mui/material";
import SubtitlePart from "./subtitlepart.component";
import { Skeleton } from "@mui/material";
import useVisibilityChange from "../../../core/custom-hooks/useVisibilityChange.hook";

const getStyles = () => {
  return {
    position: "fixed",
    bottom: "0",
    right: "0",
    left: "0",
    margin: "0 auto",
    width: "100%",
    maxWidth: "800px",
    zIndex: "10",
    boxShadow: "rgb(204 204 204) 0px -2px 5px 2px",
  };
};

const ExtraDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadCrumbActions } = useClassRoomActions();
  const { set_sessionLearningData } = useClassRoomSetStateContext();
  const { sessionLearningData } = useClassRoomStateContext();
  const [extraDetails, set_extraDetails] = useState();
  const [extraType, set_extraType] = useState("");

  const adiuoPlayerRef = useRef();
  const videoPlayerRef = useRef();

  useVisibilityChange({
    onHide: () => {
      if (videoPlayerRef?.current) videoPlayerRef?.current?.pause();
      if (adiuoPlayerRef?.current) adiuoPlayerRef?.current?.pause();
    },
  });

  useEffect(() => {
    const getData = async () => {
      await apiCaller({
        api: extra_apiCalls.apiCall_details,
        apiArguments: parse(window.location.search).id,
        onSuccess: (resp) => {
          set_extraDetails(resp.data.data);
        },
      });
    };
    if (parse(window.location.search)?.id) {
      getData();
    }
    if (location.state.extraType) {
      set_extraType(location.state.extraType);
    }
  }, [window.location.search]);

  const hasVideo = () => {
    if (
      extraDetails?.extraMediaType === 1 ||
      extraDetails?.extraMediaType === 3 ||
      extraDetails?.extraMediaType === 4
    ) {
      return true;
    }
    return false;
  };

  const handleSeeQuestion = () => {
    // extraLink, isQuestion
    breadCrumbActions.set_breadCrumb_extra({
      extraTitle: extraDetails?.title,
      extraMediaType: extraDetails?.extraMediaType,
      isQuestion: true,
      extraLink: "/question-engine",
      extraId: parse(window.location.search)?.id,
    });
    set_sessionLearningData({
      questions: extraDetails?.questions,
      typeId: parse(window.location.search)?.id,
      baseAnsweringType: 2,
      pageDataOnFinishQuestions: {
        path: "/extra-details",
        extraId: parse(window.location.search)?.id,
        data: null,
      },
    });
    navigate("/question-engine");
  };

  const handleSeeVocabs = () => {
    breadCrumbActions.set_breadCrumb_extra({
      extraTitle: extraDetails?.title,
      extraMediaType: extraDetails?.extraMediaType,
      isQuestion: false,
      extraLink: "/extra-details?id=" + parse(window.location.search)?.id,
      extraId: parse(window.location.search)?.id,
    });
    navigate("/vocabularies/" + parse(window.location.search)?.id, {
      state: {
        vocabs: extraDetails.vocabs,
        sessionId: parse(window.location.search)?.id,
      },
    });
  };

  // useLayoutEffect(() => {
  //   document.querySelector(".tiny-scrollbar").scrollTop =
  //     document.querySelector(".tiny-scrollbar").scrollHeight;
  // });
  // handle subtitle
  const [currentTime, set_currentTime] = useState(0);
  const handleProgressVideo = ({ playedSeconds }) => {
    set_currentTime(playedSeconds);
  };

  const handleListen = (e) => {
    set_currentTime(e.nativeEvent.target.currentTime);
  };
  const handleListenAudio = (playedSeconds) => {
    set_currentTime(playedSeconds);
  };

  const handleVideoProgress = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (videoPlayerRef?.current) {
      console.log(videoPlayerRef?.current);
    }
  }, [videoPlayerRef?.current]);

  useVisibilityChange({
    onHide: () => {
      // pause video
      const videoElement = document
        .getElementsByClassName("reactplayer-wrapper")?.[0]
        ?.getElementsByTagName("video")?.[0];

      if (videoElement) {
        videoElement.pause();
      }
      // pause audio
      const audioElement = document
        .getElementsByClassName("reactAudioPlayer-wrapper")?.[0]
        ?.getElementsByTagName("audio")?.[0];

      if (audioElement) {
        audioElement.pause();
      }
    },
  });

  //
  const getPageMarginBottom = () => {
    if (!hasVideo() && extraDetails?.mediaUrl) {
      return "";
    }
    return "mb-6";
  };

  return (
    <div
      dir="auto"
      className={
        getPageMarginBottom() +
        " extra-details-page w-100 m-0 pt-3 px-3 d-flex flex-column justify-content-start align-items-start "
      }
    >
      {!extraDetails && (
        <div
          dir="ltr"
          className="m-0 p-0 w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch"
        >
          <Skeleton
            className=" align-self-center "
            variant="rectangular"
            width={300}
            height={30}
            style={{
              borderRadius: ".3rem",
            }}
          />
          <Skeleton
            className=" align-self-center mt-3"
            variant="rectangular"
            width={200}
            height={20}
            style={{
              borderRadius: ".3rem",
            }}
          />
          {(extraDetails?.extraMediaType === 0 ||
            extraDetails?.extraMediaType === 2) && (
            <Skeleton
              className=" my-3  align-self-center shadow-0 mx-auto"
              variant="rectangular"
              width={"95%"}
              height={50}
              style={{
                ...getStyles(),
                boxShadow: "none",
                width: "calc(100% - 2rem)",
                maxWidth: "calc(800px - 2rem)",
              }}
            />
          )}
          {(extraDetails?.extraMediaType === 1 ||
            extraDetails?.extraMediaType === 3 ||
            extraDetails?.extraMediaType === 4) && (
            <Skeleton
              className=" my-3 align-self-center box-rounded-1"
              variant="rectangular"
              width={"100%"}
              height={400}
            />
          )}
          {(extraDetails?.extraMediaType === 5 ||
            extraDetails?.extraMediaType === 6) && (
            <>
              <Skeleton
                className=" my-1 mt-3 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />

              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />

              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />

              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"100%"}
                height={20}
              />
              <Skeleton
                className=" my-1 align-self-center rounded rounded-3"
                variant="text"
                width={"80%"}
                height={20}
              />
            </>
          )}
        </div>
      )}
      {extraDetails && (
        <>
          <h1 dir="auto" className="fs-5 align-self-center">
            {extraDetails?.title}
          </h1>
          {extraDetails?.artist && (
            <div className="m-0 p-0 my-3 align-self-center mb-4">
              <span className="">
                {extraType === "audioStory" ? "گوینده" : ""}
                {extraType === "musicVideo" ? "آرتیست" : ""}
                {extraType === "magazine" ? "نویسنده" : ""}
                {extraType === "podcast" ? "گوینده" : ""}
              </span>
              <span className="mx-1">:</span>
              <span className="">{extraDetails?.artist}</span>
            </div>
          )}
          {extraDetails?.imageUrl && (
            <img
              alt="..."
              src={fileBaseUrl + extraDetails?.imageUrl}
              // src={getBaseUrl(extraDetails?.imageUrl) + extraDetails?.imageUrl}
              style={{ maxWidth: "100%", maxHeight: "50vh" }}
              className="mb-3"
            />
          )}
          {hasVideo() && (
            <div className="reactplayer-wrapper m-0 p-0 my-3 shadow align-self-center">
              <ReactPlayer
                id="myVideo"
                onProgress={handleProgressVideo}
                controls
                // url={
                //   getBaseUrl(extraDetails?.mediaUrl) + extraDetails?.mediaUrl
                // }
                url={fileBaseUrl + extraDetails?.mediaUrl}
                className="video-wrapper "
                width="100%"
                height={"auto"}
                ref={videoPlayerRef}
              />
            </div>
          )}

          <div className="m-0 my-3 p-0 d-flex flex-row justify-content-start align-items-stretch">
            {extraDetails?.questions?.length > 0 && (
              <Button
                onClick={handleSeeQuestion}
                color="primary"
                variant="contained"
              >
                مشاهده سوالات
              </Button>
            )}
            {extraDetails?.vocabs?.length > 0 && (
              <Button
                onClick={handleSeeVocabs}
                color="primary"
                variant="contained"
                className="ms-2"
              >
                مشاهده لغات
              </Button>
            )}
          </div>

          {extraDetails?.subtitles?.length > 0 && (
            <div
              dir="ltr"
              className="my-3 mb-6 d-flex flex-row flex-wrap justify-content-start align-items-stretch align-content-start"
            >
              {extraDetails?.subtitles?.map((item) => (
                <SubtitlePart
                  key={item.id}
                  {...item}
                  currentTime={currentTime}
                />
              ))}
            </div>
          )}

          {extraDetails?.content && (
            <div dir="auto" className="">
              {htmlParse(extraDetails?.content?.toString())}
            </div>
          )}

          {!hasVideo() && extraDetails?.mediaUrl && (
            <div
              style={{
                // ...getStyles(),
                boxShadow: "none",
                width: "calc(100%)",
                maxWidth: "calc(800px - 2rem)",
              }}
              dir="ltr"
              className="reactAudioPlayer-wrapper m-0 p-0 my-3 mx-auto align-self-stretch"
            >
              <ReactAudioPlayer
                listenInterval={1000}
                onListen={handleListenAudio}
                style={{ width: "100%" }}
                // src={getBaseUrl(extraDetails?.mediaUrl) + extraDetails?.mediaUrl}
                src={fileBaseUrl + extraDetails?.mediaUrl}
                controls
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExtraDetailsPage;
