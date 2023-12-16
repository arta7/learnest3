import React, { useState, useEffect } from "react";

// icons
import { IconButton, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

// api
import { note_apiCalls } from "../../../core/services/agent";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import LoadingBox from "../../loading-spinner/loadingBox.component";

const NoteItem = ({
  id,
  content,
  date,
  classRoomId,
  onNoteDeleted,
  onNoteEdited,
}) => {
  // refs
  const ref_textArea = React.useRef();
  /// Delete Note
  const [deleteLoading, set_deleteLoading] = useState(false);

  const handleDelete = async () => {
    if (deleteLoading) return;
    set_deleteLoading(true);
    await apiCaller({
      api: note_apiCalls.apiCall_deleteNote,
      apiArguments: { id },
      onSuccess: () => {
        onNoteDeleted(id);
      },
    });
    set_deleteLoading(false);
  };
  ///// Edit Note
  const [editLoading, set_editLoading] = useState(false);
  const [enableEdit, set_enableEdit] = useState(false);
  const [editContent, set_editContent] = useState(content);
  const handleEnableEdit = () => {
    if (!enableEdit) {
      ref_textArea.current.focus();
    }
    set_enableEdit(!enableEdit);
  };
  const handleEdit = async () => {
    set_editLoading(true);
    await apiCaller({
      api: note_apiCalls.apiCall_editNote,
      apiArguments: { id, content: editContent, classRoomId: classRoomId },
      onSuccess: () => {
        handleEnableEdit();
        onNoteEdited(id, editContent);
      },
    });
    set_editLoading(false);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    set_editContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editContent?.trim() === content?.trim()) return;
    handleEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-0 position-relative p-2 my-2 border-bottom d-flex flex-column justify-content-start align-items-stretch"
    >
      <LoadingBox open={editLoading} />
      <div
        dir="rtl"
        className="d-flex flex-row justify-content-start align-items-center "
      >
        <IconButton onClick={handleDelete} className=" position-relative">
          <LoadingBox
            spinnerStyles={{
              width: "20px",
              height: "20px",
            }}
            open={deleteLoading}
          />
          <Delete fontSize="small" />
        </IconButton>
        <IconButton onClick={handleEnableEdit} className="me-2">
          {enableEdit && <EditIcon color={"primary"} fontSize="small" />}
          {!enableEdit && <EditIcon color="grey" fontSize="small" />}
        </IconButton>
        {date}
      </div>
      <textarea
        ref={ref_textArea}
        disabled={!enableEdit}
        style={{
          borderRadius: ".5rem",
          transition: ".3s",
          background: enableEdit ? "#ebebeb" : "#fff",
          resize: enableEdit ? "horizontal" : "none",
        }}
        onChange={handleChange}
        dir="auto"
        className="mt-2 p-2 border-0"
      >
        {editContent}
      </textarea>
      {enableEdit && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-2"
        >
          ثبت
        </Button>
      )}
    </form>
  );
};

export default NoteItem;
