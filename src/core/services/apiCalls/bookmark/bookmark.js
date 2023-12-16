import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.bookmark;

export const apiCall_getbookmarks = async () => {
  return http.post(auth_apis.bookmarks);
};

export const apiCall_getqauestions = async (bid) => {
  return http.post(auth_apis.questions + `?bookmarkId=${bid}`);
};

export const apiCall_createbookmark = async (name) => {
  const formData = new FormData();

  formData.append("name", name);

  return http.post(auth_apis.createbookmark, formData);
};

export const apiCall_deletebookmark = async (bid) => {
  
  return http.post(auth_apis.deletebookmark + `?bookmarkId=${bid}`);
};

export const apiCall_addquestion = async ({
  BookmarkId,
  Title,
  QuestionId,
  QuestionType,
}) => {
  const formData = new FormData();
  formData.append("BookmarkId", BookmarkId);
  formData.append("Title", Title);
  formData.append("QuestionId", QuestionId);
  formData.append("QuestionType", QuestionType);
  return http.post(auth_apis.addquestion, formData);
};

export const apiCall_deletequestion = async (qid) => {
  return http.post(auth_apis.deletequestion + `?questionId=${qid}`);
};
