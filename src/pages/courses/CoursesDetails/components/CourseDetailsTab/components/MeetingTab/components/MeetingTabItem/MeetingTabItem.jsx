import React, { useEffect } from "react";
import { AccessTime, Lock, LockOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useClassRoomActions } from "../../../../../../../../../core/contexts/classRoom/classRoom";
import "./style/style.css";

const MeetingTabItem = (props) => {
  const data = props.data;
  const itemIndex = props.itemIndex;
  const { breadCrumbActions } = useClassRoomActions();
  const navigate = useNavigate();

  const handleItemClick = (courseId) => {
    if (data.isLocked) return;
    breadCrumbActions.set_breadCrumb_session({
      title: props?.data?.title,
      link: `/course-detail/${props?.data?.id}`,
    });
    navigate(`/course-detail/${courseId}`);
  };

  return (
    <div
      style={{ borderRadius: "1rem" }}
      dir="ltr"
      className="position-relative w-100 my-3 m-0 px-3 py-4 d-flex flex-column meeting-tab-item-holder shadow rounded-20"
      onClick={() => handleItemClick(data?.id)}
    >
      {data.isLocked && (
        <div
          style={{
            borderRadius: "1rem",
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: "1",
            boxShadow: "none",
          }}
          className="level-determine-item d-flex flex-row justify-content-center align-items-center"
        ></div>
      )}
      <div className="d-flex align-items-center justify-content-end">
        <span className="fw-bold d-flex me-auto">{data.title}</span>
        {props.data && data.isLocked ? <Lock /> : <LockOpen />}
        <span className="fw-bold ms-2">{itemIndex + 1}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="text-grey">{data?.totalParts} Lesson</div>
        <div className="text-grey d-flex flex-row justify-content-between align-items-center">
          <AccessTime className="ms-1" fontSize="small" />
          <span>{data?.date}</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="progress">
          {props.data && data?.progressPercent > 0 ? (
            <div
              className="progress-bar bg-warning text-black"
              role="progressbar"
              style={{ width: parseInt(data?.progressPercent * 100) + "%" }}
              aria-valuenow={parseInt(data?.progressPercent)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {parseInt(data?.progressPercent * 100) + "%"}
            </div>
          ) : (
            <div
              className="progress-bar bg-light text-black"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              0%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingTabItem;
