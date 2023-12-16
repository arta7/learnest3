import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import useRecorder from "../../../../../../../core/custom-hooks/useRecorder";

// import "./ynb-choose.styles.scss";
import { imagesBaseUrl } from "../../../../../../../core/services/baseUrl";
import AnsweringPart from "../../../../answering-part/answeringPart.component";
import {
  createArrayByLength,
  getShouldBeScrolled,
} from "../../../../../../../core/utils/utils";
import SeeResult from "../../../../seeResultPart/seeResultPart";
import QuestionFinalResult from "../../../../questionFinalResult/questionFinalResult";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ConversationRecordVoice = ({
  Data,
  iterateToNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  const [currentQuestion, set_currentQuestion] = useState(Data.data[0]);
  const [answerSheet, set_answerSheet] = useState([]);
  const [showSeeResult, set_showSeeResult] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [options, set_options] = useState(Data.options);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    const arr = [];
    Data.data.forEach((q) => {
      arr.push({
        questionId: q.id,
        answerArray: createArrayByLength(q.body.split("##").length - 1, null),
      });
    });
    set_answerSheet(arr);
  }, []);

  useEffect(() => {
    if (answerSheet.length === 0) return;

    let isFull = true;
    for (let i = 0; i < answerSheet.length; i++) {
      if (Data.contentType === 1) {
        if (!answerSheet[i].answerArray[0]) {
          isFull = false;
        }
      } else {
        if (answerSheet[i].answerArray.includes(null)) {
          isFull = false;
        }
      }
    }

    set_showSeeResult(isFull);
  }, [answerSheet]);

  const handle_selectAnswer = (option) => {
    const newAnswerSheet = [...answerSheet];
    let shouldGoNext = true;

    const shouldBeScrolled = getShouldBeScrolled();
    if (shouldBeScrolled)
      document
        .getElementById(currentQuestion.id.toString())
        .scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(
      () => {
        newAnswerSheet.every((q) => {
          if (q.questionId === currentQuestion.id) {
            if (Data.contentType === 1) {
              q.answerArray.push(option);
              shouldGoNext = true;
            } else {
              for (let i = 0; i < q.answerArray.length; i++) {
                if (q.answerArray[i] === null) {
                  q.answerArray[i] = option;
                  break;
                }
              }

              if (q.answerArray.includes(null)) {
                shouldGoNext = false;
              }
            }
            return false;
          }

          return true;
        });

        set_answerSheet(newAnswerSheet);

        if (shouldGoNext) gotoNextQuestion();
      },
      shouldBeScrolled ? 250 : 0
    );
  };

  const handle_selectQuestion = (question) => {
    set_currentQuestion(question);

    const newAnswerSheet = [...answerSheet];

    newAnswerSheet.every((q) => {
      if (q.questionId === question.id) {
        if (Data.contentType === 1) {
          q.answerArray = [];
        } else {
          q.answerArray = q.answerArray.map((item) => null);
        }
        return false;
      }
      return true;
    });

    set_answerSheet(newAnswerSheet);
  };

  const gotoNextQuestion = () => {
    if (answerSheet.length === 0) return;

    for (let i = 0; i < answerSheet.length; i++) {
      if (Data.contentType === 1) {
        if (!answerSheet[i].answerArray[0]) {
          const qid = answerSheet[i].questionId;
          const question = Data.data.find((item) => item.id === qid);
          set_currentQuestion(question);
          return;
        }
      } else {
        if (answerSheet[i].answerArray.includes(null)) {
          const qid = answerSheet[i].questionId;
          const question = Data.data.find((item) => item.id === qid);
          set_currentQuestion(question);
          return;
        }
      }
    }

    set_currentQuestion(null);
    set_showSeeResult(true);
  };

  const bold = (str, color = "inherit") => {
    return `<strong style="color:${color};" class="fs-5"> ${str} </strong>`;
  };

  const getBodyPartValue = (question, partIndex) => {
    if (answerSheet.length === 0) return undefined;

    for (let i = 0; i < answerSheet.length; i++) {
      if (question.id === answerSheet[i].questionId) {
        if (Data.contentType === 1) {
          return answerSheet[i].answerArray[0];
        }
        const answers = answerSheet[i].answerArray;
        const paretAnswer = answers[partIndex];
        return paretAnswer;
      }
    }
  };

  const getConvertedBody = (question) => {
    if (Data.contentType === 1) {
      const answer = getBodyPartValue(question, 0);

      if (!answer)
        return currentQuestion?.id === question.id ? "___________" : "_______";
      else {
        return answer;
      }
    }

    // **************** Old Replacement Method

    // let str = question.body;
    // const emptyPlaces = question.body.split("##").length - 1;
    // for (let i = 0; i < emptyPlaces; i++) {
    //   const partAnswer = getBodyPartValue(question, i);
    //   str = str.replace("##", partAnswer ? bold(partAnswer) : "_______");
    // }

    // **************** New Replacement Method
    let str = question.body;
    if (question.body?.includes("\r\n")) {
      for (let i = 0; i < question.body?.split("\r\n")?.length - 1; i++) {
        str = str.replace("\r\n", "<br />");
      }
    }
    const emptyPlaces = question.body.split("##").length - 1;
    const isCurrentQuestion = question?.id === currentQuestion?.id;

    for (let i = 0; i < emptyPlaces; i++) {
      const partAnswer = getBodyPartValue(question, i);
      if (isCurrentQuestion) {
        /// filled fields count
        let emptyIndex = undefined;
        for (let j = 0; j < emptyPlaces; j++) {
          const isFilled = getBodyPartValue(question, j);
          if (!isFilled) {
            emptyIndex = j;
            break;
          }
        }
        if (i === emptyIndex) {
          str = str.replace(
            "##",
            partAnswer ? bold(partAnswer) : bold("_______", "blue")
          );
        } else {
          str = str.replace("##", partAnswer ? bold(partAnswer) : "_______");
        }
      } else {
        str = str.replace("##", partAnswer ? bold(partAnswer) : "_______");
      }
    }

    return str;
  };

  const handle_stopRecord = () => {
    stopRecording();
    // set_answerInputValue("Hello World !");
    handle_selectAnswer("Hello World !");
  };

  return (
    <div className=" mb-6">
      <div
        dir="ltr"
        className="my-2  d-flex flex-column justify-content-start align-items-center"
      >
        {!Data?.mixedAnswers &&
          Data.data.map((q, index) => (
            <div
              id={q.id}
              key={q.id}
              onClick={() => {
                handle_selectQuestion(q);
              }}
              className={
                (currentQuestion?.id === q.id ? " fs-6 my-3" : " my-2 fs-6") +
                (index % 2 === 0
                  ? " ms-auto conversation-q--left "
                  : " me-auto conversation-q--right ") +
                " conversation-q p-3 align-self-center transiion-1 cursor-pointer my-2"
              }
            >
              {parse(
                getConvertedBody(q)
                  ?.toString()
                  ?.replaceAll("<p>", '<p dir="auto">')
              )}
            </div>
          ))}
        {Data?.mixedAnswers && (
          <QuestionFinalResult
            questionType={1}
            mixedAnswers={Data?.mixedAnswers}
            contentType={Data?.contentType}
          />
        )}
      </div>
      {!showSeeResult && (
        <div className="conversation-answer mt-3">
          {/* <audio src={audioURL} controls /> */}
          <AnsweringPart
            states={{
              answeringType: Data.answeringType,
              listening: listening,
              transcript: transcript,
            }}
            clickHandlers={{
              startListening: SpeechRecognition.startListening,
              stopListening: SpeechRecognition.stopListening,
              resetTranscript: resetTranscript,
              handle_selectAnswer: handle_selectAnswer,
            }}
            seetrueanswerprops={{
              contentType: 0,
              answeringType: 3,
              questionType: 1,
              questionId: Data.id,
              answerSheet: answerSheet,
              baseAnsweringType: Data.baseAnsweringType,
              typeId: Data.typeId,
              gotoNextQuestion: iterateToNextQuestion,
              answerSheetCorrection,
              isLastQuestion: isLastQuestion,
              hiddenContent: Data?.hiddenContent,
            }}
          />
        </div>
      )}
      {showSeeResult && (
        <div className="see-result cursor-pointer justify-self-center mx-auto text-center mt-4">
          <SeeResult
            isLastQuestion={isLastQuestion}
            hiddenContent={Data?.hiddenContent}
            answerSheetCorrection={answerSheetCorrection}
            baseAnsweringType={Data.baseAnsweringType}
            typeId={Data.typeId}
            gotoNextQuestion={iterateToNextQuestion}
            answeringType={3}
            contentType={0}
            questionId={Data.id}
            answerSheet={answerSheet}
            questionType={1}
          />
        </div>
      )}
    </div>
  );
};

export default ConversationRecordVoice;
