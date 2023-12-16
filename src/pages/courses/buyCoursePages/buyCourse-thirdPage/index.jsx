import React, { useState, useEffect } from "react";
import CustomizedTabPanel from "./components/customTabpanel.component";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import "./styles/styles.scss";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";

const BuyCourseThirdPage = (props) => {
  const { factor } = useBuyCourseState();
  const { dispatchFactor } = useBuyCourseDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (factor.courseId === 0) {
      navigate(-2);
    }
    dispatchFactor({ type: actions.SETSTEP, payload: 2 });
  }, []);

  const gotoNextStep = () => {
    dispatchFactor({ type: actions.SETSTEP, payload: 3 });
    navigate("/buyCourseFourthPage");
  };

  return (
    <div className="m-0 p-0" dir="ltr">
      <CustomizedTabPanel />
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        className=" py-3 mx-auto d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          style={{
            width: "calc(100% - 2rem)",
          }}
          variant="contained"
          color="primary"
          onClick={gotoNextStep}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default BuyCourseThirdPage;
