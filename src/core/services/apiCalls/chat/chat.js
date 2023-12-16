import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const chat_apis = API_URLs.chat;

export const apiCall_getchatslist = () => {
  return http.post(chat_apis.getchatslist);
};
export const apiCall_getchatmessages = (group) => {
  return http.post(chat_apis.getchatmessages + "?group=" + group);
};
