import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const exam_apis = API_URLs.exam;

export const apiCall_getExam = (courseId) => {
  return http.post(exam_apis.getExam + "?courseId=" + courseId);
};
export const apiCall_startExam = (examId) => {
  return http.post(exam_apis.startExam + "?examId=" + examId);
};
export const apiCall_finishExam = (examId) => {
  return http.post(exam_apis.finishExam + "?examId=" + examId);
};
