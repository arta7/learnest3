import React, { useEffect } from "react";
import { ArrowCircleRight } from "@mui/icons-material";
import defImg from "../../../../../assets/img/babak-images/english-image.png";
import ProgressBar from "./components/ProgressBar";
import { useLoadingContext } from "../../../../../core/contexts/loading/loading";
import { session_apiCalls } from "../../../../../core/services/agent";
import "./style/style.scss";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import {
  useClassRoomSetStateContext,
  useClassRoomActions,
} from "../../../../../core/contexts/classRoom/classRoom";

const CourseDetailHeader = (props) => {
  const headerData = props.headerData;
  const navigate = useNavigate();
  const params = useParams();
  const { handleOpen, handleClose } = useLoadingContext();
  const { set_sessionLearningData } = useClassRoomSetStateContext();
  const { breadCrumbActions } = useClassRoomActions();

  const handle_gotoSessionLearning = async () => {
    handleOpen();
    await session_apiCalls
      .apiCall_sessionLearning(params?.id)
      .then((resp) => {
        if (resp.status === 200 && resp?.data?.data?.length > 0) {
          breadCrumbActions.set_breadCrumb_sessionLearning({
            title: "آموزش",
            link: "/session-learning",
          });
          set_sessionLearningData({
            sessionLearningData: resp?.data?.data,
            sessionId: params?.id,
          });
          navigate("/session-learning");
        } else {
          if (resp.status === 200 && resp?.data?.data?.length === 0) {
            toast.warning("آموزشی برای این جلسه ثبت نشده است.");
          } else if (resp.status !== 200) {
            toast.error("دریافت اطلاعات با خطا مواجه شد .");
          }
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
    handleClose();
  };

  return (
    <div className="w-100  m-0 p-0 mt-2 d-flex flex-column justify-content-center align-items-center">
      <div
        className="img-holder"
        style={{
          backgroundImage: `url(${
            fileBaseUrl + headerData?.learningImageUrl || defImg
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          onClick={handle_gotoSessionLearning}
          className="m-0 p-0 px-1 d-flex justify-content-around align-items-center btn-holder"
        >
          <div className="m-0 p-0 d-flex justify-content-center align-items-center icon-holder">
            <ArrowCircleRight htmlColor="#fff" />
          </div>
          <span className="text-white ms-2 font-small btn-text">شروع کلاس</span>
        </div>
      </div>
      <div
        id="progress-container"
        className="p-0 m-0 pt-2 d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "20px", direction: "ltr" }}
      >
        <ProgressBar
          percentage={parseFloat(headerData?.learningProgressPercent) * 100}
        />
      </div>
    </div>
  );
};

export default CourseDetailHeader;
