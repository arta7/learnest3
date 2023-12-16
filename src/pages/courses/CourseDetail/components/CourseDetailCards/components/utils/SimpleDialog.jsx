import React from "react";
import { Dialog } from "@mui/material";
import "./styles/modal-styles.css";

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-75 mx-auto d-flex flex-row justify-content-center align-items-center p-2">
        <div className="line"></div>
        <span className="in-english-text text-center d-flex flex-row justify-content-center align-items-center">
          in English
        </span>
        <div className="line"></div>
      </div>
      <div className="p-1 m-0 d-flex justify-content-center align-items-center">
        <div
          className="p-3 m-0 mt-2 d-flex flex-row justify-content-center align-items-stretch flex-wrap"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {/* Dialog Card */}
          {props.children}
          {/* Dialog Card */}
        </div>
      </div>
    </Dialog>
  );
};

export default SimpleDialog;
