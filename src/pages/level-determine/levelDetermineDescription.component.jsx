import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LevelDeterminePic, lightnessEnum } from "../../components/icons/icons";

const LevelDetermineDescription = ({ onClick, title, children }) => {
  const navigate = useNavigate();
  const goToLevelsPage = () => {
    if (onClick) {
      onClick();
    } else navigate("/level-determine-exam?id=description");
  };

  return (
    <div
      dir="rtl"
      onClick={goToLevelsPage}
      className="position-relative level-determine-item m-0 p-0 pe-3 pt-2 d-flex flex-column justify-content-start align-items-stretch"
    >
      <span style={{ height: "40px" }} className="ms-2 "></span>
      <span
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "100%",
          height: "100%",
          zIndex: "1",
        }}
        className={
          "fs-5 fw-bold mx-auto text-center d-flex flex-row justify-content-center align-items-center align-self-center"
        }
      >
        {title ? title : children}
      </span>
      <div className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
        <LevelDeterminePic lightness={lightnessEnum.light} />
      </div>
    </div>
  );
};

export default LevelDetermineDescription;
