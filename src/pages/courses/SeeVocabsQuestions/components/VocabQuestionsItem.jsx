import React, { useState } from "react";
import "./style/style.css";

const VocabQuestionsItem = ({
  qustionId,
  qustionTitle,
  answers,
  correctAnswer,
  handleIncrementTrueAnswers,
  set_showNextButton,
  handle_addToAnswerSheet,
}) => {
  const [selectedValue, set_selectedValue] = useState(null);
  const handleChange = (e) => {
    set_selectedValue(e);
    handle_addToAnswerSheet({ id: qustionId, meaning: e });

    if (e === correctAnswer) {
      handleIncrementTrueAnswers();
    }
    set_showNextButton(true);
  };

  const getTruthy = (item) => {
    if (selectedValue) {
      if (selectedValue === item && selectedValue === correctAnswer) {
        return "selected-true-answer";
      } else if (selectedValue === item && selectedValue !== correctAnswer) {
        return "selected-wrong-answer";
      } else if (item === correctAnswer) {
        return "notselected-true-answer";
      } else {
        return "";
      }
    }
    return "";
  };

  return (
    <div className="m-0 p-3 mx-auto my-auto vocab-question-item-holder">
      <div className="fs-6 my-2">کدام گزینه معنی لغت زیر میباشد ؟</div>
      <div className="p-0 m-0 mx-auto my-auto vocab-info-holder">
        <span className="mx-auto question-holder">{qustionTitle}</span>
      </div>
      <div className="answers-holder">
        {answers?.map((item, index) => (
          <label
            key={index}
            htmlFor={index + "-" + qustionId}
            className={
              getTruthy(item) + " p-0 m-0 py-1 my-1 px-3 py-2 input-holder "
            }
          >
            <input
              disabled={selectedValue && selectedValue}
              onChange={(e) => {
                handleChange(item);
              }}
              id={index + "-" + qustionId}
              name={"answer-input-" + qustionId}
              type="radio"
              className="px-1 mx-1"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default VocabQuestionsItem;
