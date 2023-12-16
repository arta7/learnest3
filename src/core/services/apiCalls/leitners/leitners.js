import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const leitner_apis = API_URLs.leitners;


export const apiCall_getDashboardInfo = () => {
  return http.post(leitner_apis.dashboard);
};

export const apiCall_getAll = (isVocab) => {
  return http.post(leitner_apis.getall + "?isVocab=" + isVocab);
};

export const apiCall_addtoleitner = (leitnerItem) => {
  return http.post(leitner_apis.addtoleitner, leitnerItem);
};

export const apiCall_updateleitners = (data) => {
  return http.post(leitner_apis.updateleitners, data);
};
