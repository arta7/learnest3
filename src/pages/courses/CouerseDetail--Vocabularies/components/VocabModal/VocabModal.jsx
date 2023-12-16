import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import "./style/style.css";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, vocabularies } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div
        dir="ltr"
        style={{ minHeight: "30vh" }}
        className="p-3 d-flex flex-row justify-content-start align-items-between flex-wrap"
      >
        {vocabularies?.map((it, index) => (
          <span
            key={it.id}
            onClick={(e) => props.handleModalItemsClick(index + 1)}
            className=" col-3 my-2 m-0 p-2 d-flex flex-column justify-content-center align-items-center"
          >
            {/* <button
              style={{
                width: "calc(100% - .75rem)",
                maxWidth: "30px",
              }}
              type="button"
              className="btn btn-sm border shadow m-0 d-flex flex-column justify-content-center align-items-center"
            >
              {index + 1}
            </button> */}

            <Button
              variant="contained"
              color="primary"
              className=" m-0 d-flex flex-column justify-content-center align-items-center"
            >
              {index + 1}
            </Button>
          </span>
        ))}
      </div>
    </Dialog>
  );
}

export default function VocabModal(props) {
  //   console.log(props?.vocabularies);
  return (
    <div>
      <br />
      <SimpleDialog
        handleModalItemsClick={props?.handleModalItemsClick}
        vocabularies={props?.vocabularies}
        selectedValue={props?.selectedValue}
        open={props?.openModal}
        onClose={props?.handleCloseModal}
      />
    </div>
  );
}
