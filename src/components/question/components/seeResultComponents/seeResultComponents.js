import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";

const SeeResultComponents = ({
  className = "",
  hiddenContent,
  baseAnsweringType,
  gotoNextQuestion,
  isLastQuestion,
  answeringResult,
  handleSeeResult,
  handleDontShowAgain,
}) => {
  const [showExplain, set_showExplain] = useState(false);
  /////////////////////
  const handleToggleExplainQuestion = () => {
    set_showExplain(!showExplain);
  };
  /////////////////////
  const getButtonText = () => {
    if (isLastQuestion) {
      if (baseAnsweringType === 3) {
        return "ادامه";
      }
      return "بازگشت";
    } else {
      return "سوال بعدی";
    }
  };
  /////////////////////
  const getHiddenContentText = (text) => {
    let str = text;
    if (text?.includes("\r\n")) {
      for (let i = 0; i < text?.split("\r\n")?.length - 1; i++) {
        str = str.replace("\r\n", "<br />");
      }
    }
    return str;
  };
  /////////////////////
  const hasHiddenContent = (hd) => {
    if (hd) {
      if (
        hd.toString().trim() !== "<p><br/></p>" &&
        hd.toString().trim() !== "" &&
        hd.toString().trim() !== "<p></p>" &&
        hd.toString().trim() !== "<p><br/><br/></p>"
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  /////////////////////
  const renderAudioComponent = () => {
    if (document.querySelector(".question-audio")) {
      const audioSrc = document
        .querySelector(".question-audio")
        .getElementsByTagName("source")[0]
        .getAttribute("src");
      if (audioSrc)
        return (
          <div className="mb-3 m-0 p-3">
            <audio controls className="w-100">
              <source src={audioSrc} />
            </audio>
          </div>
        );

      return <></>;
    }

    return <></>;
  };
  /////////////////////
  const handleAnswerAgain = () => {
    if (document.getElementById("answer-again-btn")) {
      document.getElementById("answer-again-btn").click();
    }
  };
  /////////////////////
  return (
    <div
      className={
        className +
        " w-100 m-0 p-0 d-flex flex-row justify-content-center align-items-baseline"
      }
    >
      {!answeringResult && baseAnsweringType !== 3 && (
        <Button variant="contained" color="primary" onClick={handleSeeResult}>
          مشاهده نتیجه
        </Button>
      )}
      {!answeringResult && baseAnsweringType === 3 && (
        <Button variant="contained" color="primary" onClick={handleSeeResult}>
          سوال بعدی
        </Button>
      )}

      {answeringResult && (
        <div className="m-0 w-100 gap-2 p-2 d-flex flex-row flex-wrap justify-content-center align-items-start">
          <>
            <Button
              className="  text-nowrap"
              variant="contained"
              color="primary"
              onClick={() => {
                gotoNextQuestion(parseInt(answeringResult?.status) === 1);
              }}
            >
              {getButtonText()}
            </Button>
            {hasHiddenContent(hiddenContent) && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleExplainQuestion}
                endIcon={<VisibilityIcon className="ms-2" fontSize="small" />}
                className="text-nowrap"
              >
                پاسخنامه تشریحی
              </Button>
            )}
          </>

          {parseInt(answeringResult?.status) === 0 && baseAnsweringType !== 3 && (
            <>
              <Button
                className="m-0  text-nowrap"
                variant="outlined"
                color="primary"
                onClick={handleDontShowAgain}
              >
                دیگر این سوال را نشان نده
              </Button>
              <Button
                className="text-nowrap"
                variant="contained"
                color="primary"
                onClick={handleAnswerAgain}
              >
                پاسخ دهی مجدد
              </Button>
            </>
          )}
        </div>
      )}
      {hiddenContent && (
        <Dialog onClose={handleToggleExplainQuestion} open={showExplain}>
          {renderAudioComponent()}
          <div
            dir={"auto"}
            className="m-0 p-3 answersheet-explanations"
            style={{
              minHeight: "300px",
              minWidth: "250px",
            }}
          >
            {parse(
              getHiddenContentText(hiddenContent)
                ?.toString()
                ?.replaceAll("<p>", '<p dir="auto">')
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default SeeResultComponents;
