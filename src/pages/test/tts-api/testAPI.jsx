import React, { useState, useEffect } from "react";
import { useRef } from "react";

const apikey = "09cd3d9930e242cdbaf70a88703b1718";
//Amh@20807337370314542
const TestAPI = (props) => {
  const [src, setSrc] = useState();
  const [loading, setLoading] = useState(false);
  const audioRef = useRef();
  const onClick = () => {
    const formData = new FormData();
    formData.append("key", apikey);
    formData.append("src", "enterpreneurial");
    formData.append("hl", "en-us");
    formData.append("c", "mp3");
    formData.append("f", "44khz_16bit_stereo");
    formData.append("b64", true);

    fetch(`https://api.voicerss.org/`, { method: "POST", body: formData })
      .then((resp) => resp.text())
      .then((data) => new Audio(data).play())
      .catch((ex) => console.log(ex.message));
  };
  const handlePlay = async () => {
    // setLoading(true);
    // const audio = new Audio(
    //   "https://learnest.app/uploads/extramedias/9b3c4ffc-c918-42b3-ad3d-03196ca24d34.mp3"
    // );
    // setLoading(false);
    audioRef?.current?.play();
  };
  ///////
  //////
  return (
    <div className="" style={{ height: "50vh" }}>
      <button onClick={onClick}>Play</button>
      <button onClick={handlePlay}>Play2</button>
      <audio
        ref={audioRef}
        src="https://learnest.app/uploads/extramedias/9b3c4ffc-c918-42b3-ad3d-03196ca24d34.mp3"
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadedData={() => {
          setLoading(false);
        }}
      ></audio>
      {loading && <>loading ...</>}
    </div>
  );
};

export default TestAPI;
