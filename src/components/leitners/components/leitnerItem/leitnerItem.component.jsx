import React, { useState, useEffect } from "react";

import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { imagesBaseUrl, fileBaseUrl } from "../../../../core/services/baseUrl";
import { useSpeechSynthesis } from "react-speech-kit";
import "./leitnerItem.styles.scss";

const LeitnerItem = ({
  id,
  front,
  back,
  imageUrl,
  box,
  shouldStudyToday,
  onDelete,
}) => {
  const [innerCartTransform, set_innerCartTransform] = useState(0);

  const { speak } = useSpeechSynthesis();

  const handleFlipCart = () => {
    set_innerCartTransform(innerCartTransform === 0 ? 180 : 0);
  };

  const renderCard = ({ isFront = true, text, imageUrl }) => {
    return (
      <div
        className={`flip-card-${
          isFront ? "front" : "back"
        } m-0 p-3 pb-1 d-flex flex-column justify-content-start align-items-center`}
      >
        <div
          className="content d-flex flex-column justify-content-start align-items-center"
          style={{ marginTop: "100px" }}
        >
          {imageUrl && (
            <img className="" src={fileBaseUrl + imageUrl} alt="..." />
          )}
          <span className="my-3 fs-6">{text}</span>
          <IconButton onClick={() => speak({ text: text })}>
            <VolumeUpIcon fontSize="large" />
          </IconButton>
        </div>
        <div className="w-100 mt-auto d-flex flex-row justify-content-between align-items-center">
          <span className="text-danger cursor-pointer fs-6" onClick={onDelete}>
            حذف کارت
          </span>
          <IconButton className="" onClick={handleFlipCart}>
            <ThreeSixtyIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className="flip-card">
      <div
        style={{
          transform: `rotateY(${innerCartTransform}deg)`,
        }}
        className="flip-card-inner"
      >
        {renderCard({ isFront: true, text: front })}
        {renderCard({ isFront: false, text: back })}
      </div>
    </div>
  );
};

export default LeitnerItem;
