import { SendRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import sendMessageIcon from "../../../assets/img/icons/send-message.png";

const ChatSendMessageForm = ({ onSend, isSending, connected }) => {
  const [message, set_message] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSending) return;
    if (!connected) return;
    onSend(message);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    set_message(val);
  };

  return (
    <form
      style={{
        position: "fixed",
        bottom: ".5rem",
        right: "0",
        left: "0",
        width: "calc(100% - 1rem)",
        maxWidth: "770px",
        zIndex: "10",
      }}
      onSubmit={handleSubmit}
      dir="rtl"
      className="input-grey p-2 m-0 mx-auto border overflow-hidden box-rounded-1  d-flex flex-row justify-content-start align-items-stretch"
    >
      <IconButton type="submit">
        <SendRounded />
      </IconButton>

      <textarea
        style={{ height: "70px" }}
        dir="auto"
        className=" tiny-scrollbar m-0 py-2 px-3 flex-grow-1 outline-none border-0 input-grey"
        type="text"
        disabled={!connected}
        value={message}
        onChange={handleChange}
      />
    </form>
  );
};

export default ChatSendMessageForm;
