import React, { useState, useEffect } from "react";

// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";

// Contexts
import { useLoadingContext } from "../../../core/contexts/loading/loading";

// Mui
import { makeStyles } from "@mui/styles";
import { Drawer, Button, SwipeableDrawer, IconButton } from "@mui/material";

// Api
import { note_apiCalls } from "../../../core/services/agent";
import { useApi, apiCaller } from "../../../core/custom-hooks/useApi";
import { useClassRoomStateContext } from "../../../core/contexts/classRoom/classRoom";
import LoadingBox from "../../loading-spinner/loadingBox.component";
import { now } from "../../../core/utils/utils";
import NoteItem from "./noteItem.component";

const useStyles = makeStyles(() => {
  return {
    root: {
      transition: ".3s",
      "& .MuiPaper-root": {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        overflowY: "hidden !important",
        minHeight: (props) => props.minHeight,
        maxHeight: (props) => props.minHeight,
        "*": {
          transition: ".3s",
        },
        transition: ".3s !important",
      },
    },
  };
});

const AddNote = ({ showNoteDrawer, toggleNoteDrawer }) => {
  // Drawer styles codes
  const classes = useStyles({ minHeight: "70vh" });

  // classRoom
  const { classRoomInfo } = useClassRoomStateContext();
  // useEffect(() => {
  //   console.log(classRoomInfo);
  // }, []);

  //// Accordion
  const [openAccordion, set_openAccordion] = useState(false);
  const toggle_openAccordion = () => {
    set_openAccordion(!openAccordion);
  };

  //////  Notes List ////////

  const [notes, set_notes] = useState([]);
  const getNotes = async () => {
    const { data, status } = await apiCaller({
      api: note_apiCalls.apiCall_getNotes,
      apiArguments: classRoomInfo?.classroomId,
      waitForArguments: true,
    });
    if (status === 200 && data?.data?.length > 0) {
      set_notes(data?.data);
    }
    return data;
  };
  useEffect(() => {
    getNotes();
  }, []);

  ////// Add Note ///////
  const [openLoadingBox, set_openLoadingBox] = useState(false);
  const [newNote, set_newNote] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    set_newNote(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    set_openLoadingBox(true);
    const { status } = await apiCaller({
      api: note_apiCalls.apiCall_addNote,
      apiArguments: {
        content: newNote,
        classRoomId: classRoomInfo?.classroomId,
      },
      toastMessage: true,
      onSuccessMessage: "ثبت یادداشت موفقیت آموز بود.",
      onErrorMessage: "ثبت یادداشت با خطا مواجه شد .",
      onSuccess: async () => {
        await getNotes();
      },
    });
    set_openLoadingBox(false);
    if (status === 200) {
      set_newNote("");
    }
  };

  // Note Delete
  const onNoteDeleted = (id) => {
    const notesClone = JSON.parse(JSON.stringify(notes));
    const noteIndex = notesClone.findIndex((item) => item.id === id);
    notesClone.splice(noteIndex, 1);
    set_notes(notesClone);
  };
  // Note Edit
  const onNoteEdited = (id, newContent) => {
    const notesClone = JSON.parse(JSON.stringify(notes));
    const noteIndex = notesClone.findIndex((item) => item.id === id);
    if (noteIndex < 0) return;
    notesClone[noteIndex].content = newContent;
    set_notes(notesClone);
  };

  return (
    <>
      <Drawer
        classes={classes}
        anchor={"bottom"}
        open={showNoteDrawer}
        onOpen={toggleNoteDrawer}
        onClose={toggleNoteDrawer}
      >
        <div className="m-0 p-0 pt-0 d-flex flex-column justify-content-start align-items-stretch">
          <div className="m-0 p-0 d-flex flex-column justify-content-start align-items-center">
            <IconButton onClick={toggle_openAccordion} className="m-0 p-3">
              {!openAccordion ? (
                <AddBoxIcon
                  style={{ fontSize: "45px" }}
                  color="primary"
                  fontSize="large"
                />
              ) : (
                // <CloseIcon color="primary" fontSize="large" />
                <KeyboardArrowDownIcon color="primary" fontSize="large" />
              )}
            </IconButton>
            <form
              onSubmit={handleSubmit}
              className={
                (openAccordion ? "open-accordion" : "") +
                " position-relative add-note-accordion m-0 p-0 align-self-stretch d-flex flex-column justify-content-start align-items-stretch"
              }
            >
              <LoadingBox
                open={openLoadingBox}
                classes=" w-100 h-100 "
                style={{ top: "0" }}
              />
              <textarea
                onChange={handleChange}
                dir="auto"
                className=" rounded rounded-3 p-2"
                style={{
                  border: "1px solid #aaa",
                  minHeight: "170px",
                  maxHeight: "170px",
                  height: "170px",
                }}
              >
                {newNote}
              </textarea>
              <Button
                type="submit"
                className="align-self-start my-2"
                color="primary"
                variant="contained"
              >
                ثبت
              </Button>
            </form>
          </div>
          <div
            style={{
              maxHeight: openAccordion ? "350px" : "580px",
              transition: ".3s",
            }}
            className="m-0 my-2 p-0 pe-2 last-notes   tiny-scrollbar"
          >
            {notes?.length > 0 &&
              notes?.map((item, index) => (
                <NoteItem
                  key={item.id}
                  onNoteDeleted={onNoteDeleted}
                  onNoteEdited={onNoteEdited}
                  {...item}
                />
              ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AddNote;
