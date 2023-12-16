import React, { useState, useEffect } from "react";

const getIsDocumentVisible = () => {
  if (typeof document !== "undefined") {
    if (document.visibilityState === "visible") return true;
    return false;
  }
  return false;
};

const useVisibilityChange = ({ onHide, onVisible }) => {
  const [documentIsVisble, set_documentIsVisble] = useState(
    getIsDocumentVisible()
  );
  //////////////////////////////////////////////////////////
  useEffect(() => {
    const listener = () => {
      set_documentIsVisble(getIsDocumentVisible());
      if (!getIsDocumentVisible()) {
        if (onHide) onHide();
      } else {
        if (onVisible) onVisible();
      }
    };
    //////////////////////////////////////////////////////////
    if (typeof document !== undefined)
      document.addEventListener("visibilitychange", listener);
    return () => {
      if (typeof document !== undefined)
        document.removeEventListener("visibilitychange", listener);
    };
  }, []);

  return { documentIsVisble: documentIsVisble };
};

export default useVisibilityChange;
