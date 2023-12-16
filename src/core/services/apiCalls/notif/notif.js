import { API_URLs } from "../../CONSTANTS";
import http from "../../http";
const notif_APIS = API_URLs.notifications;

export const apiCall_getNotificationsList = async () => {
  return http.post(notif_APIS.getNotificationsList);
};

export const apiCall_setNotificationsSeen = async ({ idsList }) => {
  let str = "?";
  idsList.forEach((element, index) => {
    str += "ids=" + element + (index !== idsList.length - 1 ? "&" : "");
  });
  return http.post(notif_APIS.setNotificationsSeen + str);
};
