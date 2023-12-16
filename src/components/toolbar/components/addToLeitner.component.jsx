import React, { useState, useEffect } from "react";

// Icons
import leitnerIcon from "../../../assets/img/icons/footer-note.png";
// Api
import { leitners_apiCalls } from "../../../core/services/agent";

// contexts
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { Dialog } from "@mui/material";

// MUI
import { Button } from "@mui/material";

const AddToLeitner = ({
  id,
  isVocab = false,
  front,
  back,
  open,
  toggle,
  handleClickLeitner,
  onSucceed,
  getLeitnerDashboardData,
}) => {
  const [cardInfo, set_cardInfo] = useState({
    front: front,
    back: back,
    isVocab: isVocab,
  });
  const { handleOpen, handleClose } = useLoadingContext();

  useEffect(() => {
    set_cardInfo({ ...cardInfo, front: front, back: back });
  }, [front, back]);

  const handleAddToLeitner = async () => {
    handleOpen();
    await apiCaller({
      api: leitners_apiCalls.apiCall_addtoleitner,
      apiArguments: {
        front: cardInfo.front,
        back: cardInfo.back,
        isVocab: cardInfo.isVocab,
      },
      toastMessage: true,
      onSuccessMessage: "با موفقیت به لایتنر افزوده شد",
      onErrorMessage: "افزودن به لایتنر با خطا مواجه شد",
      onSuccess: () => {
        set_cardInfo({ ...cardInfo, front: "", back: "" });
        handleClose();
        toggle();
        if (getLeitnerDashboardData) {
          getLeitnerDashboardData();
        }
        if (onSucceed) {
          onSucceed();
        }
      },
    });
    handleClose();
  };

  const handleChange = (e) => {
    if (e.target.name !== "leitnerType") {
      const { id, value } = e.target;
      set_cardInfo({ ...cardInfo, [id]: value });
    } else {
      const value = e.target.id === "isVocab";
      set_cardInfo({ ...cardInfo, isVocab: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToLeitner();
  };

  const onClose = () => {
    set_cardInfo({ ...cardInfo, front: "", back: "" });
    handleClickLeitner();
  };

  return (
    <>
      {/* {!isVocab && ( */}
      <Dialog open={open} onClose={onClose}>
        <form
          onSubmit={handleSubmit}
          style={{
            minWidth: "320px",
          }}
          className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch"
        >
          <div className="m-0 p-0 my-2 d-flex flex-column justify-content-start align-items-stretch">
            <label htmlFor="front" className="align-self-start">
              جلوی کارت
            </label>
            <input
              autoFocus
              id="front"
              value={cardInfo.front}
              onChange={handleChange}
              type="text"
              className="mt-2 px-3 py-2 input-grey rounded rounded-3 border border-1"
            />
          </div>
          <div className="m-0 p-0 my-2 d-flex flex-column justify-content-start align-items-stretch">
            <label htmlFor="back" className="align-self-start">
              پشت کارت
            </label>
            <input
              id="back"
              value={cardInfo.back}
              onChange={handleChange}
              type="text"
              className="mt-2 px-3 py-2 input-grey rounded rounded-3 border border-1"
            />
          </div>
          <div className="m-0 p-0 my-2 d-flex flex-column justify-content-start align-items-stretch">
            <label htmlFor="back" className="align-self-start">
              نوع لایتنر
            </label>
            <div className="m-0 p-0 mt-2 d-flex flex-row justify-content-start align-items-stretch">
              <label
                htmlFor="isVocab"
                className="m-0 p-0 d-flex flex-row justify-content-center align-items-center"
              >
                <input
                  checked={cardInfo.isVocab}
                  onChange={handleChange}
                  type="radio"
                  name="leitnerType"
                  id="isVocab"
                />
                <span className="ms-1">لغت</span>
              </label>
              <label
                htmlFor="isGrammar"
                className="m-0 ms-2 p-0 d-flex flex-row justify-content-center align-items-center"
              >
                <input
                  checked={!cardInfo.isVocab}
                  onChange={handleChange}
                  type="radio"
                  name="leitnerType"
                  id="isGrammar"
                />
                <span className="ms-1">گرامر</span>
              </label>
            </div>
          </div>
          <div className="m-0 p-0 my-2 mt-3 d-flex flex-row justify-content-start align-items-stretch">
            <Button variant="contained" color="primary" type="submit">
              ثبت
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              className="ms-2"
              onClick={toggle}
            >
              انصراف
            </Button>
          </div>
        </form>
      </Dialog>
      {/* )} */}
    </>
  );
};

export default AddToLeitner;
