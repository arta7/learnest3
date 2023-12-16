import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import {
  CheckCircle,
  AccessTime,
  FiberManualRecord,
} from "@mui/icons-material";
import SimpleDialog from "./utils/SimpleDialog";
import "./style/style.scss";
import { useLoadingContext } from "../../../../../../core/contexts/loading/loading";
import {
  useClassRoomSetStateContext,
  useClassRoomActions,
} from "../../../../../../core/contexts/classRoom/classRoom";
import { toast } from "react-toastify";
import { session_apiCalls } from "../../../../../../core/services/agent";
import { apiCaller } from "../../../../../../core/custom-hooks/useApi";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import { baseUrl } from "../../../../../../core/services/baseUrl";

const DetailCardItem = ({ data, title, cardIndex }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { handleClose, handleOpen } = useLoadingContext();
  const { set_sessionLearningData } = useClassRoomSetStateContext();
  const { breadCrumbActions } = useClassRoomActions();
  // Get Vocabs
  const getVocabs = async (partId) => {
    return await axios
      .post(baseUrl + "/courses/getvocabs?partId=" + partId, null)
      .then((resp) => {
        if (resp.status === 200) return resp?.data?.data;
        else return undefined;
      })
      .catch((exp) => {
        return undefined;
      });
  };

  // Get Grammars
  const getGrammars = async (partId) => {
    return await axios
      .post(baseUrl + "/courses/getgrammars?partId=" + partId, null)
      .then((resp) => {
        return resp?.data?.data;
      })
      .catch((exp) => {
        return [];
      });
  };

  // Get SessionPart question
  // ============== start Modal states and functions ===============
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = (value) => {
    setOpen(false);
  };
  // ============== end Modal states and functions ===============
  //
  // handle Click
  const handleClick = async () => {
    if (data?.length > 1) {
      handleClickOpen();
    }
    if (data?.length === 1) {
      if (data[0]?.isLocked) {
        return;
      }
      breadCrumbActions.set_breadCrumb_sessionPart({
        hasExercise: data[0]?.hasExercise,
        hasLesson: data[0]?.hasLesson,
        sessionPartType: data[0]?.type,
        sessionPartTitle: data[0]?.title,
        id: params?.id,
      });
      if (data[0]?.type === 0) {
        handleOpen();
        const vocabs = await getVocabs(data[0]?.id);
        if (vocabs) {
          navigate("/vocabularies/" + data[0]?.id, {
            state: {
              vocabs: vocabs,
              sessionId: params?.id,
              vocabQuestionsToAnswer: data[0].vocabQuestionsToAnswer,
            },
          });
        }
        handleClose();
        return;
      }
      // for grammars
      if (data[0]?.hasLesson) {
        handleOpen();
        const sessionPartItems = await getGrammars(data[0]?.id);

        if (sessionPartItems?.length > 0) {
          navigate("/session-part/" + data[0]?.id, {
            state: {
              sessionId: params?.id,
              sessionPartId: data[0]?.id,
              sessionPartType: 6,
              sessionPartItems: sessionPartItems,
              hasExercise: data[0]?.hasExercise,
            },
          });
        } else if (sessionPartItems?.length === 0) {
          toast.warning(`لیست آموزش های ${title} خالی میباشد .`);
        }
        handleClose();
      } else if (data[0]?.hasExercise) {
        handleOpen();

        const { data: sessionQuestions } = await apiCaller({
          api: session_apiCalls.apiCall_getPartQuestions,
          apiArguments: data[0]?.id,
          toastMessage: false,
        });

        if (sessionQuestions?.data?.questions?.length > 0) {
          set_sessionLearningData({
            questions: sessionQuestions?.data?.questions,
            typeId: data[0]?.id,
            baseAnsweringType: 1,
            pageDataOnFinishQuestions: {
              path: "/course-detail/" + params?.id,
              data: null,
            },
          });
          navigate("/question-engine");
        } else if (sessionQuestions?.data?.questions?.length === 0) {
          toast.warning(`لیست سوالات ${title} خالی میباشد .`);
        }
        handleClose();
      }
    }
  };

  const handleClickOnModalItem = async (item) => {
    if (item?.isLocked) {
      return;
    }

    breadCrumbActions.set_breadCrumb_sessionPart({
      hasExercise: item?.hasExercise,
      hasLesson: item?.hasLesson,
      sessionPartType: item?.type,
      sessionPartTitle: data[0]?.title,
      id: params?.id,
    });

    if (item?.type === 0) {
      handleOpen();
      const vocabs = await getVocabs(item?.id);
      if (vocabs) {
        navigate("/vocabularies/" + item?.id, {
          state: {
            vocabs: vocabs,
            sessionId: params?.id,
          },
        });
      }
      handleClose();
      return;
    }

    // for grammars
    if (item?.hasLesson) {
      handleOpen();
      const sessionPartItems = await getGrammars(item?.id);

      if (sessionPartItems?.length > 0) {
        navigate("/session-part/" + item?.id, {
          state: {
            sessionId: params?.id,
            sessionPartId: item?.id,
            sessionPartType: 6,
            sessionPartItems: sessionPartItems,
            hasExercise: item?.hasExercise,
          },
        });
      } else if (sessionPartItems?.length === 0) {
        toast.warning(`لیست آموزش های ${title} خالی میباشد .`);
      }
      handleClose();
    } else if (item?.hasExercise) {
      handleOpen();

      const { data: sessionQuestions } = await apiCaller({
        api: session_apiCalls.apiCall_getPartQuestions,
        apiArguments: item?.id,
        toastMessage: false,
      });

      if (sessionQuestions?.data?.questions?.length > 0) {
        set_sessionLearningData({
          questions: sessionQuestions?.data?.questions,
          typeId: item?.id,
          baseAnsweringType: 1,
          pageDataOnFinishQuestions: {
            path: "/course-detail/" + params?.id,
            data: null,
          },
        });
        navigate("/question-engine");
      } else if (sessionQuestions?.data?.questions?.length === 0) {
        toast.warning(`لیست سوالات ${title} خالی میباشد .`);
      }
      handleClose();
    }
  };
  // ui control
  const cardHasOverlay = () => {
    if (data?.length === 1) {
      if (data[0]?.isLocked) return true;
      else return false;
    } else {
      return false;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={
        (cardIndex % 2 === 0 ? "pe-3 ps-1" : "ps-3 pe-1") +
        " py-1 p-0 m-0 col-6 d-flex flex-column justify-content-center align-items-center"
      }
    >
      <div
        dir="rtl"
        className={
          (data[0]?.isCompleted ? "session-part-compeleted" : "") +
          " w-100 p-3 ps-2 py-2  position-relative d-flex flex-column justify-content-start align-items-stretch rounded-20 detail-card"
        }
      >
        {/* **************** */}
        <div
          style={{ maxHeight: "90px" }}
          className="m-0 p-0 d-flex flex-row justify-content-start align-items-stretch"
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              fontSize: "60px",
              color: data[0]?.isCompleted
                ? "rgb(12 133 5 / 25%)"
                : "rgb(169 169 169 / 25%)",
              fontWeight: "600",
            }}
          >
            {" "}
            {cardIndex + 1}{" "}
          </div>
          {/* **************** */}
          <div className="m-0 p-0 ps-2 flex-grow-1 d-flex flex-column justify-content-center align-items-start">
            <span className="text-nowrap">{data[0]?.title}</span>
            <div className="w-100 mt-1 d-flex flex-row justify-content-between align-items-center">
              {data[0]?.isCompleted && (
                <span className="text-success fs-9  text-nowrap ">
                  تکمیل شده
                </span>
              )}
              <div className="m-0 p-0 ms-auto d-flex justify-content-center align-items-center">
                <FiberManualRecord
                  className="me-1 mb-1"
                  htmlColor="#157DBC"
                  fontSize="5"
                />
                <span className="font-small">{data[0]?.totalParts}</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}

        {cardHasOverlay() && <div className="card-overlay"></div>}
      </div>
      {/* **************** */}

      {/* **************** */}
      {data?.length > 1 && (
        <SimpleDialog
          // selectedValue={selectedValue}
          open={open}
          onClose={handleCloseModal}
        >
          {data?.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                handleClickOnModalItem(item);
                // navigate(title + "?id=" + item.id);
              }}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "10px",
                position: "relative",
              }}
              className="border col-6 p-0 m-0 mt-2 mx-2 d-flex justify-content-center align-items-center dialog-card"
            >
              {item?.title}
            </div>
          ))}
        </SimpleDialog>
      )}
    </div>
  );
};

export default DetailCardItem;
