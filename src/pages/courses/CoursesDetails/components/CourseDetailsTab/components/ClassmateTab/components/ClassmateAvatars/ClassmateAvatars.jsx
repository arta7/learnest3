import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import defImg from "../../../../../../../../../assets/img/babak-images/classmate-avatar.png";

import "./style/style.css";
import { fileBaseUrl } from "../../../../../../../../../core/services/baseUrl";

const ClassmateAvatars = ({ avatars }) => {
  return (
    <div dir="ltr" className="mt-4">
      <AvatarGroup className="avatar-group" max={5}>
        {avatars?.map((item, index) => (
          <Avatar alt="Avatar" key={index} src={fileBaseUrl + item} />
        ))}
      </AvatarGroup>
    </div>
  );
};

export default ClassmateAvatars;
