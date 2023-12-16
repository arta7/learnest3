import { Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";

import parse from "html-react-parser";

import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AppTour from "../../../appTour/appTours.component";

const QuestionLinkItem = ({
  id,
  isCorrect,
  tryCounter,
  isBold,
  slideTo,
  questionIndex,
  title,
  isPervoiusQuestionCorrect,
  closeDialog,
}) => {
  const handleClick = () => {
    if (
      (tryCounter === 0 && isBold) ||
      tryCounter > 0 ||
      isPervoiusQuestionCorrect
    ) {
      slideTo(questionIndex);
      closeDialog();
    }
  };
  return (
    <div
      dir="auto"
      onClick={handleClick}
      className="rounded rounded-3 border cursor-pointer m-0 my-2 p-2 d-flex flex-row justify-content-start align-items-stretch"
    >
      <span
        style={{
          display: "inline-block",
          minWidth: "18px",
        }}
      >
        {tryCounter > 0 && isCorrect === true && (
          <CheckBoxIcon fontSize="small" color="success" />
        )}
        {tryCounter > 0 && isCorrect === false && (
          <DangerousIcon fontSize="small" color="error" />
        )}
      </span>
      <div
        className={
          (isBold ? "fw-600" : "") +
          (tryCounter === 0 && !isBold ? " text-muted " : "  ") +
          " fs-6 mx-2"
        }
      >
        {parse(title.toString())}
      </div>
    </div>
  );
};

const QuestionsNavModal = ({ questions, currentQuestion, slideTo }) => {
  const [show, set_show] = useState(false);
  const toggle = () => {
    set_show(!show);
  };

  const getIsPervoiusQuestionCorrect = (index) => {
    if (index === 0) return false;
    else if (index > 0)
      if (questions[index - 1].isCorrect === true) return true;

    return false;
  };

  return (
    <>
      <AppTour page="questionPage" />
      <div
        id="questionsList"
        onClick={toggle}
        className="d-flex flex-column justify-content-start align-items-center"
      >
        <span className="cursor-pointer">
          {questions?.length > 0 &&
            currentQuestion &&
            questions.findIndex(
              (item) =>
                item?.id === currentQuestion.id &&
                item?.questionType === currentQuestion.questionType
            ) +
              1 +
              "/" +
              questions?.length}
        </span>
        <span className="m-0 p-0" style={{ fontSize: "0.5rem" }}>
          مشاهده سوالات
        </span>
      </div>
      <Dialog open={show} onClose={toggle}>
        <div
          style={{
            minWidth: "320px",
            maxHeight: "80vh",
          }}
          className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch"
        >
          {questions?.length > 0 &&
            questions?.map((item, index) => (
              <QuestionLinkItem
                key={item.id}
                id={item.id}
                isPervoiusQuestionCorrect={getIsPervoiusQuestionCorrect(index)}
                isCorrect={item.isCorrect}
                tryCounter={item.tryCounter}
                title={item.title}
                isBold={
                  questions.findIndex(
                    (item) =>
                      item?.id === currentQuestion?.id &&
                      item?.questionType === currentQuestion.questionType
                  ) === index ||
                  (item.tryCounter === 0 && getIsPervoiusQuestionCorrect(index))
                }
                questionIndex={index}
                slideTo={slideTo}
                closeDialog={toggle}
              />
            ))}
        </div>
      </Dialog>
    </>
  );
};

export default QuestionsNavModal;
