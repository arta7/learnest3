import React, { useEffect, useState } from "react";
import "./style/style.css";
// import defImg from "../../../../../../../../../assets/img/classmate-avatar.png";

import defImg from "../../../../../../../../../../assets/img/icons/profile.png";
import { fileBaseUrl } from "../../../../../../../../../../core/services/baseUrl";
import { apiCaller } from "../../../../../../../../../../core/custom-hooks/useApi";
import http from "../../../../../../../../../../core/services/http";

const ClassmateCardItem = ({ phone, avatarUrl, name }) => {
  // const [userAvatar, set_userAvatar] = useState();
  // useEffect(() => {
  //   const getSrc = async () => {
  //     const { data, status } = await apiCaller({
  //       api: () => {
  //         return http.get(avatarUrl);
  //       },
  //     });

  //     console.log(data, status);
  //     if (status === 200 && data) {
  //       set_userAvatar(data?.data);
  //     }
  //   };
  //   if (avatarUrl) {
  //     getSrc();
  //   }
  // }, [avatarUrl]);

  return (
    <div
      dir="auto"
      className="m-0 p-0 w-100 py-4 px-2 d-flex mt-3 justify-content-start align-items-center shadow classmate-card-item"
    >
      <div
        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        className="mx-2"
      >
        <img
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          src={fileBaseUrl + avatarUrl}
          alt="..."
        />
      </div>
      <div className="d-flex flex-column mx-2">
        <span className="fw-bold">{name}</span>
        <span className="text-muted fs-7 mt-2">{phone}</span>
      </div>
    </div>
  );
};

export default ClassmateCardItem;
