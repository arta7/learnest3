import React, { useEffect, useRef, useState } from "react";
import { VolumeUp } from "@mui/icons-material";
import { useSpeechSynthesis } from "react-speech-kit";
import defImg from "../../../../../assets/img/babak-images/image current.png";
import "./style/style.css";
import { IconButton } from "@mui/material";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";

const VocabItem = (props) => {
  const { data = null } = props;
  const { speak } = useSpeechSynthesis();
  const [errored, setErrored] = useState(false);
  const [audio, set_audio] = useState();
  const audioRef = useRef();
  useEffect(() => {
    if (props?.isCurrent && !audioRef?.current) {
      // set_audio(new Audio(fileBaseUrl + data?.voiceUrl));
      audioRef.current = new Audio(fileBaseUrl + data?.voiceUrl);
    }
  }, [props?.isCurrent, audioRef?.current]);
  /////
  // const [audioLoadedOnce, set_audioLoadedOnce] = useState(false);
  // const onAudioLoaded = () => {
  //   set_audioLoadedOnce(true);
  // };

  const [imageLoadedOnce, set_imageLoadedOnce] = useState(false);
  const onImageLoaded = () => {
    set_imageLoadedOnce(true);
  };

  const onError = () => {
    if (!errored) {
      setErrored(true);
    }
  };

  const handlePlayAudio = () => {
    if (data?.voiceUrl) {
      // audio?.play();
      audioRef?.current?.play();
    } else speak({ text: data?.phrase });
  };

  return (
    <div className="m-0 p-3 mx-auto vocab-item-holder">
      <div className="p-0 m-0 mx-auto vocab-img-holder">
        {(props?.isCurrent || imageLoadedOnce) && (
          <img
            src={fileBaseUrl + data?.imageUrl}
            alt="NO_PIC"
            onError={onError}
            onLoadedData={onImageLoaded}
            className="vocab-img"
          />
        )}
      </div>
      <span className="fs-5 fw-6 mx-auto my-2">{data?.phrase}</span>
      {/* <span className="fs-5 fw-6 mx-auto vocab-phrase-divider"></span> */}
      <span className="fs-5 fw-6 mx-auto">{data?.pronunciation}</span>
      <span style={{ cursor: "pointer" }} className="fs-5 fw-6 mx-auto">
        <IconButton onClick={handlePlayAudio}>
          <VolumeUp />
        </IconButton>
        {/* {(props?.isCurrent || audioLoadedOnce) && (
          <audio
            onLoadedData={onAudioLoaded}
            src={fileBaseUrl + data?.voiceUrl}
            ref={audioRef}
          />
        )} */}
      </span>
      <span dir="rtl" className="fs-5 fw-6 mx-auto my-2">
        {data?.meaning}
      </span>
    </div>
  );
};

export default VocabItem;
