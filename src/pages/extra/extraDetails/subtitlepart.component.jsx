import React, { useState, useEffect } from "react";

const SubtitlePart = ({ startTime, endTime, content, currentTime }) => {
  const retriveTime = (time) => {
    const timeParts = time.split(":");

    const hourSeconds = parseInt(timeParts[0]) * 60 * 60;
    const minuteSeconds = parseInt(timeParts[1]) * 60;
    const seconds = parseInt(timeParts[2]);

    const totalSeconds = hourSeconds + minuteSeconds + seconds;

    return totalSeconds;
  };

  if (
    retriveTime(startTime) < currentTime &&
    retriveTime(endTime) > currentTime
  ) {
    return <strong className="m-1 py-1  ">{content}</strong>;
  } else if (retriveTime(endTime) < currentTime) {
    return <span className="m-1 py-1  ">{content}</span>;
  }

  return <></>;
};

export default SubtitlePart;
