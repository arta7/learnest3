import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const auth_apis = API_URLs.authentincation;

export const apiCall_signup = async ({
  phoneNumber,
  firstName,
  lastName,
  IsPhone,
  gender,
}) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("FirstName", firstName);
  formdata.append("LastName", lastName);
  formdata.append("IsPhone", IsPhone);
  formdata.append("Gender", gender);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.signup, formdata);
};

export const apiCall_login = async (phoneNumber,IsPhone) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("IsPhone", IsPhone);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.login, formdata);
};

export const apiCall_verify = async ({ phoneNumber, verifyCode,IsPhone }) => {
  const formdata = new FormData();

  formdata.append("Phone", phoneNumber);
  formdata.append("VerificationCode", verifyCode);
  formdata.append("IsPhone", IsPhone);
  formdata.append("MacAddress", "web");

  return http.post(auth_apis.verify, formdata);
};
