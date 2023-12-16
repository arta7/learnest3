import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  authentication_apiCalls,
  profile_apiCalls,
} from "../../services/agent";
import http from "../../services/http";
import { useLoginContext } from "../authentication/authenticationProvider";

const userProfileContext = createContext();

const UserProfileProvider = ({ children }) => {
  const [profileData, set_profileData] = useState();
  const ctx_auth = useLoginContext();
  const { getProfileData } = useUserProfileActions();

  useEffect(() => {
    const getData = async () => {
      const data = await getProfileData();
      // console.log(data);
      if (data) set_profileData(data);
    };
    if (ctx_auth?.token) {
      getData();
    }
  }, [ctx_auth?.token]);

  return (
    <userProfileContext.Provider
      value={{
        profileData,
        set_profileData,
      }}
    >
      {children}
    </userProfileContext.Provider>
  );
};

function useUserProfileContext() {
  return useContext(userProfileContext);
}

function useUserProfileActions() {
  const ctx_profile = useUserProfileContext();

  const getProfileData = async () => {
    return await profile_apiCalls
      .apiCall_getProfile()
      .then((resp) => {
        if (resp.status === 200) {
          if (ctx_profile?.set_profileData)
            ctx_profile?.set_profileData(resp.data.data);
          return resp.data.data;
        } else {
          toast.error("دریافت اطلاعات پروفایل با خطا مواجه شد.");
          return null;
        }
      })
      .catch((ex) => {
        console.log(ex);
        toast.error("دریافت اطلاعات پروفایل با خطا مواجه شد.");
        return null;
      });
  };

  return { getProfileData };
}

export { useUserProfileContext, useUserProfileActions };
export default UserProfileProvider;
