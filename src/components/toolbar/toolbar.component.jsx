import React, { useState, useEffect, createRef } from "react";

//icons
import penIcon from "../../assets/img/icons/pen.png";
import leitnerIcon from "../../assets/img/icons/footer-note.png";

// Mui Start
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Button, Dialog, IconButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

// ScreenShot
import { useScreenshot, createFileName } from "use-react-screenshot";

// Mui End

import { home_apiCalls } from "../../core/services/agent";
import { apiCaller } from "../../core/custom-hooks/useApi";

import AddToLeitner from "./components/addToLeitner.component";
import AddNote from "./components/addNote.component";
import BookMarkDrawer from './components/BookMarkDrawer'


import "./toolbar.styles.scss";
import useToolbarPosition from "./useToolbarPosition.hook";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { useUserProfileContext } from "../../core/contexts/profile/profileProvider";
import { useLocation } from "react-router";
import { LeitnerIcon, NoteIcon } from "../icons/icons";
import { Bookmark } from "@mui/icons-material";

const Toolbar = ({
  className = "",
  isBookmark = false,
  id,
  isVocab = false,
  front = "",
  back = "",
  question=null
}) => {
  const location = useLocation();
  // profile data
  const { profileData } = useUserProfileContext();
  // loading
  const { handleOpen: handleOpenLoading, handleClose: handleCloseLoading } =
    useLoadingContext();
  ///////////////// Handle Menu Position
  const { right, top } = useToolbarPosition();

  //////////// Handle Menu Functionality
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  //////////////// Note Codes ///////////////

  // Drawer toggle codes
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNoteDrawer, set_showNoteDrawer] = useState(false);
  const toggleNoteDrawer = () => {
    set_showNoteDrawer(!showNoteDrawer);
  };
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  //////////////// Leitner Codes ////////////

  const [openLeitner, set_openLeitner] = useState(false);
  const toggle = () => {
    set_openLeitner(!openLeitner);
  };
  const handleClickLeitner = async () => {
    toggle();
  };

  /////////////////////////////////
  ////////  Reporting Codes  ///////////
  //////////////////////////////////

  // ScreenShot
  const [imag, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  // dialog codes
  const [openReportDialog, set_openReportDialog] = useState(false);
  const toggleReportDialog = () => {
    set_openReportDialog(!openReportDialog);
    // if (!openReportDialog) {
    //   handleOpenLoading();
    //   takeScreenShot(document.body)
    //     .then(async (image, { name = "img", extension = "jpg" } = {}) => {
    //       const a = document.createElement("a");
    //       a.href = image;
    //       a.download = createFileName(extension, name);
    //       a.click();

    //       set_openReportDialog(!openReportDialog);
    //     })
    //     .finally(() => {
    //       handleCloseLoading();
    //     });
    // } else {
    //   set_openReportDialog(!openReportDialog);
    // }
  };

  // Description
  const [reportFieldError, set_reportFieldError] = useState(false);
  const [reportText, set_reportText] = useState("");
  const onReportTextChange = (e) => {
    set_reportText(e.target.value);

    if (!e.target.value) {
      set_reportFieldError(true);
    } else if (e.target.value && reportFieldError) {
      set_reportFieldError(false);
    }
  };

  // Submit
  const handleSubmitReport = (e) => {
    e.preventDefault();

    if (reportText && reportText?.trim()) {
      apiCaller({
        api: home_apiCalls.apiCall_report,
        apiArguments: {
          data: JSON.stringify(profileData),
          description: reportText,
          screenShot: null,
        },
        onSuccessMessage: "ارسال گزارش با موفقیت انجام شد .",
        onErrorMessage: "ارسال گزارش با خطا مواجه شد.",
        onStart: () => {
          handleOpenLoading();
        },
        onEnd: () => {
          handleCloseLoading();
        },
      });
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right,
        top,
        zIndex: "10",
      }}
      dir="rtl"
    >
      <IconButton
        ref={anchorRef}
        id="toolbar-button"
        aria-controls={open ? "toolbar-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="contained"
        color="primary"
      >
        <MoreVertIcon fontSize="medium" color="primary" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="top-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="toolbar-menu"
                  aria-labelledby="toolbar-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      toggleReportDialog();
                    }}
                  >
                    <FlagCircleIcon
                      className="cursor-pointer me-2 ms-0"
                      style={{ fontSize: "30px" }}
                      color="primary"
                    />
                    گزارش خطا
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      toggleNoteDrawer();
                    }}
                  >
                    <span className="m-0 me-2 p-0  cursor-pointer">
                      {/* <img alt="..." src={penIcon} /> */}
                      <NoteIcon
                        height="25"
                        width="25"
                        lightness="main"
                        className="me-2"
                      />
                    </span>
                    یادداشت برداری
                  </MenuItem>
                  {location.pathname == '/question-engine' && (
                    <MenuItem
                      onClick={() => {
                        setOpen(false);
                        setShowDrawer(!showDrawer)
                      }}
                    >
                      <Bookmark
                        className="cursor-pointer me-2 ms-0"
                        style={{ fontSize: "30px" }}
                        color="primary"
                      />
                      افزودن به بوکمارک
                    </MenuItem>
                  )}
                  {!location.pathname.includes("/vocabularies") && (
                    <MenuItem
                      onClick={() => {
                        setOpen(false);
                        handleClickLeitner();
                      }}
                    >
                      <span className="m-0 me-2 p-0 cursor-pointer">
                        {/* <img alt="..." src={leitnerIcon} /> */}
                        <LeitnerIcon
                          height="25"
                          width="25"
                          lightness="main"
                          className="me-2"
                        />
                      </span>
                      افزودن به لایتنر
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <AddNote
        showNoteDrawer={showNoteDrawer}
        toggleNoteDrawer={toggleNoteDrawer}
      />
      {location.pathname == '/question-engine' && 
        <BookMarkDrawer
          isDrawer={showDrawer}
          toggleDrawer={toggleDrawer}
          question={question}
        />
      }
      <AddToLeitner
        isBookmark={isBookmark}
        // id={id}
        isVocab={isVocab}
        front={front}
        back={back}
        toggle={toggle}
        open={openLeitner}
        handleClickLeitner={handleClickLeitner}
      />
      <Dialog open={openReportDialog} onClose={toggleReportDialog}>
        <form
          onSubmit={handleSubmitReport}
          className="m-0 p-3 w-100 d-flex flex-column justify-content-start align-items-stretch"
        >
          <label className="mb-2"> متن گزارش </label>
          <textarea
            style={{
              height: "250px",
              width: "300px",
              resize: "none",
            }}
            autoFocus
            className="m-0 py-2 px-3 border"
            onChange={onReportTextChange}
          >
            {reportText}
          </textarea>
          <div style={{ height: "1rem" }} className="mt-2 text-danger fs-7">
            {reportFieldError && "پرکردن این فیلد الزامیست ."}
          </div>
          <Button
            className="mt-3"
            variant="contained"
            color="primary"
            type="submit"
          >
            ارسال
          </Button>
        </form>
      </Dialog>
    </div>
    // <div
    //   dir="rtl"
    //   className={
    //     className +
    //     " m-0 p-2 px-0 d-flex flex-row justify-content-between align-items-center"
    //   }
    // >
    //   <div className="d-flex flex-row justify-content-start align-items-center">
    //     <FlagCircleIcon
    //       className="cursor-pointer"
    //       style={{ fontSize: "30px" }}
    //       color="primary"
    //     />
    //     <AddNote />
    //   </div>
    //   <AddToLeitner
    //     isBookmark={isBookmark}
    //     id={id}
    //     isVocab={isVocab}
    //     front={front}
    //     back={back}
    //   />
    // </div>
  );
};

export default Toolbar;
