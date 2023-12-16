import React, { useState, useEffect } from "react";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { useNotificationsContext } from "../../core/contexts/notifications/notificationsCTX";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { notif_apiCalls } from "../../core/services/agent";
import NotificationItem from "./notificationItem.component";

const Notifications = () => {
  const {
    notificationsList,
    getNotifications,
    loading,
    setNotificationsSeen,
    getUnseenNotifications,
  } = useNotificationsContext();
  ////////////////////
  const { handleOpen, handleClose } = useLoadingContext();
  ////////////////////
  useEffect(() => {
    if (loading) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [loading]);
  ////////////////////
  useEffect(() => {
    if (notificationsList?.length > 0) {
      const unSeenNotifications = getUnseenNotifications();
      if (unSeenNotifications?.length > 0) {
        setTimeout(() => {
          setNotificationsSeen(unSeenNotifications.map((item) => item.id));
        }, 3000);
      }
    }
  }, [notificationsList]);
  ////////////////////
  return (
    <div className="m-0 p-3 pb-6 d-flex flex-column justify-content-start align-items-stretch">
      {notificationsList?.length > 0 &&
        notificationsList
          ?.reverse()
          ?.map((item) => (
            <NotificationItem
              key={item.id}
              className=" mt-3 shadow "
              {...item}
            />
          ))}

      {!loading && (!notificationsList || notificationsList?.length === 0) && (
        <h4 className="fs-6">شما در حال حاضر نوتیفیکیشن جدیدی ندارید .</h4>
      )}
    </div>
  );
};

export default Notifications;
