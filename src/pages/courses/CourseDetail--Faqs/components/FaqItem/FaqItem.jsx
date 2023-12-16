import React, { useState } from "react";
import parse from "html-react-parser";
import defImg from "../../../../../assets/img/babak-images/play-button.png";
import "./style/style.css";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";

const FaqItem = (props) => {
  const { data = null } = props;

  return (
    <div className="m-0 p-3 mx-auto grammar-item-holder">
      {data?.voiceUrl ? (
        <div className="p-0 m-0 mx-auto grammar-img-holder">
          <img src={defImg} alt="NO_PIC" className="grammar-img" />
        </div>
      ) : null}
      {data?.content ? (
        <div className="px-2">
          {data?.content
            ? parse(
              data?.content?.toString()?.replaceAll("<p>", '<p dir="auto">')
            )
            : null}
        </div>
      ) : null}
      {data?.voiceUrl ? (
        <div className="w-100 d-flex justify-content-center align-items-center mx-auto">
          <audio controls>
            <source src={fileBaseUrl + data?.voiceUrl} type="audio/mp3" />
          </audio>
        </div>
      ) : null}
    </div>
  );
};

export default FaqItem;
