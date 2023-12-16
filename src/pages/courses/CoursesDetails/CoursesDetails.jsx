import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import CourseDetailsHeader from "./components/CourseDetailsHeader/CourseDetailsHeader";
import CourseDetailsTab from "./components/CourseDetailsTab/CourseDetailsTab";
import "./style/style.css";
import {
  useClassRoomSetStateContext,
  useClassRoomActions,
} from "../../../core/contexts/classRoom/classRoom";
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import { exam_apiCalls } from "../../../core/services/agent";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { Button, Dialog } from "@mui/material";
import { convertDate } from "../../../core/utils/utils";
import colors from "../../../assets/styles/variables/_colors.module.scss";

import htmlParse from "html-react-parser";
import { useUserProfileContext } from "../../../core/contexts/profile/profileProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../core/services/baseUrl";

const CoursesDetails = () => {
  const { profileData } = useUserProfileContext();
  const {
    openLoading: isLoading,
    handleOpen,
    handleClose,
  } = useLoadingContext();
  const { id } = useParams();
  const { set_classRoomInfo, set_sessionLearningData } =
    useClassRoomSetStateContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState(null);
  const { breadCrumbActions } = useClassRoomActions();
  const getCourseDetail = baseUrl + "/courses/details";

  //
  /////
  ////////
  /////////////
  ///////////////////
  // Exam Codes : Start
  const [startExamResponse, set_startExamResponse] = useState();
  const [examDetails, set_examDetails] = useState();
  const [open, set_open] = useState(false);

  const toggleDialog = () => {
    set_open(!open);
  };
  const startExam = async () => {
    if (isLoading) return;
    handleOpen();
    apiCaller({
      api: exam_apiCalls.apiCall_startExam,
      apiArguments: examDetails.id,
      onErrorMessage: "شروع آزمون با خطا مواجه شد .",
      onSuccess: (response) => {
        breadCrumbActions.set_breadCrumb_session({ title: "", link: "" });
        set_sessionLearningData({
          questions: response?.data?.data?.questions,
          typeId: examDetails?.id,
          baseAnsweringType: 3,
          responseTime: response?.data?.data?.responseTime,
          pageDataOnFinishQuestions: {
            path: "/courses-details/" + id,
            data: null,
          },
        });
        navigate("/question-engine");
      },
      onEnd: () => {
        handleClose();
      },
    });
  };
  // Exam Codes : End
  //////////////////
  //////////////
  /////////
  /////
  //

  ////// GOTO LEVEL DETERMINE //////
  const [showLevelDetermineDialog, set_showLevelDetermineDialog] =
    useState(false);
  const handleToggleLevelDetermineDialog = () => {
    set_showLevelDetermineDialog(!showLevelDetermineDialog);
  };

  ////// GOTO LEVEL DETERMINE //////

  const getCourseDetails = async () => {
    handleOpen();
    await axios
      .post(getCourseDetail + "?courseId=" + id, null)
      .then((resp) => {
        setCourseDetails(resp.data.data);
        set_examDetails({ ...resp.data.data.exam });
        document.getElementById("layout2-title").innerHTML =
          resp?.data?.data?.introduction?.title;
      })
      .catch((ex) => {
        console.log(ex);
      })
      .finally(() => {
        handleClose();
      });
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  useEffect(() => {
    if (courseDetails?.introduction) {
      set_classRoomInfo({
        classroomId: courseDetails?.introduction?.classRoomId,
        classmates: courseDetails.classmates,
      });
      breadCrumbActions.set_breadCrumb_classRoom({
        title: courseDetails?.introduction?.title,
        link: "/courses-details/" + id,
      });
    }
  }, [courseDetails?.introduction]);

  const handleGotoBuyCourse = async () => {
    if (courseDetails?.introduction?.examScore > 0) return;
    //
    if (!courseDetails?.introduction?.isBought) {
      if (profileData.level.id < courseDetails?.introduction?.levelId) {
        // toast.warn("سطح شما پایین تر از سطح این دوره میباشد .");
        handleToggleLevelDetermineDialog();
        return;
      }
      navigate("/buyCourseFirstPage/" + id, {
        state: courseDetails?.priceInformation,
      });
    } else {
      breadCrumbActions.set_breadCrumb_Exam({
        title: "آزمون دوره",
        link: "",
      });
      handleOpen();
      apiCaller({
        api: exam_apiCalls.apiCall_getExam,
        apiArguments: id,
        onSuccess: (response) => {
          set_examDetails({
            ...examDetails,
            ...response.data.data,
          });
          toggleDialog();
        },
        onEnd: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <section style={{ position: "relative", maxWidth: "800px" }}>
      <CourseDetailsHeader headerData={courseDetails?.header} />
      <CourseDetailsTab detailsData={courseDetails} />

      {(courseDetails?.introduction?.isBought === false ||
        courseDetails?.introduction?.examScore > 0 ||
        courseDetails?.exam?.isOpen === true) && (
          <div
            onClick={handleGotoBuyCourse}
            style={{
              backgroundColor:
                courseDetails?.introduction?.examScore > 0
                  ? "#2e7d32"
                  : colors["main-color-1"],
              color: "#FFFFFF",
              width: "100%",
              maxWidth: "800px",
              height: "60px",
              position: "fixed",
              bottom: "0",
              cursor: "pointer",
              zIndex: 1,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            {/* BUY COURSE TEXT */}
            {courseDetails?.introduction?.isBought === false
              ? "خرید دوره :" +
              courseDetails?.priceInformation.formattedDiscountPrice
              : ""}
            {/* SEE COURSE TEXT */}
            {courseDetails?.introduction?.isBought === true &&
              courseDetails?.introduction?.examScore === 0
              ? " مشاهده آزمون دوره"
              : ""}
            {/* SEE COURSE SCORE */}

            {courseDetails?.introduction?.isBought === true &&
              courseDetails?.introduction?.examScore > 0
              ? `امتیاز شما در آزمون این دوره : ${parseFloat(courseDetails?.introduction?.examScore) * 100
              } درصد`
              : ""}
          </div>
        )}
      {/********/}
      <Dialog
        open={showLevelDetermineDialog}
        onClose={handleToggleLevelDetermineDialog}
      >
        <div
          style={{ minWidth: "300px", minHeight: "350px" }}
          className="m-0 p-3 d-flex flex-column justify-content-start align-items-start"
        >
          <p className="fs-6 mt-3">
            سطح شما پایین تر از سطح این دوره میباشد برای شرکت در این دوره باید
            وارد صفحه تعیین سطح شوید و در آزمون شرکت کنید .
          </p>

          <Button
            variant="contained"
            color="primary"
            href="/level-determine"
            component={(props) => (
              <Link
                {...props}
                className={
                  props?.className + " text-decoration-none text-white"
                }
                to={"/level-determine"}
              />
            )}
            className="py-2 w-50 mt-4 text-decoration-none align-self-center mt-auto mb-3"
          >
            صفحه تعیین سطح
          </Button>
        </div>
      </Dialog>
      {/********/}
      <Dialog open={open} onClose={toggleDialog}>
        <div
          style={{ minWidth: "300px", minHeight: "400px" }}
          className="m-0 p-3 d-flex flex-column justify-content-start align-items-start"
        >
          <span className="fs-5 mb-3"> {examDetails?.title} </span>
          {examDetails?.content && (
            <div className="p-0 mb-3 m-0">
              {htmlParse(examDetails?.content?.toString())}
            </div>
          )}

          <span className="m-0 mb-3 p-0">{` تعداد سوالات  : ${examDetails?.totalQuestions}`}</span>
          <span className="m-0 mb-3 p-0">{` مدت زمان آزمون : ${examDetails?.responseTime} دقیقه`}</span>
          <span className="m-0 mb-3 p-0">{` حداقل درصد قبولی آزمون : ${examDetails?.minimumPercentToQualify} درصد`}</span>

          <Button
            variant="contained"
            onClick={startExam}
            color="primary"
            className="w-100 mt-auto"
          >
            شروع آزمون
          </Button>
        </div>
      </Dialog>
    </section>
  );
};

export default CoursesDetails;
