import React, { useState, useEffect, useLayoutEffect } from "react";
import "./question.conversation.styles.scss";

import ConversationChoose from "./components/conversation-choose/conversation-choose.component";
import ConversationChooseRepeat from "./components/conversation-choose-repeat/conversation-choose-repeat.component";
import ConversationRecordVoice from "./components/conversation-recordVoice/conversation-recordVoice.component";
import ConversationTyping from "./components/conversation-typing/conversation-typing.component";

const ConversationQuestion = ({
  id,
  title,
  content,
  voiceUrl,
  videoUrl,
  imageUrl,
  difficulty,
  data,
  typeId,
  baseAnsweringType,
  answerSheetCorrection,
  gotoNextQuestion,
  hiddenContent,
  isLastQuestion,
}) => {
  const [answeringType, set_answeringType] = useState(data?.answeringType);

  return (
    <div className="m-0 p-0 d-flex flex-column justify-c-start align-items-stretch">
      {data.answeringType === 0 && (
        <ConversationChoose
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          answerSheetCorrection={answerSheetCorrection}
          iterateToNextQuestion={gotoNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
      {data.answeringType === 2 && (
        <ConversationTyping
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          answerSheetCorrection={answerSheetCorrection}
          iterateToNextQuestion={gotoNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
      {data.answeringType === 1 && (
        <ConversationChooseRepeat
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          answerSheetCorrection={answerSheetCorrection}
          iterateToNextQuestion={gotoNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
      {data.answeringType === 3 && (
        <ConversationRecordVoice
          Data={{
            ...data,
            id: id,
            typeId: typeId,
            baseAnsweringType: baseAnsweringType,
            hiddenContent: hiddenContent,
          }}
          answerSheetCorrection={answerSheetCorrection}
          iterateToNextQuestion={gotoNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};

export default ConversationQuestion;
