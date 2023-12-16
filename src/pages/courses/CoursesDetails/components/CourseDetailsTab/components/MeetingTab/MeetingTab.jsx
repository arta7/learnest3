import React from "react";
import MeetingTabItem from "./components/MeetingTabItem/MeetingTabItem";
import "./style/style.css";

const MeetingTab = (props) => {
  const courseData = props.courseData;

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      {props.courseData && courseData.map((item, index) => (
        <MeetingTabItem key={index} itemIndex={index} data={props.courseData && item} />
      ))}
      <div style={{ height: "215px" }}></div>
    </div>
  );
};

export default MeetingTab;
