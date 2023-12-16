import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CheckIcon from "@mui/icons-material/Check";
import StopIcon from "@mui/icons-material/Stop";
import { fileBaseUrl } from "../../../../core/services/baseUrl";
import recordingAudio from "../../../../assets/audio/recording.mp3";
import "./styles.css";
import useSeeResultMethods from "../useAnsweringMethods/useAnsweringMethods";
import SeeResultComponents from "../seeResultComponents/seeResultComponents";

const AnsweringPart = ({
  states,
  changeHandlers,
  submitHandlers,
  clickHandlers,
  refs,
  seetrueanswerprops,
}) => {
  const getStyles = () => {
    return {
      position: "fixed",
      bottom: "0",
      right: "0",
      left: "0",
      margin: "0 auto",
      width: "100%",
      maxWidth: "800px",
      zIndex: "10",
      boxShadow: "rgb(204 204 204) 0px -2px 5px 2px",
    };
  };
  /////
  const { handleSeeCorrectedAnswer, handleDontShowAgain, answeringResult } =
    useSeeResultMethods(seetrueanswerprops);

  /////
  const handleSeeQuestion = () => {
    const seeQuestionMainBTN = document.getElementById("see-question");
    seeQuestionMainBTN.click();
  };

  return (
    <>
      {answeringResult && (
        <div
          style={getStyles()}
          className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch"
        >
          <SeeResultComponents
            className={"py-2 px-2"}
            answeringResult={answeringResult}
            handleDontShowAgain={handleDontShowAgain}
            {...seetrueanswerprops}
          />
        </div>
      )}
      {!answeringResult && (
        <>
          {(states?.answeringType === 0 || states?.answeringType === 1) && (
            <div
              dir="auto"
              style={getStyles()}
              className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch"
            >
              {states?.questionType !== 4 && (
                <div className="p-2 m-0">
                  <Button
                    onClick={handleSeeQuestion}
                    color="primary"
                    variant="contained"
                    className=" text-nowrap"
                  >
                    مشاهده صورت سوال
                  </Button>
                  <Button
                    onClick={handleSeeCorrectedAnswer}
                    color="primary"
                    variant="contained"
                    className="mx-2 text-nowrap"
                  >
                    مشاهده پاسخ صحیح
                  </Button>
                </div>
              )}
              <div
                className=" tiny-scrollbar d-flex flex-row justify-content-end align-items-stretch flex-wrap"
                style={{ maxHeight: "100px", overflowY: "auto" }}
              >
                {states.options.map((option, index) => (
                  <span
                    dir="auto"
                    key={option + "-unuqeID" + index}
                    onClick={() => {
                      clickHandlers.handle_selectAnswer(option);
                    }}
                    className={" border p-2 cursor-pointer mx-2 my-2 noselect"}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}
          {states?.answeringType === 2 && (
            <div
              dir="auto"
              style={getStyles()}
              className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch "
            >
              <div className="p-2 m-0">
                <Button
                  onClick={handleSeeQuestion}
                  color="primary"
                  variant="contained"
                >
                  مشاهده صورت سوال
                </Button>

                <Button
                  onClick={handleSeeCorrectedAnswer}
                  color="primary"
                  variant="contained"
                  className="mx-2"
                >
                  مشاهده پاسخ صحیح
                </Button>
              </div>
              <div className="py-2 d-flex flex-row justify-content-center align-items-stretch ">
                <form
                  dir="ltr"
                  onSubmit={submitHandlers?.handle_submit}
                  className="border border-2 rounded rounded-3 answering-form mx-auto m-0 p-0 d-flex flex-row jsutify"
                >
                  <input
                    ref={refs?.ref_input}
                    autoFocus
                    type="text"
                    className="ansering-input px-3 py-1 border-0"
                    value={states?.answerInputValue}
                    onChange={changeHandlers?.handleChange_answerInputValue}
                    onBlur={(e) => {
                      refs?.ref_input?.current?.focus();
                    }}
                  />
                  <Button type="submit" variant="contained">
                    {!states?.answerInputValue ? "تایپ جواب" : "بعدی"}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {states?.answeringType === 3 && (
            <div
              dir="auto"
              style={getStyles()}
              //   className=" answering-div mx-auto m-0 p-0 d-flex flex-wrap flex-row jsutify-content-center align-items-center"
              // >
              className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch "
            >
              <div className="p-2 m-0">
                <Button
                  onClick={handleSeeQuestion}
                  color="primary"
                  variant="contained"
                >
                  مشاهده صورت سوال
                </Button>

                <Button
                  onClick={handleSeeCorrectedAnswer}
                  color="primary"
                  variant="contained"
                  className="mx-2"
                >
                  مشاهده پاسخ صحیح
                </Button>
              </div>
              <div className=" d-flex flex-wrap flex-row justify-content-center align-items-center">
                <audio className="d-none" id="startRecordAudioRef">
                  <source src={recordingAudio} type="audio/mp3" />
                </audio>
                <IconButton
                  className={" record-mic  m-2 ms-1"}
                  onClick={() => {
                    document.getElementById("startRecordAudioRef").play();

                    if (!states.listening)
                      clickHandlers.startListening({ language: "en" });
                    else clickHandlers.stopListening();
                  }}
                >
                  <KeyboardVoiceIcon fontSize="large" />
                  {states.listening && (
                    <>
                      <div className="recording-beat"></div>
                    </>
                  )}
                </IconButton>
                {states.listening && (
                  <IconButton
                    onClick={() => {
                      document.getElementById("startRecordAudioRef").play();
                      clickHandlers.stopListening();
                    }}
                  >
                    <StopIcon fontSize="large" className="" />
                  </IconButton>
                )}

                {states.transcript && (
                  <div className="mx-3 p-0">
                    <span className="fs-6">{states.transcript}</span>
                    <IconButton
                      onClick={() => {
                        clickHandlers.handle_selectAnswer(states?.transcript);
                        clickHandlers.resetTranscript();
                      }}
                    >
                      <CheckIcon fontSize="large" />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          )}
          {states?.answeringType === 4 && (
            <div
              // className="ynb-answer-0 d-flex flex-row justify-content-end align-items-stretch flex-wrap"
              // >
              dir="auto"
              className=" bg-white border-top ynb-answer-0 d-flex flex-column justify-content-start align-items-stretch "
            >
              <div className="p-2 m-0">
                <Button
                  onClick={handleSeeQuestion}
                  color="primary"
                  variant="contained"
                >
                  مشاهده صورت سوال
                </Button>

                <Button
                  onClick={handleSeeCorrectedAnswer}
                  color="primary"
                  variant="contained"
                  className="mx-2"
                >
                  مشاهده پاسخ صحیح
                </Button>
              </div>
              <div className=" d-flex flex-wrap flex-row justify-content-center align-items-center">
                {states?.options.length > 0 &&
                  states?.options.map((option) => (
                    <span
                      dir="auto"
                      key={option.id}
                      onClick={() => {
                        clickHandlers.handle_selectAnswer(option);
                      }}
                      className={
                        "  border p-2 cursor-pointer mx-2 my-2 noselect "
                      }
                    >
                      {parseInt(states?.contentType) === 0 && option.body}
                      {parseInt(states?.contentType) === 1 && (
                        <div
                          style={{
                            boxShadow: " 0 2px 5px 2px #ddd ",
                            borderRadius: ".8rem",
                          }}
                          className="border-bottom m-0 my-3 p-0 d-flex flex-column justify-content-start align-items-start position-relative "
                        >
                          <img
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                            src={fileBaseUrl + option.body}
                            alt="..."
                            className="m-0 p-0 "
                          />
                        </div>
                      )}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AnsweringPart;
