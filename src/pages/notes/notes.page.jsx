import React, { useState, useEffect } from "react";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { note_apiCalls } from "../../core/services/agent";
import NoteItem from "../../components/toolbar/components/noteItem.component";

const Notes = () => {
  //////  Notes List ////////

  const [notes, set_notes] = useState([]);
  const [isLoading, set_isLoading] = useState(false);
  const getNotes = async () => {
    const { data, status } = await apiCaller({
      api: note_apiCalls.apiCall_getAllNotes,
      onErrorMessage: "دریافت یادداشت ها با خطا مواجه شد",
      onStart: () => {
        set_isLoading(true);
      },
      onEnd: () => {
        set_isLoading(false);
      },
    });
    if (status === 200 && data?.data?.length > 0) {
      set_notes(data?.data);
    }
    return data;
  };
  useEffect(() => {
    getNotes();
  }, []);

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
    <div className="w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      {notes?.length > 0 &&
        notes?.map((item, index) => (
          <NoteItem
            key={item.id}
            onNoteDeleted={onNoteDeleted}
            onNoteEdited={onNoteEdited}
            {...item}
          />
        ))}
      {!isLoading && notes.length === 0 && (
        <p className="fs-6 align-self-start text-right" dir="rtl">
          شما یادداشتی ندارید .
        </p>
      )}
    </div>
  );
};

export default Notes;
