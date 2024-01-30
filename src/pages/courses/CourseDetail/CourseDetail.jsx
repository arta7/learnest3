import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailCards from "./components/CourseDetailCards/CourseDetailCards";
import CourseDetailHeader from "./components/CourseDetailHeader/CourseDetailHeader";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
// import { parse } from 'query-string';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./style/style.scss";
import { baseUrl } from "../../../core/services/baseUrl";

const CourseDetail = (props) => {
  const { id } = useParams();
  const token = localStorage.getItem("learnestToken");
  const [courseDetail, setCourseDetail] = useState();
  const { classRoomInfo } = useClassRoomStateContext();

  const sessionUrl = baseUrl + "/courses/session?sessionId=";

  const getSessions = async () => {
    await axios
      .post(`${sessionUrl}${id}`, null, {
        headers: {
          Authorization: token,
          Version: "ewano"
        },
      })
      .then((resp) => {
        setCourseDetail(resp?.data?.data);
      })
      .catch((exp) => {
        console.log(exp);
      });
  };

  useEffect(() => {
    getSessions();
    console.log('props : ',props)
  }, []);

  return (
    <section className="d-flex flex-column  justify-content-center align-items-center">
      <div className=" w-100 m-0 p-0 px-3 d-flex flex-column justify-content-center align-items-stretch">
        {courseDetail && courseDetail.hasVideo && (
          <CourseDetailHeader headerData={courseDetail} />
        )}
      </div>
      {courseDetail?.sessionParts?.length > 0 &&
        courseDetail?.sessionParts?.filter((item) => item?.isLocked === true)
          ?.length === courseDetail?.sessionParts?.length && (
          <p class="fs-7 px-3 mt-2 mb-0 p-0 text-muted">
            بعد از فشردن آیکن "شروع کلاس" در بالا و دیدن فیلم های آموزشی و پاسخ
            به سوالات قفل باکس های زیر باز میشود .
          </p>
        )}
      <CourseDetailCards sessionsData={courseDetail} />
      {courseDetail?.learningProgressPercent === 1 &&
        courseDetail?.sessionParts?.filter((item) => item.isCompleted)
          ?.length === courseDetail?.sessionParts?.length && (
          <div className="p-3 w-100">
            <div className="my-3 p-3 py-4 box-rounded-1 w-100 bg-success text-white text-center">
              شما این جلسه را با موفقیت به اتمام رسانده اید
            </div>
          </div>
        )}
      {classRoomInfo?.length > 0 && (
        <Link
          to={"/chat/gcr" + classRoomInfo?.classroomId}
          className="text-decoration-none text-white d-flex justify-content-center align-items-center chat-button"
        >
          چت
        </Link>
      )}
    </section>
  );
};

export default CourseDetail;
