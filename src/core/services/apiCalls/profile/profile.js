import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.profile;

export const apiCall_getProfile = async () => {
  return http.post(auth_apis.getProfile);
};

export const apiCall_editProfile = async (frmData) => {
  return http.post(auth_apis.editProfile, frmData);
};

export const apiCall_updateAvatar = async (frmData) => {
  return http.post(auth_apis.changeAvatar, frmData);
};

export const apiCall_verify = async ({ phoneNumber, verifyCode }) => {
  const reqBody = {
    phoneNumber: phoneNumber,
    code: verifyCode.toString(),
  };

  return http.post(auth_apis.verify, reqBody, null);
};
