import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../core/custom-hooks/getWindowDimensions";
const safeAreaInsets = require("safe-area-insets");

const useAddToLeitnerPosition = () => {
  const { width } = useWindowDimensions();
  const [bottom, set_bottom] = useState("6rem");
  const [left, set_left] = useState("1rem");

  useEffect(() => {
    if (width <= 800) {
      set_left("1rem");
    } else {
      const leftOffset = (width - 800) / 2;
      set_left(`calc(${leftOffset}px + 1rem)`);
    }
  }, [width]);

  return { left, bottom };
};

export default useAddToLeitnerPosition;
