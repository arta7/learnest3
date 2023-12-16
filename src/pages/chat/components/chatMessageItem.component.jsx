import React, { useState, useEffect } from "react";
import singleTick from "../../../assets/img/icons/single-tick-2.png";
import doubleTick from "../../../assets/img/icons/double-tick.png";

import moment from "moment";

const ChatMessageItem = ({
  id,
  userId,
  message,
  voiceUrl,
  seen,
  chatUser,
  dateTime,
  belongsToCurrentUser,
}) => {
  const { name, imageUrl, isStudent, connectionId } = chatUser;
  function DateTimeToString(dateTime) {
    dateTime = dateTime.replace("T", " ");
    return moment(dateTime, "YYYY-MM-DD hh:mm:ss").locale("fa-IR").fromNow();
  }
  return (
    <div className="message-container m-0 mt-3 p-0">
      <div
        className={
          (belongsToCurrentUser
            ? "user-message me-auto"
            : "other-message ms-auto") +
          " message-box col-lg-7 col-md-9 col-11 box-rounded-1 m-0  p-3"
        }
      >
        <div className="message-text text-right m-0 p-0 ">{voiceUrl}</div>
        <div className="message-status mt-1 m-0 p-0 d-flex flex-row justify-content-between align-items-center">
          <span className="seen m-0 p-0">
            {seen === true && (
              <img
                className=""
                style={{ width: "20px", height: "18px" }}
                src={doubleTick}
                alt="..."
              />
            )}
            {seen === false && (
              <img
                className=""
                style={{ width: "20px", height: "18px" }}
                src={singleTick}
                alt="..."
              />
            )}
          </span>
          <span dir="ltr" className="date m-0 p-0">
            {DateTimeToString(dateTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
