import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import chatGroupIcon from "../../../assets/img/icons/people.png";
import moment from "moment";

const ChatListItem = ({
  group,
  lastMessage,
  lastSender,
  hasUnread,
  lastMessageDateTime,
  unreads,
}) => {
  const navigate = useNavigate();
  const handleGoIntoChat = () => {
    navigate("/chat/" + group);
  };

  return (
    <div
      onClick={handleGoIntoChat}
      dir="ltr"
      className="cursor-pointer m-0 my-2 p-2 box-rounded-1 d-flex flex-row justify-content-start align-items-stretch"
      style={{
        boxShadow: "0px 3px 8px 3px #eee",
        background: "#fff",
        minHeight: "60px",
      }}
    >
      <div className="m-0 p-0 d-flex flex-column justify-content-center align-items-center">
        <img
          src={chatGroupIcon}
          alt="..."
          className="rounded rounded-circle"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <div className="m-0 p-0 pe-2 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
        <div className="d-flex flex-row justify-content-start align-items-baseline">
          <span className="p-0 m-0 fs-6 fw-bold">{group}</span>
          <span
            className={(unreads ? "text-success" : "") + " p-0 m-0 me-auto"}
          >
            {moment(lastMessageDateTime, "YYYY-MM-DD hh:mm:ss")
              .locale("fa-IR")
              .fromNow()}
          </span>
        </div>
        <div className="mt-2 p-0 d-flex flex-row justify-content-start align-items-baseline">
          <span className="p-0 m-0 ms-1 text-nowrap">{lastSender + " :"}</span>
          <p className="p-0 m-0 text-truncate" style={{ maxWidth: "150px" }}>
            {lastMessage}
          </p>
          {unreads ? (
            <span
              className="p-1 m-0 me-auto rounded rounded-circle"
              style={{
                background: "rgb(25, 135, 84)",
                color: "#fff",
              }}
            >
              {unreads}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
