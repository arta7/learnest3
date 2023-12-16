import React, { useState, useEffect } from "react";
import { useBuyCourseState } from "../../contexts/buyCourseContext/buyCourseContext";
import BuyCourseStepper from "./stepper.component";
import "./style.scss";

const BuyCourseLayout = (props) => {
  const { factor } = useBuyCourseState();

  return (
    <section className="p-3 d-flex flex-column justify-content-start align-items-stretch">
      <header
        dir="ltr"
        className="w-100 m-0 mb-3 p-0 d-flex flex-row justify-content-center align-items-center"
      >
        <div dir="ltr" className="steps-container">
          <div className={" step-item step-compeleted"}>1</div>
          <span className="step-space"></span>
          <span className="step-connector"></span>
          <span className="step-space"></span>
          <div
            className={
              ((factor.step === 2 || factor.step === 3) && "step-compeleted") +
              " step-item"
            }
          >
            2
          </div>
          <span className="step-space"></span>
          <span className="step-connector"></span>
          <span className="step-space"></span>
          <div
            className={(factor.step === 3 && "step-compeleted") + " step-item"}
          >
            3
          </div>
        </div>
      </header>
      {props.children}
    </section>
  );
};

export default BuyCourseLayout;
