import React, { useState, useEffect } from "react";

import MultiChoiceChoose from "./components/multiChoice_choose.component";
import MultiChoiceChooseRepeat from "./components/multiChoice_chooseRepeat.component";

import "./question.multichoice.styles.scss";

const MultiChoiceQuestion = (props) => {
  return (
    <div className="m-0 p-0 d-flex flex-column justify-c-start align-items-stretch">
      {props.data.answeringType === 0 && (
        <MultiChoiceChoose
          Data={props}
          iterateToNextQuestion={props?.gotoNextQuestion}
          answerSheetCorrection={props?.answerSheetCorrection}
          isLastQuestion={props?.isLastQuestion}
        />
      )}
      {props.data.answeringType === 1 && (
        <MultiChoiceChooseRepeat
          Data={props}
          iterateToNextQuestion={props?.gotoNextQuestion}
          answerSheetCorrection={props?.answerSheetCorrection}
          isLastQuestion={props?.isLastQuestion}
        />
      )}
    </div>
  );
};

export default MultiChoiceQuestion;
