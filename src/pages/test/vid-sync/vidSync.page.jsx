// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
// // import enVid from "../../../assets/test/enVid.mp4";

// const VideoSyncTest = () => {
//   const handle = (e) => {
//     localStorage.setItem("learnestToken", "meysam");
//   };

//   return (
//     <div className="">
//       <button onClick={handle}>set token</button>
//       {/* <ReactPlayer
//         controls
//         playing
//         url={enVid}
//         config={{
//           file: {
//             tracks: [
//               {
//                 kind: "subtitles",
//                 src: "http://learnest.app/uploads/enSub.txt",
//                 srcLang: "fa",
//                 default: true,
//               },
//             ],
//           },
//         }}
//       /> */}
//     </div>
//   );
// };

// export default VideoSyncTest;
import { Button, Typography } from "@mui/material";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="p-3">
      <Typography className="mb-2">
        Microphone: {listening ? "on" : "off"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="mx-2 ms-0"
        onClick={() => {
          SpeechRecognition.startListening({ language: "en" });
        }}
      >
        Start
      </Button>
      <Button
        className="mx-2"
        variant="contained"
        color="primary"
        onClick={SpeechRecognition.stopListening}
      >
        Stop
      </Button>
      <Button
        className="mx-2"
        variant="contained"
        color="primary"
        onClick={resetTranscript}
      >
        Reset
      </Button>
      <Typography className="m-2" lang="en">
        {transcript}
      </Typography>
    </div>
  );
};
export default Dictaphone;
