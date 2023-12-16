import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { answerToQuestion_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";
// const hiddenContent = `
// <p>
// In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is
// </p>
// `;
const SeeResult = ({
  hiddenContent,
  contentType,
  answeringType,
  questionType,
  questionId,
  answerSheet,
  baseAnsweringType,
  typeId,
  gotoNextQuestion,
  answerSheetCorrection,
  isLastQuestion,
}) => {
  const { handleClose, handleOpen } = useLoadingContext();
  const [answeringResult, set_answeringResult] = useState(null);
  const [showExplain, set_showExplain] = useState(false);

  const answerToYNB = async (answerBody, skipCorrection = false) => {
    await answerToQuestion_apiCalls
      .apiCall_answerTo_YNB(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          set_answeringResult(resp.data);

          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = resp?.data?.data?.answers?.map((item, i) => {
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

  const answerToConversation = async (answerBody, skipCorrection = false) => {
    await answerToQuestion_apiCalls
      .apiCall_answerTo_CONVERSATION(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
          set_answeringResult(resp.data);
          if (baseAnsweringType !== 3 && !skipCorrection) {
            const mixedAnswers = resp?.data?.data?.answers?.map((item, i) => {
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

  const answerToMultiChoice = async (answerBody, skipCorrection = false) => {
    await answerToQuestion_apiCalls
      .apiCall_answerTo_MULTICHOICE(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
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

  const answerToPhrase = async (answerBody, skipCorrection = false) => {
    await answerToQuestion_apiCalls
      .apiCall_answerTo_PHRASE(answerBody)
      .then((resp) => {
        if (resp.status === 200) {
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

  const handleToggleExplainQuestion = () => {
    set_showExplain(!showExplain);
  };

  const getButtonText = () => {
    if (isLastQuestion) {
      if (baseAnsweringType === 3) {
        return "ادامه";
      }
      return "بازگشت";
    } else {
      return "سوال بعدی";
    }
  };

  const getHiddenContentText = (text) => {
    let str = text;
    if (text?.includes("\r\n")) {
      for (let i = 0; i < text?.split("\r\n")?.length - 1; i++) {
        str = str.replace("\r\n", "<br />");
      }
    }
    return str;
  };

  const hasHiddenContent = (hd) => {
    if (hd) {
      if (
        hd.toString().trim() !== "<p><br/></p>" &&
        hd.toString().trim() !== "" &&
        hd.toString().trim() !== "<p></p>" &&
        hd.toString().trim() !== "<p><br/><br/></p>"
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  const handleDontShowAgain = async () => {
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

  useEffect(() => {
    getButtonText();
  }, [isLastQuestion]);

  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "11",
        backgroundColor: "#fff",
        boxShadow: "0 -2px 5px 2px #ccc",
      }}
      className="m-0 p-2 py-3 mx-auto d-flex flex-row justify-content-center align-items-baseline"
    >
      {!answeringResult && (
        <Button variant="contained" color="primary" onClick={handleSeeResult}>
          {/* {baseAnsweringType !== 3 ? "مشاهده نتیجه" : "سوال بعدی"} */}
          مشاهده نتیجه
        </Button>
      )}

      {answeringResult && (
        <div className="m-0 w-100 px-3 py-2 d-flex flex-row flex-wrap justify-content-center align-items-start">
          <div className="col-sm-7 col-12  d-flex flex-row justify-content-sm-end justify-content-center">
            <Button
              className="mx-2"
              variant="contained"
              color="primary"
              onClick={() => {
                gotoNextQuestion(parseInt(answeringResult?.status) === 1);
              }}
            >
              {getButtonText()}
            </Button>
            {hasHiddenContent(hiddenContent) && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleExplainQuestion}
                endIcon={<VisibilityIcon className="ms-2" fontSize="small" />}
              >
                پاسخنامه تشریحی
              </Button>
            )}
          </div>

          {parseInt(answeringResult?.status) === 0 && (
            <div className=" col-sm-5 col-12 px-2 mt-sm-0 mt-2 m-0 p-0 d-flex flex-row justify-content-sm-start justify-content-center ">
              <Button
                className="m-0"
                variant="outlined"
                color="primary"
                onClick={handleDontShowAgain}
              >
                دیگر این سوال را نشان نده
              </Button>
            </div>
          )}
        </div>
      )}
      {hiddenContent && (
        <Dialog onClose={handleToggleExplainQuestion} open={showExplain}>
          <div
            dir={"auto"}
            className="m-0 p-3 answersheet-explanations"
            style={{
              minHeight: "300px",
              minWidth: "250px",
            }}
          >
            {parse(
              getHiddenContentText(hiddenContent)
                ?.toString()
                ?.replaceAll("<p>", '<p dir="auto">')
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default SeeResult;

/*
  
  questionType : 0 => ynb
  {
    answeringType === 0 => choose => {
      contentType :  1 or 0 {
        0: {questionId: 12387, answerArray: Array(1)}
        1: {questionId: 12388, answerArray: Array(1)}
        2: {questionId: 12389, answerArray: Array(1)}
        3: {questionId: 12390, answerArray: Array(1)}
        4: {questionId: 12391, answerArray: Array(1)}
      }
    }

    answeringType === 1 => chooseRepeate=>{
      contentType :  1 or 0 {
        0: {questionId: 12387, answerArray: Array(1)}
        1: {questionId: 12388, answerArray: Array(1)}
        2: {questionId: 12389, answerArray: Array(1)}
        3: {questionId: 12390, answerArray: Array(1)}
        4: {questionId: 12391, answerArray: Array(1)}
      }
    }
    answeringType === 2 => typing{
      contentType :  1 or 0 {
        0: {questionId: 12387, answerArray: Array(1)}
        1: {questionId: 12388, answerArray: Array(1)}
        2: {questionId: 12389, answerArray: Array(1)}
        3: {questionId: 12390, answerArray: Array(1)}
        4: {questionId: 12391, answerArray: Array(1)}
      }
    }
    answeringType === 3 => recordVoice
    {
      contentType : 1 or 0 => {
        answerSheet :
        0: {questionId: 37804, answerArray: Array(1)}
        1: {questionId: 37805, answerArray: Array(1)}
        2: {questionId: 37806, answerArray: Array(1)}
        3: {questionId: 37807, answerArray: Array(1)}
        4: {questionId: 37808, answerArray: Array(1)}
      }
    }
    answeringType === 4 => sort{
      contentType:0 => {
        0: {id: 12387, body: "1. I didn't"}
        1: {id: 12388, body: "2. I had a "}
        2: {id: 12389, body: "3. I don't "}
        3: {id: 12390, body: '4. I called'}
        4: {id: 12391, body: "5. Jim has "}
      }
      contentType:1 => {
        0: {id: 37804, body: 'uploads/questionmedia'}
        1: {id: 37805, body: 'uploads/questionmedia'}
        2: {id: 37806, body: 'uploads/questionmedia'}
        3: {id: 37807, body: 'uploads/questionmedia'}
        4: {id: 37808, body: 'uploads/questionmedia'}
        5: {id: 37809, body: 'uploads/questionmedia'}
      }
  }

  questionType : 1 => conversation
  {
    answeringType === 0 => choose =>
    {
      contentType:0=>{
        0: {questionId: 1, answerArray: Array(1)}
        1: {questionId: 2, answerArray: Array(1)}
        2: {questionId: 3, answerArray: Array(1)}
        3: {questionId: 4, answerArray: Array(1)}
        4: {questionId: 5, answerArray: Array(1)}
      }
    }
    answeringType === 1 => chooseRepeate =>
    {
      contentType:0=>{
        0: {questionId: 1, answerArray: Array(1)}
        1: {questionId: 2, answerArray: Array(1)}
        2: {questionId: 3, answerArray: Array(1)}
        3: {questionId: 4, answerArray: Array(1)}
        4: {questionId: 5, answerArray: Array(1)}
      }
    }

    answeringType === 2 => typing
    answeringType === 3 => recordVoice
  }

  
  questionType : 3 => multiChoice
  {
    answeringType === 0 => choose

    answeringType === 1 => chooseRepeate
  }

  
  questionType : 4 => phrase
  
  */
