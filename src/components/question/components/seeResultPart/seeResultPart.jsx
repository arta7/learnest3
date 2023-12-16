import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { answerToQuestion_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import useAnsweringMethods from "../useAnsweringMethods/useAnsweringMethods";
import SeeResultComponents from "../seeResultComponents/seeResultComponents";

const SeeResult = ({
  hiddenContent,
  contentType,
  answeringType,
  questionType,
  questionId,
  answerSheet,
  baseAnsweringType,
  typeId,
  gotoNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  //////////////////
  const { handleSeeResult, handleDontShowAgain, answeringResult } =
    useAnsweringMethods({
      contentType,
      answeringType,
      questionType,
      questionId,
      answerSheet,
      typeId,
      answerSheetCorrection,
      gotoNextQuestion,
      baseAnsweringType,
    });
  //////////////////
  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "11",
        backgroundColor: "#fff",
        boxShadow: "0 -2px 5px 2px #ccc",
      }}
      className="m-0 p-2 py-3 mx-auto d-flex flex-row justify-content-center align-items-baseline"
    >
      <SeeResultComponents
        answeringResult={answeringResult}
        hiddenContent={hiddenContent}
        contentType={contentType}
        answeringType={answeringType}
        questionType={questionType}
        questionId={questionId}
        answerSheet={answerSheet}
        baseAnsweringType={baseAnsweringType}
        typeId={typeId}
        gotoNextQuestion={gotoNextQuestion}
        answerSheetCorrection={answerSheetCorrection}
        isLastQuestion={isLastQuestion}
        handleSeeResult={handleSeeResult}
        handleDontShowAgain={handleDontShowAgain}
      />
    </div>
  );
};

export default SeeResult;
