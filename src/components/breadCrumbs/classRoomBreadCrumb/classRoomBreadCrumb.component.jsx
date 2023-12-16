import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
import { fitText } from "../../../core/utils/utils";
const ClassRoomBreadCrumb = (props) => {
  const { breadCrumbObject } = useClassRoomStateContext();
  const { classRoom, session, sessionLearning, questions, sessionPart } =
    breadCrumbObject;

  const [fontSize, set_fontSize] = useState("12.8px");

  useEffect(() => {
    //breadcrumb
    // let id = "";
    // if (breadCrumbObject.className?.title) {
    //   id = "className-title";
    // } else if (breadCrumbObject?.session?.title) {
    //   id = "session-title";
    // } else if (breadCrumbObject?.sessionLearning?.title) {
    //   id = "sessionLearning-title";
    // } else if (breadCrumbObject?.sessionPart?.title) {
    //   id = "sessionPart-title";
    // } else if (breadCrumbObject?.questions?.title) {
    //   id = "sessionPart-title";
    // }
    // const currentFontSize = parseInt(
    //   window.getComputedStyle(id, null).getPropertyValue("font-size"),
    //   10
    // );
    // const outputDivId = "breadcrumb";
    // const fs = fitText({
    //   outputSelector: outputDivId,
    //   currentFontSize: currentFontSize,
    // });
    // set_fontSize(fs);
  }, [breadCrumbObject]);

  return (
    <div
      id="breadcrumb"
      dir="ltr"
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        maxWidth: "80%",
      }}
      className=" tiny-scrollbar m-0 p-0 py-2 d-flex flex-row justify-content-start align-items-baseline"
    >
      {breadCrumbObject.classRoom?.title &&
        breadCrumbObject.classRoom?.title?.length > 0 && (
          <>
            <Link
              to={breadCrumbObject.classRoom.link}
              className=" text-nowrap text-decoration-none ms-1 text-dark fs-7"
              id="classRoom-title"
              style={{ fontSize: fontSize }}
            >
              {breadCrumbObject?.classRoom.title}
            </Link>
          </>
        )}
      {breadCrumbObject?.session?.title &&
        breadCrumbObject?.session?.title?.length > 0 && (
          <>
            /
            <Link
              to={breadCrumbObject?.session.link}
              className=" text-nowrap text-decoration-none mx-1  text-dark fs-7"
              id="session-title"
              style={{ fontSize: fontSize }}
            >
              {breadCrumbObject.session.title}
            </Link>
          </>
        )}
      {breadCrumbObject?.sessionLearning?.title &&
        breadCrumbObject?.sessionLearning?.title?.length > 0 && (
          <>
            /
            <Link
              to={breadCrumbObject?.sessionLearning.link}
              className=" text-nowrap text-decoration-none mx-1  text-dark fs-7"
              id="sessionLearning-title"
              style={{ fontSize: fontSize }}
            >
              {breadCrumbObject?.sessionLearning.title}
            </Link>
          </>
        )}

      {breadCrumbObject?.sessionPart?.title &&
        breadCrumbObject?.sessionPart?.title?.length > 0 && (
          <>
            /
            <Link
              to={breadCrumbObject?.sessionPart.link}
              className=" text-nowrap text-decoration-none mx-1  text-dark fs-7"
              id="sessionPart-title"
              style={{ fontSize: fontSize }}
            >
              {breadCrumbObject?.sessionPart.title}
            </Link>
          </>
        )}

      {breadCrumbObject?.questions?.title &&
        breadCrumbObject?.questions?.title?.length > 0 && (
          <>
            /
            <Link
              to={breadCrumbObject?.questions.link}
              className=" text-nowrap text-decoration-none mx-1  text-dark fs-7"
              id="questions-title"
              style={{ fontSize: fontSize }}
            >
              {breadCrumbObject?.questions.title}
            </Link>
          </>
        )}
    </div>
  );
};

export default ClassRoomBreadCrumb;
