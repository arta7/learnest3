import React, { useState, useEffect } from "react";

import "./question.ynb.styles.scss";

import YnbChoose from "./components/ynb-choose/ynb-choose.component";
import YnbChooseRepeat from "./components/ynb-chooseRepeat/ynb-chooseRepeat.component";
import YnbTyping from "./components/ynb-typing/ynb-typing.component";
import YnbRecordVoice from "./components/ynb-recordVoice/ynb-recordVoice.component";
import YnbSort from "./components/ynb-sort/ynb-sort.component";

const YnbQuestion = ({
  id,
  title,
  content,
  voiceUrl,
  videoUrl,
  imageUrl,
  difficulty,
  hiddenContent,
  data,
  typeId,
  baseAnsweringType,
  answerSheetCorrection,
  gotoNextQuestion,
  ...rest
}) => {
  // useEffect(() => {
  //   console.log(rest?.isLastQuestion);
  // }, [rest?.isLastQuestion]);
  return (
    <div className="m-0 p-0 d-flex flex-column justify-c-start align-items-stretch">
      {data.answeringType === 0 && (
        <YnbChoose
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          answerSheetCorrection={answerSheetCorrection}
          iterateToNextQuestion={gotoNextQuestion}
          isLastQuestion={rest?.isLastQuestion}
        />
      )}
      {data.answeringType === 1 && (
        <YnbChooseRepeat
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          iterateToNextQuestion={gotoNextQuestion}
          answerSheetCorrection={answerSheetCorrection}
          isLastQuestion={rest?.isLastQuestion}
        />
      )}
      {data.answeringType === 2 && (
        <YnbTyping
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          iterateToNextQuestion={gotoNextQuestion}
          answerSheetCorrection={answerSheetCorrection}
          isLastQuestion={rest?.isLastQuestion}
        />
      )}
      {data.answeringType === 3 && (
        <YnbRecordVoice
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          iterateToNextQuestion={gotoNextQuestion}
          answerSheetCorrection={answerSheetCorrection}
          isLastQuestion={rest?.isLastQuestion}
        />
      )}
      {data.answeringType === 4 && (
        <YnbSort
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          iterateToNextQuestion={gotoNextQuestion}
          answerSheetCorrection={answerSheetCorrection}
          isLastQuestion={rest?.isLastQuestion}
        />
      )}
    </div>
  );
};

export default YnbQuestion;
