import React, { useState, useEffect } from "react";
import { fileBaseUrl } from "../../../../core/services/baseUrl";

const QuestionFinalResult = ({ questionType, contentType, mixedAnswers }) => {
  console.log(mixedAnswers);

  const getMultiChoiceLabelClassNames = (option) => {
    // console.log(option.content);
    let classes = "";
    if (
      mixedAnswers?.userAnswers?.includes(parseInt(option.id)) &&
      mixedAnswers?.correctAnswers?.includes(parseInt(option.id))
    ) {
      classes = "  border border-2 border-success ";
    } else if (
      mixedAnswers?.userAnswers?.includes(parseInt(option.id)) &&
      !mixedAnswers?.correctAnswers?.includes(parseInt(option.id))
    ) {
      classes = "  border border-2 border-danger ";
    } else if (
      !mixedAnswers?.userAnswers?.includes(parseInt(option.id)) &&
      mixedAnswers?.correctAnswers?.includes(parseInt(option.id))
    ) {
      classes = "  border border-2 border-primary ";
    }

    return classes;
  };

  const getPharseAnswerClassName = () => {
    let doesMatch = true;
    mixedAnswers?.userAnswers?.every((element, index) => {
      if (element !== mixedAnswers?.correctAnswers[index]) {
        doesMatch = false;
        return false;
      }
      return true;
    });

    return doesMatch;
  };

  return (
    <>
      {questionType === 0 &&
        mixedAnswers?.map((item, index) => (
          <div
            key={"as_" + index}
            className={
              (index === mixedAnswers?.length - 1 ? "mb-6" : "") +
              " my-2 fs-7 transiion-1 cursor-pointer my-2"
            }
          >
            {parseInt(contentType) === 0 && (
              <div className="d-flex flex-column justify-content-start align-items-start">
                <span
                  className={
                    (item?.isRight === true
                      ? "border border-2 border-success "
                      : item?.isRight === false
                      ? "border border-2 border-danger"
                      : "border-none") + " m-2 p-2 "
                  }
                  dangerouslySetInnerHTML={{
                    __html: item?.userAnswerBody,
                  }}
                >
                  {/* {item?.userAnswerBody} */}
                </span>
                {item.isRight === false && item?.correctAnswerBody && (
                  <span
                    className="m-2 p-2 border border-primary "
                    dangerouslySetInnerHTML={{
                      __html: item?.correctAnswerBody,
                    }}
                  >
                    {/* {item?.correctAnswerBody} */}
                  </span>
                )}

                <hr className="  w-100" />
              </div>
            )}
            {parseInt(contentType) === 1 && (
              <div
                style={{
                  boxShadow: " 0 2px 5px 2px #ddd ",
                  borderRadius: ".8rem",
                }}
                className="border-bottom m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-start position-relative "
              >
                <img
                  style={{ maxWidth: "100%", maxHeight: "250px" }}
                  src={fileBaseUrl + item.body}
                  alt="..."
                  className="m-0 p-0 "
                />
                <span
                  className={" m-2 fs-7 transition-2 px-3 py-2"}
                  style={{
                    // position: "absolute",
                    // bottom: "0",
                    // right: "1rem",
                    background: "#fff",
                    borderRadius: ".8rem",
                    boxShadow: " 0 2px 5px 2px #aaa ",
                  }}
                >
                  <div className="d-flex flex-column justify-content-start align-items-start">
                    <span
                      className={
                        (item?.isRight === true
                          ? "border border-2 border-success"
                          : item?.isRight === false
                          ? "border border-2 border-danger"
                          : "border-none") + " m-2 p-2 "
                      }
                      dangerouslySetInnerHTML={{
                        __html: item?.userAnswerBody,
                      }}
                    >
                      {/* {item?.userAnswerBody} */}
                    </span>
                    {item.isRight === false && item?.correctAnswerBody && (
                      <span
                        className="m-2 p-2 border border-primary "
                        dangerouslySetInnerHTML={{
                          __html: item?.correctAnswerBody,
                        }}
                      >
                        {/* {item?.correctAnswerBody} */}
                      </span>
                    )}
                  </div>
                </span>
              </div>
            )}
          </div>
        ))}
      {questionType === 1 &&
        mixedAnswers?.map((item, index) => (
          <div
            key={"as_" + index}
            className={
              (index === mixedAnswers?.length - 1 ? "mb-6" : "") +
              (index % 2 === 0
                ? " ms-auto conversation-q--left "
                : " me-auto conversation-q--right ") +
              "  my-2 fs-7 conversation-q p-3 align-self-center transiion-1 cursor-pointer my-2"
            }
          >
            <div className="d-flex flex-column justify-content-start align-items-start">
              <span
                className={
                  (item?.isRight === true
                    ? "border border-2 border-success"
                    : item?.isRight === false
                    ? "border border-2 border-danger"
                    : "border-none") + " m-2 p-2 "
                }
                dangerouslySetInnerHTML={{
                  __html: item?.userAnswerBody,
                }}
              >
                {/* {item?.correctAnswerBody} */}
                {/* {item?.userAnswerBody} */}
              </span>
              {item.isRight === false && item?.correctAnswerBody && (
                <span
                  className="m-2 p-2 border border-primary "
                  dangerouslySetInnerHTML={{
                    __html: item?.correctAnswerBody,
                  }}
                >
                  {/* {item?.correctAnswerBody} */}
                </span>
              )}
            </div>
          </div>
        ))}
      {questionType === 3 &&
        mixedAnswers?.allOptions?.map((option, index) => (
          <div
            key={option.id}
            className={
              getMultiChoiceLabelClassNames(option) +
              (index === mixedAnswers?.allOptions?.length - 1 ? "mb-6" : "") +
              " multichoice-option p-2 cursor-pointer my-2 d-flex flex-row justify-content-start align-items-center"
            }
          >
            <label className="me-2">
              {contentType === 0 && option.content}
              {contentType === 1 && (
                <img
                  style={{ maxHeight: "200px", maxWidth: "100%" }}
                  src={fileBaseUrl + option?.content}
                  alt="..."
                />
              )}
            </label>
          </div>
        ))}
      {questionType === 4 && (
        <div className="d-flex flex-column justify-content-start align-items-stretch">
          <div
            className={
              (getPharseAnswerClassName()
                ? "border-success"
                : "border-danger") + "  border border-2 p-2 mb-2"
            }
          >
            {mixedAnswers?.userAnswers?.map((item) => (
              <span key={item} className="m-0 p-0">
                {` ${item}`}
              </span>
            ))}
          </div>
          <div className="border-success border border-2 p-2 mb-2">
            {mixedAnswers?.correctAnswers?.map((item) => (
              <span key={item} className="m-0 p-0">
                {` ${item}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionFinalResult;
