import React, { useState, useEffect } from "react";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import { answerToQuestion_apiCalls } from "../../../../core/services/agent";

const useAnsweringMethods = ({
  contentType,
  answeringType,
  questionType,
  questionId,
  answerSheet,
  baseAnsweringType,
  typeId,
  gotoNextQuestion,
  answerSheetCorrection,
}) => {
  const { handleClose, handleOpen } = useLoadingContext();
  const [answeringResult, set_answeringResult] = useState(null);

  const answerToYNB = async (
    answerBody,
    skipCorrection = false,
    seeCorrectAnswers = false
  ) => {
    return await answerToQuestion_apiCalls
      .apiCall_answerTo_YNB(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          //
          /////
          // console.log("answerTo_YNB");
          // console.log(resp?.data?.data);

          const orderedAnswers = resp?.data?.data?.answers.sort(
            (item1, item2) => item1.id - item2.id
          );
          /////
          //

          if (seeCorrectAnswers === true) {
            set_answeringResult(resp.data);
            const mixedAnswers = orderedAnswers?.map((item, i) => {
              return {
                userAnswer: item,
                correctAnswer: item,
              };
            });
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });

            return;
          }
          set_answeringResult(resp.data);

          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = orderedAnswers?.map((item, i) => {
              return {
                userAnswer: answerBody.answers[i],
                correctAnswer: item,
              };
            });
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });
          } else {
            gotoNextQuestion(parseInt(resp.data?.status) === 1);
          }
        } else {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const answerToConversation = async (
    answerBody,
    skipCorrection = false,
    seeCorrectAnswers = false
  ) => {
    return await answerToQuestion_apiCalls
      .apiCall_answerTo_CONVERSATION(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          //
          /////
          // console.log("answerTo_CONVERSATION");
          // console.log(resp?.data?.data);
          const orderedAnswers = resp?.data?.data?.answers.sort(
            (item1, item2) => item1.id - item2.id
          );
          /////
          //
          if (seeCorrectAnswers === true) {
            // return resp.data;
            set_answeringResult(resp.data);
            const mixedAnswers = orderedAnswers?.map((item, i) => {
              return {
                userAnswer: item,
                correctAnswer: item,
              };
            });
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });
            return;
          }
          set_answeringResult(resp.data);
          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = orderedAnswers?.map((item, i) => {
              return {
                userAnswer: answerBody.answers[i],
                correctAnswer: item,
              };
            });
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });
          } else {
            gotoNextQuestion(parseInt(resp.data?.status) === 1);
          }
        } else {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const answerToMultiChoice = async (
    answerBody,
    skipCorrection = false,
    seeCorrectAnswers = false
  ) => {
    return await answerToQuestion_apiCalls
      .apiCall_answerTo_MULTICHOICE(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          //
          /////
          // console.log("answerTo_MULTICHOICE");
          // console.log(resp?.data?.data);
          /////
          //
          if (seeCorrectAnswers === true) {
            // return resp.data;
            set_answeringResult(resp.data);
            const mixedAnswers = {
              userAnswer: resp.data?.data.answers.map((item) => parseInt(item)),
              correctAnswer: resp.data?.data.answers.map((item) =>
                parseInt(item)
              ),
            };
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });
            return;
          }
          set_answeringResult(resp.data);

          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = {
              userAnswer: answerBody.answers.map((item) => parseInt(item)),
              correctAnswer: resp.data?.data.answers.map((item) =>
                parseInt(item)
              ),
            };

            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
              contentType: contentType,
            });
          } else {
            gotoNextQuestion(parseInt(resp.data?.status) === 1);
          }
        } else {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const answerToPhrase = async (
    answerBody,
    skipCorrection = false,
    seeCorrectAnswers = false
  ) => {
    return await answerToQuestion_apiCalls
      .apiCall_answerTo_PHRASE(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          //
          /////
          // console.log("answerTo_PHRASE");
          // console.log(resp?.data?.data);
          /////
          //
          if (seeCorrectAnswers === true) {
            // return resp.data;
            set_answeringResult(resp.data);
            const mixedAnswers = {
              userAnswer: resp?.data?.data?.phrase,
              correctAnswer: resp?.data?.data?.phrase,
            };
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
            });
            return;
          }
          set_answeringResult(resp.data);
          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = {
              userAnswer: answerBody.phrase,
              correctAnswer: resp?.data?.data?.phrase,
            };
            answerSheetCorrection({
              mixedAnswers: mixedAnswers,
            });
          } else {
            gotoNextQuestion(parseInt(resp.data?.status) === 1);
          }
        } else {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////
  const handleSeeResult = async () => {
    handleOpen();

    if (questionType === 0) {
      if (answeringType === 4) {
        await answerToYNB({
          questionId: questionId,
          answers: answerSheet.map((item) => {
            return { id: item.id, options: [] };
          }),
          answeringType: baseAnsweringType,
          typeId: typeId,
        });
      } else {
        await answerToYNB({
          questionId: questionId,
          answers: answerSheet.map((item) => {
            return { id: item.questionId, options: item.answerArray };
          }),
          answeringType: baseAnsweringType,
          typeId: typeId,
        });
      }
    }
    if (questionType === 1) {
      await answerToConversation({
        questionId: questionId,
        answers: answerSheet.map((item) => {
          return { id: item.questionId, options: item.answerArray };
        }),
        answeringType: baseAnsweringType,
        typeId: typeId,
      });
    }
    if (questionType === 3) {
      await answerToMultiChoice({
        questionId: questionId,
        answers: answerSheet?.answerArray,
        answeringType: baseAnsweringType,
        typeId: typeId,
      });
    }
    if (questionType === 4) {
      await answerToPhrase({
        questionId: questionId,
        phrase: answerSheet?.answerArray,
        answeringType: baseAnsweringType,
        typeId: typeId,
      });
    }

    handleClose();
  };

  const handleDontShowAgain = async () => {
    console.log("handleDontShowAgain");
    handleOpen();

    let correctAnswers = {};
    if (answeringResult.data?.answers) {
      correctAnswers = answeringResult.data?.answers;
    } else if (answeringResult.data?.phrase) {
      correctAnswers = answeringResult.data?.phrase;
    }

    if (questionType === 0) {
      if (answeringType === 4) {
        await answerToYNB(
          {
            questionId: questionId,
            answers: correctAnswers,
            answeringType: baseAnsweringType,
            typeId: typeId,
          },
          true
        );
      } else {
        await answerToYNB(
          {
            questionId: questionId,
            answers: correctAnswers,
            answeringType: baseAnsweringType,
            typeId: typeId,
          },
          true
        );
      }
    }
    if (questionType === 1) {
      await answerToConversation(
        {
          questionId: questionId,
          answers: correctAnswers,
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        true
      );
    }
    if (questionType === 3) {
      await answerToMultiChoice(
        {
          questionId: questionId,
          answers: correctAnswers,
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        true
      );
    }
    if (questionType === 4) {
      await answerToPhrase(
        {
          questionId: questionId,
          phrase: correctAnswers,
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        true
      );
    }

    handleClose();
  };
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  const handleSeeCorrectedAnswer = async () => {
    //** 1 - First Send Empty Body And Get True Answers And Set The True Answers In The State
    handleOpen();

    if (questionType === 0) {
      if (answeringType === 4) {
        await answerToYNB(
          {
            questionId: questionId,
            answers: answerSheet.map((item) => {
              return { id: item.id, options: [] };
            }),
            answeringType: baseAnsweringType,
            typeId: typeId,
          },
          false,
          true
        ).finally(handleClose);
      } else {
        await answerToYNB(
          {
            questionId: questionId,
            answers: answerSheet.map((item) => {
              return {
                id: item.questionId,
                options: item.answerArray?.map((it) => ""),
              };
            }),
            answeringType: baseAnsweringType,
            typeId: typeId,
          },
          false,
          true
        ).finally(handleClose);
      }
    }
    if (questionType === 1) {
      await answerToConversation(
        {
          questionId: questionId,
          answers: answerSheet.map((item) => {
            return {
              id: item.questionId,
              options: item.answerArray?.map((it) => ""),
            };
          }),
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        false,
        true
      ).finally(handleClose);
    }
    if (questionType === 3) {
      await answerToMultiChoice(
        {
          questionId: questionId,
          answers: ["-1"],
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        false,
        true
      ).finally(handleClose);
    }
    if (questionType === 4) {
      await answerToPhrase(
        {
          questionId: questionId,
          phrase: answerSheet?.answerArray?.map((it) => ""),
          answeringType: baseAnsweringType,
          typeId: typeId,
        },
        false,
        true
      ).finally(handleClose);
    }

    //** 2 - Then Send The True Answer And Go Throw Normal Flow
  };

  //////
  ////////
  return {
    handleSeeResult,
    handleDontShowAgain,
    answeringResult,
    handleSeeCorrectedAnswer,
  };
  ////////
  //////
};
export default useAnsweringMethods;
