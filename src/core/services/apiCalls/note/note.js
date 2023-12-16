import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const note_apis = API_URLs.note;

export const apiCall_getNotes = (classRoomId) => {
  return http.post(note_apis.getNotes + "?classRoomId=" + classRoomId);
};

export const apiCall_getAllNotes = () => {
  return http.post(note_apis.getNotes);
};

export const apiCall_addNote = ({ content, classRoomId }) => {
  return http.post(note_apis.addNote, { content, classRoomId });
};

export const apiCall_editNote = ({ id, content, classRoomId }) => {
  return http.post(note_apis.editNote, {
    id,
    content,
    classRoomId,
  });
};

export const apiCall_deleteNote = ({ id }) => {
  return http.post(note_apis.deleteNote + "?Id=" + id);
};
