import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const extra_apis = API_URLs.extra;

export const apiCall_getAll = () => {
  return http.post(extra_apis.getAll);
};
export const apiCall_completeExtra = ({ id, extraType, percent }) => {
  return http.post(extra_apis.completeExtra, { id, extraType, percent });
};
export const apiCall_details = (id) => {
  return http.post(extra_apis.details + "?Id=" + id);
};
export const apiCall_getcrossWord = (id) => {
  return http.post(extra_apis.getcrossWord + "?id=" + id);
};
