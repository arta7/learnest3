import React, { useState, useEffect } from "react";

import ConversationQuestion from "./components/question-types/conversation/question.conversation.component";
import MultiChoiceQuestion from "./components/question-types/multi-choice/question.multichoice.component";
import PhraseQuestion from "./components/question-types/phrase/question.phrase.component";
import YnbQuestion from "./components/question-types/ynb/question.ynb.component";

import TwoStepQuestion from "./components/twoStepQuestion.component";
import ThreeStepQuestion from "./components/threeStepQuestion.component";

import "./question.styles.scss";

const QuestionContainer = ({ ...rest }) => {
  const {
    id,
    title,
    content,
    voiceUrl,
    videoUrl,
    imageUrl,
    difficulty,
    data,
    questionType,
    typeId,
    baseAnsweringType,
    answerSheetCorrection,
    gotoNextQuestion,
    isLastQuestion,
  } = rest;

  return (
    <>
      {(questionType === 0 || questionType === 1) && (
        <ThreeStepQuestion {...rest}>
          {questionType === 0 && <YnbQuestion {...rest} />}
          {questionType === 1 && <ConversationQuestion {...rest} />}
        </ThreeStepQuestion>
      )}
      {(questionType === 3 || questionType === 4) && (
        <TwoStepQuestion {...rest}>
          {questionType === 3 && <MultiChoiceQuestion {...rest} />}
          {questionType === 4 && <PhraseQuestion {...rest} />}
        </TwoStepQuestion>
      )}
    </>
  );
};

export default QuestionContainer;
