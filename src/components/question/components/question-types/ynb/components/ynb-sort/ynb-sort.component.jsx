import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import "./ynb-sort.styles.scss";
import { fileBaseUrl } from "../../../../../../../core/services/baseUrl";
import AnsweringPart from "../../../../answering-part/answeringPart.component";
import SeeResult from "../../../../seeResultPart/seeResultPart";
import QuestionFinalResult from "../../../../questionFinalResult/questionFinalResult";

const YnbSort = ({
  Data,
  iterateToNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  const [currentAnswer, set_currentAnswer] = useState(null);
  const [answerSheet, set_answerSheet] = useState([]);
  const [showSeeResult, set_showSeeResult] = useState(false);
  const [options, set_options] = useState([]);

  const handle_clearAll = () => {
    set_options(Data.data);
    set_answerSheet([]);
    set_showSeeResult(false);
  };

  useEffect(() => {
    const arr = [];
    Data.data.forEach((q) => {
      arr.push(q);
    });
    set_options(arr);
  }, []);

  useEffect(() => {
    if (answerSheet.length === Data.data.length) {
      set_showSeeResult(true);
    } else {
      set_showSeeResult(false);
    }
  }, [answerSheet]);

  const handle_selectAnswer = (answer) => {
    const newAnswerSheet = [...answerSheet];

    let exists = false;
    for (let i = 0; i < newAnswerSheet.length; i++) {
      if (newAnswerSheet[i].id === answer.id) {
        exists = true;

        newAnswerSheet.splice(i, 1);
        set_answerSheet(newAnswerSheet);
        const newOptions = [...options];
        newOptions.push(answer);
        set_options(newOptions);
        break;
      }
    }

    if (!exists) {
      newAnswerSheet.push(answer);
      set_answerSheet(newAnswerSheet);

      const newOptions = [...options];
      const index = options.indexOf(answer);
      newOptions.splice(index, 1);

      set_options(newOptions);
    }
  };

  const getValue = (qid) => {
    if (answerSheet.length === 0) return undefined;

    for (let i = 0; i < answerSheet.length; i++) {
      if (qid === answerSheet[i].questionId) {
        const answer = answerSheet[i].answer;
        const value = Data.options.find((item) => item === answer);

        return value;
      }
    }
  };

  return (
    <div className="ynb-text-content">
      <div dir="ltr" className="my-2 ynb-q">
        {!Data?.mixedAnswers &&
          answerSheet.length > 0 &&
          answerSheet.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                handle_selectAnswer(q);
              }}
              className={" transition-1 cursor-pointer my-2"}
            >
              {parseInt(Data.contentType) === 0 && q.body}
              {parseInt(Data.contentType) === 1 && (
                <div
                  style={{
                    boxShadow: " 0 2px 5px 2px #ddd ",
                    borderRadius: ".8rem",
                  }}
                  className="border-bottom m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-start position-relative "
                >
                  <img
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                    src={fileBaseUrl + q.body}
                    alt="..."
                    className="m-0 p-0 "
                  />
                </div>
              )}
            </div>
          ))}

        {Data?.mixedAnswers && (
          <QuestionFinalResult
            questionType={0}
            mixedAnswers={Data?.mixedAnswers}
            contentType={Data?.contentType}
          />
        )}
      </div>
      <div className="ynb-answer mt-3">
        <AnsweringPart
          states={{
            options,
            contentType: Data.contentType,
            answeringType: Data.answeringType,
          }}
          clickHandlers={{
            handle_selectAnswer,
          }}
          seetrueanswerprops={{
            contentType: Data.contentType,
            answeringType: Data.answeringType,
            questionType: 0,
            questionId: Data.id,
            answerSheet: answerSheet,
            baseAnsweringType: Data?.baseAnsweringType,
            typeId: Data?.typeId,
            gotoNextQuestion: iterateToNextQuestion,
            answerSheetCorrection,
            isLastQuestion: isLastQuestion,
            hiddenContent: Data?.hiddenContent,
          }}
        />
      </div>
      {answerSheet.length > 0 && !showSeeResult && !Data?.mixedAnswers && (
        <Button onClick={handle_clearAll} variant="contained">
          پاک کردن همه
        </Button>
      )}
      {showSeeResult && (
        <SeeResult
          isLastQuestion={isLastQuestion}
          hiddenContent={Data?.hiddenContent}
          answerSheetCorrection={answerSheetCorrection}
          typeId={Data.typeId}
          baseAnsweringType={Data.baseAnsweringType}
          gotoNextQuestion={iterateToNextQuestion}
          questionId={Data.id}
          questionType={0}
          contentType={Data.contentType}
          answeringType={Data.answeringType}
          answerSheet={answerSheet}
        />
      )}
    </div>
  );
};

export default YnbSort;
