import React, { useState, useEffect } from "react";
import { imagesBaseUrl } from "../../../../../core/services/baseUrl";
import { weekdaysEnum } from "../../../../../core/enums";

const Invitement = ({
  className = "",
  classRoomId,
  weekDays,
  callerName,
  callerPhone,
  callerAvatarUrl,
  inviteDate,
}) => {
  return (
    <div
      dir="ltr"
      style={{
        // border: "1px solid #ebebeb",
        boxShadow: "0px 13px 25px 0px #0000001F",
        background: "#fff",
      }}
      className={
        className +
        " box-rounded-1 m-0 p-0 d-flex flex-row justify-content-start align-items-stretch"
      }
    >
      <div className="m-0 p-2 d-flex flex-row justify-content-center align-items-center">
        <img
          src={callerAvatarUrl}
          alt="..."
          className=""
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
        <div className="m-0 p-2 d-flex flex-row justify-content-between align-items-baseline">
          <span>{callerName}</span>
          <span>{inviteDate}</span>
        </div>
        <div className=" text-muted m-0 p-2 d-flex flex-row justify-content-between align-items-baseline">
          <span className="text-muted">{callerPhone}</span>
          <span>{`روز های هفته : ${weekdaysEnum[weekDays]}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Invitement;
