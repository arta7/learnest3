import React, { useState, useEffect, useReducer } from "react";
import { getDataFromLocalStorage, mapToLocalStorage } from "./dataCache";
import { initialState } from "./initialState";
import { setStateReducer } from "./reducers";

const buyCourseStateContext = React.createContext();
const buyCourseSetStateContext = React.createContext();

const BuyCourseContext = (props) => {
  const [factor, dispatchFactor] = useReducer(setStateReducer, initialState);
  const [priceInformation, set_priceInformation] = useState(
    getDataFromLocalStorage("priceInformation") || null
  );

  useEffect(() => {
    if (priceInformation) {
      mapToLocalStorage("priceInformation", priceInformation);
    }
  }, [priceInformation]);

  useEffect(() => {
    if (factor) {
      mapToLocalStorage("buyCourseKey", factor);
    }
  }, [factor]);

  return (
    <buyCourseStateContext.Provider value={{ factor, priceInformation }}>
      <buyCourseSetStateContext.Provider
        value={{ dispatchFactor, set_priceInformation }}
      >
        {props.children}
      </buyCourseSetStateContext.Provider>
    </buyCourseStateContext.Provider>
  );
};

export const useBuyCourseState = () => {
  return React.useContext(buyCourseStateContext);
};

export const useBuyCourseDispatch = () => {
  return React.useContext(buyCourseSetStateContext);
};

export default BuyCourseContext;
