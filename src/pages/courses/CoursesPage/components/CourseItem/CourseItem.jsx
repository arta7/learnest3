import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookmarkBorder,
  AccessTime,
  Star,
  Bookmark,
  StarBorder,
} from "@mui/icons-material";
import { createArrayByLength } from "../../../../../core/utils/utils";
import defImg from "../../../../../assets/img/babak-images/english-image.png";
import "./style/style.css";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";

const CourseItem = (props) => {
  const {
    id,
    formattedDiscuntPrice,
    duration,
    formattedPrice,
    imageUrl,
    isBookmark,
    isBought,
    level,
    refrenceBook,
    tags,
    teacher,
    title,
    totalSessions,
    weekdays,
    rate,
    examScore,
  } = props.data;

  const navigate = useNavigate();


  const handleCardClick = (courseId) => {
    navigate(`/courses-details/${courseId}`, {
      state: { levelId: props.levelId },
    });
  };

  return (
    <>
      <div
        onClick={() => handleCardClick(id)}
        style={{
          position: "relative",
          cursor: "pointer",
          boxShadow: "0 3px 6px 3px #ccc",
          border: examScore > 0 ? "1px solid #108f20ad" : "unset",
        }}
        className="card-bg p-1 mt-2 mb-3"
      >
        {/* <div className="closed-overlay"></div> */}
        <div
          className="card-img"
          style={{
            background: `url(${imageUrl ? fileBaseUrl + imageUrl : defImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="card-text">
          <div className="m-0 p-3 d-flex justify-content-between align-items-center">
            <span>{level}</span>
            <span className="fw-bold fs-5">{title}</span>
          </div>
          <div className="m-0 px-3 d-flex justify-content-between align-items-center">
            <span className="card-book">کتاب : {refrenceBook}</span>
            <span dir="ltr" className="font-15 text-grey">
              {totalSessions} Lessons
            </span>
          </div>
          <div className="m-0 my-1 mt-2 px-3 d-flex justify-content-between align-items-center">
            <span className="font-15 text-black">نام استاد : {teacher}</span>
          </div>
          <ul className="badge-holder">
            {tags && tags?.split(",")?.length > 0 ? (
              tags?.split(",")?.map((item) => (
                <li key={item} className="adults">
                  {item}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          {isBought == false && (
            <div className="m-0 p-0 d-flex justify-content-center my-2 fw-bold">
              <span className="mx-2 text-danger">{formattedDiscuntPrice}</span>
              <span className="text-decoration-line-through">
                {formattedPrice}
              </span>
            </div>
          )}
        </div>
        {/*  */}
        {examScore > 0 && (
          <div
            style={{ color: "#007200" }}
            className="d-flex mb-2 flex-row fs-6 justify-content-center"
          >
            شما این دوره را با موفقیت به اتمام رسانده اید
          </div>
        )}
      </div>
    </>
  );
};

export default CourseItem;
