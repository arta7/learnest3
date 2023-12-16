import { getItem, setItem, removeItem } from "../../utils/storage";

export const cacheKey = "buyCourseKey";

export const mapToLocalStorage = (key = null, data) => {
  if (key) {
    setItem(key, JSON.stringify(data));
  } else {
    setItem(cacheKey, JSON.stringify(data));
  }
};
export const getDataFromLocalStorage = (key = null) => {
  if (key) {
    if (getItem(key)) return JSON.parse(getItem(key));
    else return null;
  } else {
    if (getItem(cacheKey)) return JSON.parse(getItem(cacheKey));
    else return null;
  }
};
export const removeCache = () => {
  removeItem(cacheKey);
};
