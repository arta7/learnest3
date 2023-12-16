import React, { useState, useEffect } from "react";
import { fileBaseUrl } from "../../../../../core/services/baseUrl";
import gemIcon from "../../../../../assets/img/icons/jem.png";
import { useNavigate } from "react-router";

import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { extra_apiCalls } from "../../../../../core/services/agent";
import { useClassRoomActions } from "../../../../../core/contexts/classRoom/classRoom";
import { useLoadingContext } from "../../../../../core/contexts/loading/loading";

const ExtraType2 = ({ id, title, imageUrl, gems, tags, folder, type }) => {
  const navigate = useNavigate();
  ////////
  /////////////////////////////////////////////
  //////////// VOCAB ACTIONS AND STATES : START
  const [extraDetails, set_extraDetails] = useState();
  const { breadCrumbActions } = useClassRoomActions();
  const { handleOpen, handleClose } = useLoadingContext();
  useEffect(() => {
    if (extraDetails) {
      handleSeeVocabs();
    }
  }, [extraDetails]);
  const handleSeeVocabs = () => {
    breadCrumbActions.set_breadCrumb_extra({
      extraTitle: extraDetails?.title,
      extraMediaType: extraDetails?.extraMediaType,
      isQuestion: false,
      extraLink: "/extra-details?id=" + id,
      extraId: id,
    });
    navigate("/vocabularies/" + id, {
      state: {
        vocabs: extraDetails.vocabs,
        sessionId: id,
      },
    });
  };
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  ////// VOCAB ACTIONS AND STATES : END ///////
  /////////////////////////////////////////////
  /////////////////////////////////////////////

  const handleClick = async () => {
    if (type === "crossword") navigate("/extra/crossword?id=" + id);
    else if (type === "vocab") {
      handleOpen();
      await apiCaller({
        api: extra_apiCalls.apiCall_details,
        apiArguments: id,
        onSuccess: (resp) => {
          set_extraDetails(resp.data.data);
        },
      });
      handleClose();
    } else {
      navigate("/extra-details?id=" + id, { state: { extraType: type } });
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "350px",
        minHeight: "120px",
      }}
      className="m-0 m-0 p-0 shadow box-rounded-1 cursor-pointer d-flex flex-row justify-content-start align-items-stretch"
    >
      <div className="m-0 p-2 col-2 d-flex flex-column justify-content-center align-items-center">
        <div className="m-0 p-0 d-flex justify-content-center align-items-center">
          <span>{gems}</span>
          <img
            style={{
              width: "30px",
              height: "30px",
            }}
            alt="..."
            src={gemIcon}
            className="mx-1 noselect"
          />
        </div>
      </div>
      <div className="m-0 p-2 col-4 d-flex flex-column justify-content-center align-items-center">
        <img
          className="box-rounded-1 align-self-center noselect"
          style={{
            maxWidth: "calc(100% - 1.5rem)",
          }}
          alt="..."
          src={fileBaseUrl + imageUrl}
        />
      </div>
      <div className="m-0 p-0 pt-2 col-6 d-flex flex-column justify-content-center align-items-center">
        <span dir="ltr" style={{ maxWidth: "150px" }} className="text-truncate">
          {title}
        </span>
        {tags && (
          <span
            style={{ borderRadius: "0 .5rem", width: "auto" }}
            className={
              " bg-main-color-1 text-nowrap align-self-end mt-auto p-1 d-flex flex-row justify-content-center align-items-center"
            }
          >
            {tags}
          </span>
        )}
      </div>
    </div>
  );
};

export default ExtraType2;
