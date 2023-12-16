import React, { useState, useEffect, useContext } from "react";
import { apiCaller } from "../../custom-hooks/useApi";
import { notif_apiCalls } from "../../services/agent";
import { useLoginContext } from "../authentication/authenticationProvider";

const context = React.createContext();

const NotificationsProvider = ({ children }) => {
  const [notificationsList, set_notificationsList] = useState();
  const { token } = useLoginContext();
  const [loading, set_loading] = useState(false);
  ////////////////
  const getNotifications = () => {
    apiCaller({
      api: notif_apiCalls.apiCall_getNotificationsList,
      onSuccess: (resp) => {
        set_notificationsList(resp.data.data);
      },
      onStart: set_loading(true),
      onEnd: set_loading(false),
    });
  };
  ////////////////
  const setNotificationsSeen = (idsList) => {
    apiCaller({
      api: notif_apiCalls.apiCall_setNotificationsSeen,
      apiArguments: { idsList: idsList },
      onSuccess: (resp) => {
        getNotifications();
      },
      onStart: set_loading(true),
      onEnd: set_loading(false),
    });
  };
  ////////////////
  const getUnseenNotifications = () => {
    if (notificationsList?.length > 0) {
      return notificationsList.filter((item) => item.isSeen === false);
    }
    return [];
  };
  ////////////////
  useEffect(() => {
    if (token) {
      getNotifications();
    }
  }, [token]);
  ////////////////
  return (
    <context.Provider
      value={{
        notificationsList,
        getNotifications,
        setNotificationsSeen,
        loading,
        getUnseenNotifications,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useNotificationsContext = () => useContext(context);

export default NotificationsProvider;
