import React, { useState, useEffect } from "react";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { useNavigate, useParams, useLocation } from "react-router";
import Invitement from "./components/invitement.component";
import { Button } from "@mui/material";
import fakeAvatar from "../../../../assets/img/babak-images/classmate-avatar.png";
import { useClassRoomStateContext } from "../../../../core/contexts/classRoom/classRoom";

const BuyCourseFirstPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [invitements, set_invitements] = useState();
  const { dispatchFactor, set_priceInformation } = useBuyCourseDispatch();
  const { classRoomInfo } = useClassRoomStateContext();

  useEffect(() => {
    dispatchFactor({ type: actions.SETCOURSEID, payload: params.courseId });
    dispatchFactor({
      type: actions.SETCLASSROOMID,
      payload: classRoomInfo?.classroomId,
    });

    const { data, status } = apiCaller({
      api: buyCourse_apiCalls.apiCall_getClassroominvites,
      apiArguments: params.courseId,
    });

    if ((status === 200) & (data?.data?.length > 0)) {
      set_invitements(data.data);
    }
  }, []);

  useEffect(() => {
    if (location?.state) {
      set_priceInformation(location?.state);
    }
  }, [location?.state]);

  const handleGotoSecondPage = () => {
    navigate("/buyCourseSecondPage");
  };

  return (
    <div className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      {/* introduction */}
      <div className="m-0 mt-2 p-0 d-flex flex-column justify-content-start align-items-stretch">
        <p className="mb-3 text-center">
          در صورت ارسال دعوتنامه از جانب دوستانتان برای شرکت در جلسات دوره ها به
          صورت مشترک و در قالب همکلاسی ، دعوتنامه ها را در این قسمت مشاهده
          میکنید. در صورت عدم وجود دعوتنامه و یا در صورت تمایل به شرکت در جلسات
          به صورت انفرادی ، دکمه ی ورود به کلاس بدون دعوتنامه در پایین صفحه را
          فشار دهید.
        </p>
      </div>
      {/* INVITEMENTS  */}
      <div className="m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-stretch">
        {invitements?.length > 0 &&
          invitements.map((item, index) => (
            <Invitement
              key={item?.id}
              className={
                (index === invitements?.length - 1 ? "mb-6" : "") + " my-2"
              }
              {...item}
            />
          ))}
      </div>
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
        }}
        className="m-0 mx-auto py-3 d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleGotoSecondPage}
          className="py-2 fs-6"
        >
          ورود به کلاس بدون دعوتنامه
        </Button>
      </div>
    </div>
  );
};

export default BuyCourseFirstPage;
