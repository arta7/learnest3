import React, { useState, useEffect } from "react";
import { apiCaller } from "../../custom-hooks/useApi";
import { pushNotif_apiCalls } from "../../services/agent";
import { getCookie, setCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
const useSetDeviceID = () => {
  ///////
  const interval = setInterval;
  ///////
  const callAPI = () => {
    apiCaller({
      api: pushNotif_apiCalls.apiCall_setDeviceID,
      apiArguments: getCookie("deviceId-1"),
      onSuccess: (resp) => {
        setCookie("deviceId-2", getCookie("deviceId-1"));
      },
    });
  };
  ///////
  useEffect(() => {
    const onCookieChange = () => {
      if (getCookie("deviceId-1")) {
        if (getCookie("deviceId-2")) {
          if (getCookie("deviceId-1") !== getCookie("deviceId-2")) {
            callAPI();
          }
        } else {
          callAPI();
        }
      }
    };
    interval(onCookieChange, 3000);

    return () => clearInterval(interval);
  }, []);
};

export default useSetDeviceID;

/*

  if "deviceId-2" doesent exist
  if "deviceId-2" exists but doesent match with "deviceId-1"

*/
