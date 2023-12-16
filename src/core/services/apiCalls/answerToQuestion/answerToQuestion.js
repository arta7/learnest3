import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const answerToQuestion_apis = API_URLs.answerToQuestion;

export const apiCall_answerTo_YNB = (answer) => {
  return http.post(answerToQuestion_apis.answerTo_YNB, answer);
};

export const apiCall_answerTo_CONVERSATION = (answer) => {
  return http.post(answerToQuestion_apis.answerTo_CONVERSATION, answer);
};

export const apiCall_answerTo_MULTICHOICE = (answer) => {
  return http.post(answerToQuestion_apis.answerTo_MULTICHOICE, answer);
};

export const apiCall_answerTo_PHRASE = (answer) => {
  return http.post(answerToQuestion_apis.answerTo_PHRASE, answer);
};
