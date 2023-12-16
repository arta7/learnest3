import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const home_apis = API_URLs.home;

export const apiCall_getDashboardInfo = () => {
  return http.post(home_apis.getDashboardInfo);
};

export const apiCall_report = ({ data, description, screenShot }) => {
  const frmData = new FormData();

  frmData.append("data", data);
  frmData.append("description", description);
  frmData.append("screenShot", screenShot);

  return http.post(home_apis.report, frmData);
};
