import React, { useState, useEffect } from "react";
import leitnerBoxIcon from "../../../../assets/img/icons/footer-note.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styles.scss";

const LeitnerIcon = ({
  containerClassName = "",
  imgClassName = "",
  boxNumber,
  isLoading = false,
}) => {
  return (
    <div
      className={containerClassName + " m-0 p-0"}
      style={{
        position: "relative",
      }}
    >
      <img
        alt="..."
        src={leitnerBoxIcon}
        style={{ width: "30px" }}
        className={imgClassName + " "}
      />
      <span
        className="fs-6"
        style={{
          position: "absolute",
          right: "-6px",
          bottom: "-24px",
        }}
      >
        {!isLoading ? boxNumber : ""}
      </span>
    </div>
  );
};

const LeitnerShowLevel = ({
  box0,
  box1,
  box2,
  box3,
  box4,
  style = {},
  classes = "",
  currentItemBox = 1,
  isLoading = false,
}) => {
  // console.log(currentItemBox);
  return (
    <div
      dir="ltr"
      style={style}
      className={
        classes +
        " m-0 p-3 pt-2 d-flex flex-row justify-content-center align-items-stretch position-relative"
      }
    >
      <div className=" level-box m-0 p-3 d-flex flex-column justify-content-center align-items-center">
        <LeitnerIcon isLoading={isLoading} boxNumber={box0} />
      </div>
      <div className=" level-box m-0 p-3 d-flex flex-column justify-content-center align-items-center">
        <LeitnerIcon isLoading={isLoading} boxNumber={box1} />
      </div>
      <div className=" level-box m-0 p-3 d-flex flex-column justify-content-center align-items-center">
        <LeitnerIcon isLoading={isLoading} boxNumber={box2} />
      </div>
      <div className=" level-box m-0 p-3 d-flex flex-column justify-content-center align-items-center">
        <LeitnerIcon isLoading={isLoading} boxNumber={box3} />
      </div>
      <div className=" level-box m-0 p-3 d-flex flex-column justify-content-center align-items-center">
        <LeitnerIcon isLoading={isLoading} boxNumber={box4} />
      </div>
      {!isLoading && (
        <div
          style={{
            top: "70px",
            left: `calc((((100% - 2rem)/${5})*${currentItemBox}) - ((100% - 2rem)/${5})/2 + 0px)`,
            transition: ".5s",
          }}
          className="  px-1 position-absolute"
        >
          <KeyboardArrowUpIcon color="primary" />
        </div>
      )}
    </div>
  );
};

export default LeitnerShowLevel;
