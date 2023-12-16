import React, { useState, useEffect } from "react";
import { Button, DialogActions } from "@mui/material";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../../core/contexts/buyCourseContext/buyCourseContext";

const AutomaticClassMateSearch = (props) => {
  const { factor } = useBuyCourseState();
  const { dispatchFactor } = useBuyCourseDispatch();
  useEffect(() => {}, []);

  return (
    <div className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div className="set-gender my-2 d-flex flex-column justify-content-start align-items-start">
        <div className="fs-6 fw-bold">
          لطفا جنسیت همکلاسی های خود را تعیین کنید .
        </div>
        <div className="d-flex flex-row justify-content-start align-items-stretch">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatchFactor({ type: actions.SETGENDER, payload: 1 });
            }}
          >
            مرد
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatchFactor({ type: actions.SETGENDER, payload: 1 });
            }}
          >
            زن
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatchFactor({ type: actions.SETGENDER, payload: 1 });
            }}
          >
            مهم نیست
          </Button>
        </div>
      </div>

      <div className="set-age-range my-2"></div>
    </div>
  );
};

export default AutomaticClassMateSearch;
