import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const session_apis = API_URLs.session;

export const apiCall_sessionLearning = (sessionId) => {
  return http.post(session_apis.sessionLearning + "?sessionId=" + sessionId);
};

export const apiCall_completelearning = (body) => {
  return http.post(session_apis.completelearning, body);
};

export const apiCall_getPartQuestions = (partId) => {
  return http.post(session_apis.getPartQuestions + "?partId=" + partId);
};

export const apiCall_completeSessionpart = ({
  classroomId,
  percent = 0,
  sessionPartId,
}) => {
  return http.post(session_apis.completeSessionPart, {
    classroomId,
    percent,
    sessionPartId,
  });
};
