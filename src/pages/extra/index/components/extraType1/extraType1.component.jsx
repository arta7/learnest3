import React, { useState, useEffect } from "react";
import {
  fileBaseUrl,
  imagesBaseUrl,
} from "../../../../../core/services/baseUrl";
import gemIcon from "../../../../../assets/img/icons/jem.png";
import crosswordImage from "../../../../../assets/img/crossword.png";
import "./extraType1.styles.scss";
import { useNavigate } from "react-router";

const ExtraType1 = ({
  id,
  title,
  imageUrl,
  gems,
  tags,
  folder,
  type,
  allTabelsIds,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (type === "crossword")
      navigate("/extra/crossword?id=" + id, {
        state: { allTabelsIds: allTabelsIds },
      });
    else {
      navigate("/extra-details?id=" + id, { state: { extraType: type } });
    }
  };
  return (
    <div
      onClick={handleClick}
      style={{
        width: "300px",
      }}
      className="m-0 me-3 p-2 shadow box-rounded-1 cursor-pointer d-flex flex-column justify-content-start align-items-stretch"
    >
      <div className="m-0 p-0 mb-2 d-flex justify-content-center align-items-center">
        <span>{gems}</span>
        <img
          style={{
            width: "30px",
            height: "30px",
          }}
          alt="..."
          src={gemIcon}
          className="mx-1 noselect"
        />
      </div>
      {type !== "crossword" && (
        <img
          className="box-rounded-1 align-self-center mb-2 noselect"
          style={{
            maxWidth: "calc(100% - 1.5rem)",
          }}
          alt="..."
          src={
            type === "crossword" ? { crosswordImage } : fileBaseUrl + imageUrl
          }
        />
      )}
      {type === "crossword" && (
        <img
          className="box-rounded-1 align-self-center mb-2 noselect"
          style={{
            maxWidth: "calc(100% - 1.5rem)",
          }}
          alt="..."
          src={crosswordImage}
        />
      )}
      <div className=" m-0 p-0 mt-auto d-flex flex-row justify-content-between align-items-baseline">
        <span dir="ltr" style={{ maxWidth: "100px" }} className="text-truncate">
          {title}
        </span>
        <span
          className="m-0 p-0 bg-main-color-1 p-1 text-nowrap"
          style={{
            borderRadius: ".3rem",
          }}
        >
          {tags}
        </span>
      </div>
    </div>
  );
};

export default ExtraType1;
