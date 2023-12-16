import { useWindowDimensions } from "./getWindowDimensions";

export const useCalculateCrossWordTableCellSize = (tableDimension) => {
  const { width } = useWindowDimensions();

  if (width <= 800) {
    return { size: (width - 48) / tableDimension };
  } else {
    return { size: (800 - 48) / tableDimension };
  }
};
