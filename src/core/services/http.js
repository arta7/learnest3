import axios from "axios";
import { toast } from "react-toastify";
import { getItem, setItem, removeItem } from "../utils/storage";

const tokenKey = "learnestToken";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // check if error is expected from backend

    try {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      // if(error.response.status===400){
      //   console.log(error.response.data.errors);
      // }
      if (expectedError) {
        if (error.response.status === 401) {
          // history.push("/login");
          if (window.location.pathname !== "/login")
            window.location.href = "/login";
        }
        if (error.response.status === 405) {
          toast.error("نوع فایل اشتباه میباشد");
        }
      }

      // if error doesnt expected when we log it
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          toast.error(error.response.data.message.message[0].message);
        } catch (error) {}
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

const setToken = (token) => {
  setItem(tokenKey, token);
};

const getToken = () => {
  return getItem(tokenKey);
};

const removeToken = () => {
  removeItem(tokenKey);
};

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = getItem(tokenKey);
  config.headers["Version"] = "ewano";
  return config;
});

const http = {
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  get: axios.get,
  setToken: setToken,
  getToken: getToken,
  removeToken: removeToken,
};

export default http;

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3IiwibmJmIjoxNjQwNTg3MDM3LCJleHAiOjE2NDExOTE4MzcsImlhdCI6MTY0MDU4NzAzN30.4vY2JW8moTTm_dbyQGw58vBDzanqYjGhHULteY9mO1Q

*/
