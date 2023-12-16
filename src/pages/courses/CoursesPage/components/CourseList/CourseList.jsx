import React from "react";
import CourseItem from "../CourseItem/CourseItem";

const CourseList = (props) => {
  const coursesDatas = props.courseData;

  return (
    <div
      style={{
        maxWidth: "100%",
      }}
      className="m-0  p-3 d-flex flex-column justify-content-center"
    >
      {coursesDatas &&
        coursesDatas.map((item) => <CourseItem key={item.id} data={item} />)}
    </div>
  );
};

export default CourseList;
