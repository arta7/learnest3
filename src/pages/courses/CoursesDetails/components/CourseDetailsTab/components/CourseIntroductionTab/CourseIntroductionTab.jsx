import React from "react";
import CourseIntroductionItem from "./components/CourseIntroductionItem";

const CourseIntroductionTab = (props) => {
  const courseIntroductionData = props.courseIntroductionData;
  // console.log(courseIntroductionData);

  return (
    <section className="w-100 d-flex flex-column justify-content-center align-items-center">
      <CourseIntroductionItem
        data={props.courseIntroductionData && courseIntroductionData}
      />
      <div style={{ height: "215px" }}></div>
    </section>
  );
};

export default CourseIntroductionTab;
