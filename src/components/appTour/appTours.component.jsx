import React, { useState, useEffect } from "react";
import Tour from "reactour";
import {
  useTour,
  useTourActions,
} from "../../core/contexts/appTour/tour.context";

const AppTour = ({ page }) => {
  const { tourInfo, isTourOpen } = useTour();
  const { onTourEnd } = useTourActions();

  const onTourClosed = () => {
    onTourEnd(page);
  };

  return (
    <>
      {tourInfo?.[page]?.filter((item) => item.isFirstTime === true)?.length >
      0 ? (
        <div dir="ltr">
          {
            <Tour
              onRequestClose={onTourClosed}
              steps={tourInfo?.[page]?.filter(
                (item) => item.isFirstTime === true
              )}
              isOpen={isTourOpen}
              rounded={5}
              accentColor="#5cb7b7"
            />
          }
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppTour;
