import Add from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import { fileBaseUrl } from "../../core/services/baseUrl";
import defImage from "../../assets/img/icons/profile.png";
import LoadingBox from "../../components/loading-spinner/loadingBox.component";
import { IconButton } from "@mui/material";
import { Check } from "@mui/icons-material";
import changeIcon from "../../assets/img/icons/exchange.png";
import { profile_apiCalls } from "../../core/services/agent";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { toast } from "react-toastify";
import { useLoadingContext } from "../../core/contexts/loading/loading";
const defaultStyles = {
  position: "relative",
};

const UpdateAvatar = ({
  holderClassName = "",
  holderStyles = {},
  avatarUrl,
}) => {
  const loading = useLoadingContext();
  const imageInputRef = React.useRef();
  const [avatarSrc, set_avatarSrc] = useState(
    avatarUrl ? fileBaseUrl + avatarUrl : defImage
  );

  const [imageChanged, set_imageChanged] = useState(false);
  // const [isLoading, set_isLoading] = useState(true);
  // const toggleLoading = () => {
  //   set_isLoading(!isLoading);
  // };

  // useEffect(() => {}, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  useEffect(() => {
    if (avatarUrl) {
      set_avatarSrc(fileBaseUrl + avatarUrl);
    }
  }, [avatarUrl]);

  const handleImageLoadingError = (e) => {
    console.log("first");
    console.log(e);
    set_avatarSrc(defImage);
  };
  const handleImageInputChanged = async (e) => {
    if (e.target?.files.length) {
      const stringImage = await getBase64(e.target?.files[0]);
      set_avatarSrc(stringImage);
      set_imageChanged(true);
    } else {
      set_avatarSrc(defImage);
      set_imageChanged(false);
    }
  };

  const handleUpdateAvatar = async () => {
    const frmData = new FormData();
    frmData.append("input", imageInputRef.current.files[0]);
    loading.handleOpen();
    await apiCaller({
      api: profile_apiCalls.apiCall_updateAvatar,
      apiArguments: frmData,
      onSuccess: () => {
        toast.success("آپلود آواتار با موفقیت انجام شد .");
      },
      onError: () => {
        toast.error("آپلود آواتار با خطا مواجه شد.");
      },
    });
    loading.handleClose();
  };
  return (
    <div
      className={holderClassName + " m-0 p-0 position-relative "}
      style={{ ...defaultStyles, ...holderStyles }}
    >
      {/* <LoadingBox open={isLoading} /> */}
      <img
        // onLoad={toggleLoading}
        src={avatarSrc}
        alt="..."
        onError={handleImageLoadingError}
        style={{
          maxWidth: "300px",
          maxHeight: "200px",
          minHeight: "150px",
          // minWidth: "150px",
        }}
      />{" "}
      <label htmlFor="userAvatar">
        <input
          id="userAvatar"
          ref={imageInputRef}
          type={"file"}
          accept="image"
          className="d-none"
          onChange={handleImageInputChanged}
        />
        {!imageChanged && (
          <Add style={{ cursor: "pointer" }} fontSize="large" color="primary" />
        )}
        {imageChanged && (
          <img
            style={{
              height: "35px",
              width: "35px",
              cursor: "pointer",
            }}
            src={changeIcon}
            fontSize="large"
            className="mx-1"
          />
        )}
      </label>
      {imageChanged && (
        <IconButton onClick={handleUpdateAvatar}>
          <Check
            style={{ cursor: "pointer" }}
            fontSize="large"
            color="primary"
          />
        </IconButton>
      )}
    </div>
  );
};

export default UpdateAvatar;
