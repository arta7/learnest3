import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { authentication_apiCalls } from "../../services/agent";
import http from "../../services/http";
import { deleteAllCookies } from "../../utils/utils";

const UserLoginContext = createContext();

export const UserLoginProvider = ({ children }) => {
  const [status, setStatus] = useState("process");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState(http?.getToken() || "");

  return (
    <UserLoginContext.Provider
      value={{
        status,
        phoneNumber,
        token,
        setStatus,
        setPhoneNumber,
        setToken,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};

function useLoginContext() {
  return useContext(UserLoginContext);
}

function useAuthenticationActions() {
  const { setToken } = useLoginContext();

  const login = async (phoneNumber1,IsPhone) => {
    return authentication_apiCalls.apiCall_login(phoneNumber1,IsPhone);
  };

  const register = async ({ phoneNumber, firstName, lastName,IsPhone, gender }) => {
    return authentication_apiCalls.apiCall_signup({
      phoneNumber,
      firstName,
      lastName,
      IsPhone,
      gender,
    });
  };

  const verify = async (verifyCode, phoneNumber,IsPhone) => {
    return authentication_apiCalls.apiCall_verify({ verifyCode, phoneNumber,IsPhone });
  };

  const logout = () => {
    try {
      if ("serviceWorker" in navigator) {
        caches.keys().then(function (cacheNames) {
          cacheNames.forEach(function (cacheName) {
            caches.delete(cacheName);
          });
        });
      }
      deleteAllCookies();
    } catch {}

    setToken(null);
    http.removeToken();
    localStorage.removeItem("__use_local_storage_state_hook__value__appTour");
  };

  const handle_setToken = (token) => {
    setToken(token);
    http.setToken(token);
  };

  return { login, verify, register, handle_setToken, logout };
}

export { useLoginContext, useAuthenticationActions };
export default UserLoginProvider;
