import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useSeeResultMethods from "../../useAnsweringMethods/useAnsweringMethods";
import SeeResultComponents from "../../seeResultComponents/seeResultComponents";
///
const MultiChoiceSeeTrueAnswers = ({ seetrueanswerprops }) => {
  const getStyles = () => {
    return {
      position: "fixed",
      bottom: "0",
      right: "0",
      left: "0",
      margin: "0 auto",
      width: "100%",
      maxWidth: "800px",
      zIndex: "10",
      boxShadow: "rgb(204 204 204) 0px -2px 5px 2px",
    };
  };

  const { handleSeeCorrectedAnswer, handleDontShowAgain, answeringResult } =
    useSeeResultMethods(seetrueanswerprops);

  return (
    <>
      {answeringResult && (
        <div
          style={getStyles()}
          className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch"
        >
          <SeeResultComponents
            className={"py-2 px-2"}
            answeringResult={answeringResult}
            handleDontShowAgain={handleDontShowAgain}
            {...seetrueanswerprops}
          />
        </div>
      )}
      {!answeringResult && seetrueanswerprops?.baseAnsweringType !== 3 && (
        <div
          style={getStyles()}
          className="m-0 p-2 py-3 bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch"
        >
          <Button
            onClick={handleSeeCorrectedAnswer}
            color="primary"
            variant="contained"
            className="mx-2"
          >
            مشاهده پاسخ صحیح
          </Button>
        </div>
      )}
    </>
  );
};

export default MultiChoiceSeeTrueAnswers;
