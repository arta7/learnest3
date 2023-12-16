import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const pushNotif_apis = API_URLs.pushNotif;

export const apiCall_setDeviceID = (deviceID) => {
  return http.post(pushNotif_apis.setPushDeviceID + "?deviceId=" + deviceID);
};
