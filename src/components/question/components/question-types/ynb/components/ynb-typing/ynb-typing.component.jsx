import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import "./ynb-typing.styles.scss";
import { useRef } from "react";
import { fileBaseUrl } from "../../../../../../../core/services/baseUrl";
import AnsweringPart from "../../../../answering-part/answeringPart.component";
import SeeResult from "../../../../seeResultPart/seeResultPart";
import {
  createArrayByLength,
  getShouldBeScrolled,
} from "../../../../../../../core/utils/utils";
import QuestionFinalResult from "../../../../questionFinalResult/questionFinalResult";

const YnbTyping = ({
  Data,
  iterateToNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  const [currentQuestion, set_currentQuestion] = useState(Data.data[0]);
  const [answerSheet, set_answerSheet] = useState([]);
  const [showSeeResult, set_showSeeResult] = useState(false);

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
        .scrollIntoView({ behavior: "smooth" });

    setTimeout(
      () => {
        //update answersheet
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
        set_answerInputValue("");
        if (ref_input.current) {
          ref_input.current.focus();
          // goto next question
          if (shouldGoNext) gotoNextQuestion();
        } else {
          set_currentQuestion(null);
        }
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
    set_answerInputValue("");
    ref_input.current.focus();
  };

  const visualViewportResizeListener = () => {
    const shouldBeScrolled = getShouldBeScrolled();
    if (shouldBeScrolled)
      document
        .getElementById(currentQuestion.id.toString())
        .scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // const listener = () => {
    //   const shouldBeScrolled = getShouldBeScrolled();
    //   if (shouldBeScrolled)
    //     document
    //       .getElementById(currentQuestion.id.toString())
    //       .scrollIntoView({ behavior: "smooth" });
    // };
    window.visualViewport.addEventListener(
      "resize",
      visualViewportResizeListener
    );

    return () => {
      window.visualViewport.removeEventListener(
        "resize",
        visualViewportResizeListener
      );
    };
  }, []);

  useEffect(() => {
    if (currentQuestion?.id) {
      document
        .getElementById(currentQuestion.id.toString())
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [currentQuestion]);

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

      if (!answer) return "<span>______</span>";
      // currentQuestion?.id === question.id ? "___________" : "_______";
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

  // HANDLING ANSWERS
  const ref_input = useRef();
  const [answerInputValue, set_answerInputValue] = useState("");
  const handleChange_answerInputValue = (e) => {
    const value = e.target.value;
    set_answerInputValue(value);
  };
  const handle_submit = (e) => {
    e.preventDefault();
    if (answerInputValue.trim() === "") {
      return;
    }
    handle_selectAnswer(answerInputValue);
  };

  return (
    <div className="ynb-text-content">
      <div dir="ltr" className="my-2 ynb-q">
        {!Data?.mixedAnswers &&
          Data.data.map((q) => (
            <div
              key={q.id}
              id={q.id}
              onClick={() => {
                handle_selectQuestion(q);
              }}
              className={
                (currentQuestion?.id === q.id ? "  my-3 fs-6 stronger" : " ") +
                " cursor-pointer transiion-1 my-2"
              }
            >
              {parseInt(Data.contentType) === 0 &&
                // parse(q.body.toString().replaceAll("##", getQBody(q)))
                parse(getConvertedBody(q))}
              {parseInt(Data.contentType) === 1 && (
                <div
                  style={{
                    boxShadow: " 0 2px 5px 2px #ddd ",
                    borderRadius: ".8rem",
                  }}
                  className="border-bottom m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-start position-relative "
                >
                  <img
                    style={{ maxWidth: "100%", maxHeight: "250px" }}
                    src={fileBaseUrl + q.body}
                    alt="..."
                    className="m-0 p-0 "
                  />
                  <span
                    className={
                      (currentQuestion?.id === q.id
                        ? " fs-6 my-4 me-4 py-3 "
                        : " m-2 fs-6") + "  transition-2 px-3 py-2"
                    }
                    style={{
                      // position: "absolute",
                      // bottom: "0",
                      // right: "1rem",
                      background: "#fff",
                      borderRadius: ".8rem",
                      boxShadow: " 0 2px 5px 2px #aaa ",
                    }}
                  >
                    {" "}
                    {/* {parse(getQBody(q))}{" "} */}
                    {parse(
                      getConvertedBody(q)
                        ?.toString()
                        ?.replaceAll("<p>", '<p dir="auto">')
                    )}{" "}
                  </span>
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
      {!showSeeResult && (
        <AnsweringPart
          states={{
            answeringType: Data.answeringType,
            contentType: Data.contentType,
            answerInputValue,
          }}
          submitHandlers={{
            handle_submit,
          }}
          changeHandlers={{
            handleChange_answerInputValue,
          }}
          refs={{
            ref_input,
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

export default YnbTyping;
