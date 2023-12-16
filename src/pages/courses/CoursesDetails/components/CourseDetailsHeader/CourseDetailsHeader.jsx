import React from "react";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";
import "./style/style.css";

const CourseDetailsHeader = (props) => {
  const headerData = props.headerData;
  // console.log(headerData);

  /*
  background: url("../../../../../assets/img/english-book.png") no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 230px;
    position: relative;
  */

  return (
    <div
      style={{
        backgroundImage: `url(${fileBaseUrl}${headerData?.bannerUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "130px",
        position: "relative",
      }}
    >
      {/* <div className="rate-holder m-0 p-0 px-1 d-flex justify-content-center align-items-center bg-white">
        <div className="d-flex flex-column align-items-center justify-content-center h-100 col-4">
          <div>{headerData?.roommates}</div>
          <div>همکلاسی</div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 col-4">
          <div>{headerData?.rate}</div>
          <div>امتیاز</div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 col-4">
          <div>{headerData?.duration}</div>
          <div>آموزش</div>
        </div>
      </div> */}
    </div>
  );
};

export default CourseDetailsHeader;
