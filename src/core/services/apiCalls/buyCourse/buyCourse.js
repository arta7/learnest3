import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const buyCourse_apis = API_URLs.buyCourse;

export const apiCall_getClassroominvites = (courseId) => {
  return http.post(buyCourse_apis.classroominvites + "?courseId=" + courseId);
};

export const apiCall_invitetocourse = (body) => {
  /*
  {
  "courseId": 0,
  "invites": [
    "string"
  ]
}
  */
  return http.post(buyCourse_apis.invitetocourse, body);
};

export const apiCall_invitetoclassroom = (body) => {
  /*
  {
  "courseId": 0,
  "invites": [
    "string"
  ]
}
  */
  return http.post(buyCourse_apis.invitetoclassroom, body);
};

export const apiCall_getSuggestedstartdateforcourse = (courseId) => {
  return http.post(
    buyCourse_apis.suggestedstartdateforcourse + "?courseId=" + courseId
  );
};

export const apiCall_buycourseCheckout = (body) => {
  /*
  {
  "courseId": 0,
  "giftCode": "string",
  "weekDays": 0,
  "isTemp": true,
  "classRoomConfig": {
    "classRoomId": 0,
    "useSystemSearch": true,
    "gender": 0,
    "minAge": 0,
    "maxAge": 0,
    "inviteCode": 0
  }
}
  */
  return http.post(buyCourse_apis.buycourseCheckout, {
    ...body,
    classRoomConfig: { ...body.classRoomConfig, device: "web" },
  });
};

export const apiCall_paycoursefactor = (factorId) => {
  return http.post(buyCourse_apis.paycoursefactor + "?factorId=" + factorId);
};
