import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { fileBaseUrl } from "../../../../../../core/services/baseUrl";
import { createArrayByLength } from "../../../../../../core/utils/utils";
import QuestionFinalResult from "../../../questionFinalResult/questionFinalResult";
import SeeResult from "../../../seeResultPart/seeResultPart";
import MultiChoiceSeeTrueAnswers from "../multiChoiceSeeTrueAnswers.component";

const MultiChoiceChoose = ({
  Data,
  iterateToNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  const [answerSheet, set_answerSheet] = useState({
    questionId: Data.id,
    answerArray: [null],
  });
  const [showSeeResult, set_showSeeResult] = useState(false);

  const [options, set_options] = useState(Data.data.options);

  const handle_selectAnswer = (option) => {
    const newAnswerSheet = { ...answerSheet };

    setTimeout(
      () => {
        newAnswerSheet.answerArray = [];
        newAnswerSheet.answerArray.push(option.id);
        set_answerSheet(newAnswerSheet);
      },
      Data.data.contentType === 1 ? 250 : 0
    );
  };

  const handleChange = (e) => {
    const id = e.target.id;
    handle_selectAnswer({ id });
  };

  return (
    <div className=" mb-6">
      <div
        dir="ltr"
        className="my-2  d-flex flex-column justify-content-start align-items-start"
      >
        {!Data?.data?.mixedAnswers &&
          options?.length > 0 &&
          options?.map((option, index) => (
            <div
              key={option.id}
              className={
                (answerSheet?.answerArray[0]?.toString() ===
                option.id?.toString()
                  ? "answer-selected"
                  : "not-selected") +
                " multichoice-option  cursor-pointer my-2 d-flex flex-row justify-content-start align-items-center"
              }
            >
              <input
                onChange={handleChange}
                id={option.id}
                type={"radio"}
                name="multiChoice"
              />
              <label htmlFor={option.id} className="me-2 fs-6">
                {Data?.data?.contentType === 0 && option.content}
                {Data?.data?.contentType === 1 && (
                  <img
                    style={{ maxHeight: "200px", maxWidth: "100%" }}
                    src={fileBaseUrl + option?.content}
                    alt="..."
                  />
                )}
              </label>
            </div>
          ))}
        {Data?.data?.mixedAnswers && (
          <QuestionFinalResult
            questionType={3}
            mixedAnswers={Data?.data?.mixedAnswers}
            contentType={Data?.data?.contentType}
          />
        )}
      </div>

      {!answerSheet?.answerArray[0] && (
        <MultiChoiceSeeTrueAnswers
          seetrueanswerprops={{
            contentType: Data.contentType,
            answeringType: 0,
            questionType: 3,
            questionId: Data.id,
            answerSheet: answerSheet,
            baseAnsweringType: Data?.baseAnsweringType,
            typeId: Data?.typeId,
            gotoNextQuestion: iterateToNextQuestion,
            answerSheetCorrection: answerSheetCorrection,
            isLastQuestion: isLastQuestion,
            hiddenContent: Data?.hiddenContent,
          }}
        />
      )}

      {answerSheet?.answerArray[0] && (
        <div className="see-result cursor-pointer justify-self-center mx-auto text-center mt-4">
          <SeeResult
            isLastQuestion={isLastQuestion}
            hiddenContent={Data?.hiddenContent}
            answerSheetCorrection={answerSheetCorrection}
            gotoNextQuestion={iterateToNextQuestion}
            baseAnsweringType={Data?.baseAnsweringType}
            typeId={Data?.typeId}
            questionType={3}
            answeringType={0}
            contentType={Data.contentType}
            questionId={Data.id}
            answerSheet={answerSheet}
          />
        </div>
      )}
    </div>
  );
};

export default MultiChoiceChoose;
