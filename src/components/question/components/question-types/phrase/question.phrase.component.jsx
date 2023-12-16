import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import "./question.phrase.styles.scss";
import AnsweringPart from "../../answering-part/answeringPart.component";
import SeeResult from "../../seeResultPart/seeResultPart";
import QuestionFinalResult from "../../questionFinalResult/questionFinalResult";

const PhraseQuestion = ({
  id,
  data,
  questionType,
  typeId,
  hiddenContent,
  baseAnsweringType,
  gotoNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
  ...rest
}) => {
  const [currentField, set_currentField] = useState(0);
  const [answerSheet, set_answerSheet] = useState([]);
  const [showSeeResult, set_showSeeResult] = useState(false);
  const [phrase, set_phrase] = useState([]);

  const createFieldsArray = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push("##");
    }

    return arr;
  };

  const setInitializeStates = () => {
    set_phrase(data?.phrase);
    set_answerSheet({
      questionId: id,
      answerArray: createFieldsArray(data.phrase.length),
    });
  };

  useEffect(() => {
    if (data?.phrase) {
      setInitializeStates();
    }
  }, [data]);

  useEffect(() => {
    if (!answerSheet?.answerArray?.includes("##")) {
      set_showSeeResult(true);
    } else {
      set_showSeeResult(false);
    }
  }, [answerSheet]);

  const handle_selectAnswer = (option) => {
    const newAnswerSheet = { ...answerSheet };
    newAnswerSheet.answerArray[currentField] = option;

    set_answerSheet(newAnswerSheet);

    const newOptions = [...phrase];
    const indexx = phrase.indexOf(option);
    newOptions.splice(indexx, 1);
    set_phrase(newOptions);

    gotoNextField();
  };

  const gotoNextField = () => {
    if (answerSheet?.answerArray?.length === 0) return;
    for (let i = 0; i < answerSheet?.answerArray.length; i++) {
      if (answerSheet?.answerArray[i] === "##") {
        set_currentField(i);
        return;
      }
    }

    set_currentField(null);
    set_showSeeResult(true);
  };

  const handle_selectField = (fi, indx) => {
    set_currentField(indx);

    const newAnswerSheet = { ...answerSheet };
    const newPhrases = [...phrase];

    if (newAnswerSheet.answerArray[indx] !== "##") {
      newPhrases.push(newAnswerSheet.answerArray[indx]);
      set_phrase(newPhrases);
    }

    newAnswerSheet.answerArray[indx] = "##";
    set_answerSheet(newAnswerSheet);
  };

  const getQBody = (q) => {
    return currentField?.id === q.id ? "___________" : "_______";
  };

  const handleClear = () => {
    setInitializeStates();
  };
  return (
    <div className="">
      <div
        style={{ height: "50px" }}
        className="phrase-question d-flex flex-row justify-content-start align-items-end flex-wrap"
      >
        {!data?.mixedAnswers &&
          answerSheet?.answerArray?.map((item, index) => (
            <div
              id={index}
              key={index}
              onClick={() => {
                handle_selectField(item, index);
              }}
              className={
                (currentField === index
                  ? " fs-6 mx-3 align-self-center "
                  : "  mx-2 fs-7") + " transiion-1 cursor-pointer my-2"
              }
            >
              {item === "##" ? item.replaceAll("##", getQBody(item)) : item}
            </div>
          ))}
        {data?.mixedAnswers && (
          <QuestionFinalResult
            questionType={4}
            mixedAnswers={data?.mixedAnswers}
          />
        )}
      </div>
      {!data?.mixedAnswers && (
        <div
          dir="ltr"
          className="phrase-answer mt-3 d-flex flex-row justify-content-start align-items-center"
        >
          <AnsweringPart
            states={{
              answeringType: 0,
              questionType: 4,
              options: phrase,
            }}
            clickHandlers={{
              handle_selectAnswer,
            }}
            seetrueanswerprops={{
              contentType: data.contentType,
              answeringType: -1,
              questionType: 4,
              questionId: id,
              answerSheet: answerSheet,
              baseAnsweringType: baseAnsweringType,
              typeId: typeId,
              gotoNextQuestion: gotoNextQuestion,
              answerSheetCorrection,
              isLastQuestion: isLastQuestion,
              hiddenContent: hiddenContent,
            }}
          />
        </div>
      )}
      {!data?.mixedAnswers && phrase?.length < data?.data?.phrase?.length && (
        <Button variant="outlined" color="primary" onClick={handleClear}>
          پاک کردن همه
        </Button>
      )}

      {(data?.mixedAnswers || showSeeResult) && (
        <SeeResult
          hiddenContent={hiddenContent}
          answerSheetCorrection={answerSheetCorrection}
          gotoNextQuestion={gotoNextQuestion}
          typeId={typeId}
          baseAnsweringType={baseAnsweringType}
          contentType={data.contentType}
          questionId={id}
          answerSheet={answerSheet}
          questionType={4}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};

export default PhraseQuestion;
