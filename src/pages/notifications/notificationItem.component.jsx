import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
////////
////////
////////
const NotificationItem = ({
  className = "",
  id,
  title,
  content,
  isSeen,
  date,
}) => {
  return (
    <div className={"m-0 p-3 " + className}>
      {/* ==== */}
      <div className="m-0 p-0 d-flex flex-row justify-content-between align-items-center align-items-baseline">
        <span className="m-0 p-0 fs-6 fw-bold">{title}</span>
        <span className="m-0 p-0 fs-7">{date}</span>
      </div>
      {/* ==== */}
      <div className="my-3" dangerouslySetInnerHTML={{ __html: content }}></div>
      {/* ==== */}
      <div className="d-flex flex-row justify-content-end align-items-center">
        <VisibilityIcon
          htmlColor={isSeen ? "#666" : "#000"}
          fontSize="medium"
        />
      </div>
      {/* ==== */}
    </div>
  );
};

export default NotificationItem;
