import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LevelDeterminePic, lightnessEnum } from "../../components/icons/icons";
import LockIcon from "@mui/icons-material/Lock";

const LevelDetermineItem = ({
  id,
  title,
  totalQuestoins,
  responseTime,
  onClick,
  level,
  userlevel,
}) => {
  const navigate = useNavigate();
  const goToLevelsPage = () => {
    // console.log(id, userlevel);
    if (level?.id <= userlevel?.id + 1) onClick(id);
  };

  return (
    <div
      dir="rtl"
      onClick={goToLevelsPage}
      className="position-relative level-determine-item m-0 p-0 pe-3 pt-2 d-flex flex-column justify-content-start align-items-stretch"
    >
      {level?.id > userlevel?.id + 1 && (
        <div
          style={{
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
        >
          <LockIcon htmlColor="#fff" sx={{ fontSize: "6rem" }} />
        </div>
      )}
      <div className="d-flex flex-row justify-content-between align-items-center">
        <span className="ms-2">
          {`${totalQuestoins ? totalQuestoins : ""}`}
        </span>
        <span
          className={
            "fs-5 fw-bold" +
            (id !== null && typeof id !== "undefined"
              ? " "
              : " mx-auto text-center")
          }
        >
          {title ? title : ""}
        </span>
      </div>
      <div className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
        <LevelDeterminePic lightness={lightnessEnum.light} />
        <span dir="ltr" className="mb-2">
          {responseTime ? `${responseTime} min` : ""}
        </span>
      </div>
    </div>
  );
};

export default LevelDetermineItem;
