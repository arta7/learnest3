import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../core/custom-hooks/getWindowDimensions";
const safeAreaInsets = require("safe-area-insets");

const useToolbarPosition = () => {
  const { width } = useWindowDimensions();
  const [top, setTop] = useState("0.7rem");
  const [right, setRight] = useState("0.5rem");

  useEffect(() => {
    if (safeAreaInsets.top) {
      setTop(`calc(${safeAreaInsets.top}px + 0.7rem)`);
    }
  }, [safeAreaInsets]);

  useEffect(() => {
    if (width <= 800) {
      setRight("0.5rem");
    } else {
      const rightOffset = (width - 800) / 2;
      setRight(`calc(${rightOffset}px + 0.5rem)`);
    }
  }, [width]);

  return { right, top };
};

export default useToolbarPosition;
