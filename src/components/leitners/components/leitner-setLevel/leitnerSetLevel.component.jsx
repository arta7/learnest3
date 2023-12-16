import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

//left icons
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

//right icons
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const LeitnerSetLevel = ({ onSetLevel, classes }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        maxWidth: "800px",
      }}
      className={
        classes +
        " mx-auto m-0 px-3 py-2 d-flex flex-row justify-content-between align-items-stretch"
      }
    >
      <div className="m-0 p-2 col-6 d-flex flex-column justify-content-start align-items-stretch">
        <Button
          className="py-2 fs-6"
          startIcon={<KeyboardDoubleArrowRightIcon className="me-1" />}
          variant="contained"
          color="success"
          onClick={() => {
            onSetLevel(2);
          }}
        >
          کاملا بلدم
        </Button>
        <Button
          className="py-2 mt-2 fs-6"
          startIcon={<KeyboardArrowRightIcon className="me-1" />}
          variant="contained"
          color="primary2"
          onClick={() => {
            onSetLevel(1);
          }}
        >
          بلدم
        </Button>
      </div>
      <div className="m-0 p-2 col-6 d-flex flex-column justify-content-start align-items-stretch">
        <Button
          className="py-2 fs-6"
          endIcon={<KeyboardArrowLeftIcon className="ms-1" />}
          variant="contained"
          color="primary"
          onClick={() => {
            onSetLevel(-1);
          }}
        >
          کمی بلدم
        </Button>
        <Button
          className="py-2 mt-2 fs-6"
          endIcon={<KeyboardDoubleArrowLeftIcon className="ms-1" />}
          variant="contained"
          color="error"
          onClick={() => {
            onSetLevel(-2);
          }}
        >
          بلد نیستم
        </Button>
      </div>
    </div>
  );
};

export default LeitnerSetLevel;

/*
  <div className="m-0 p-2 col-3 d-flex flex-column justify-content-center align-items-stretch">
        <Button
          className="py-2 fs-6"
          startIcon={<KeyboardDoubleArrowRightIcon className="me-1" />}
          variant="contained"
          color="primary"
          onClick={() => {
            onSetLevel(2);
          }}
        >
          کاملا بلدم
        </Button>
      </div>
      <div className="m-0 p-2 col-3 d-flex flex-column justify-content-center align-items-stretch">
        <Button
          className="py-2 fs-6"
          startIcon={<KeyboardArrowRightIcon className="me-1" />}
          variant="contained"
          color="primary"
          onClick={() => {
            onSetLevel(1);
          }}
        >
          بلدم
        </Button>
      </div>
      <div className="m-0 p-2 col-3 d-flex flex-column justify-content-center align-items-stretch">
        <Button
          className="py-2 fs-6"
          endIcon={<KeyboardArrowLeftIcon className="ms-1" />}
          variant="contained"
          color="error"
          onClick={() => {
            onSetLevel(-1);
          }}
        >
          کمی بلدم
        </Button>
      </div>
      <div className="m-0 p-2 col-3 d-flex flex-column justify-content-center align-items-stretch">
        <Button
          className="py-2 fs-6"
          endIcon={<KeyboardDoubleArrowLeftIcon className="ms-1" />}
          variant="contained"
          color="error"
          onClick={() => {
            onSetLevel(-2);
          }}
        >
          بلد نیستم
        </Button>
      </div>
*/
