import React, { useState, useEffect } from "react";
import useSetDeviceID from "./hooks/useSetDeviceID";
import CheckAppInstallationWrapper from "./wrappers/checkInstalledWrapper";
// import SafeArea from "react-safe-area-component";
// const safeAreaInsets = require("safe-area-insets");
////////////////
const AppInitializeWrapper = ({ children }) => {
  useSetDeviceID();
  useEffect(() => {
    if (!document.body.classList.contains("safe-area-styles"))
      document.body.classList.add("safe-area-styles");
  }, []);

  return (
    // <SafeArea top bottom>
    <CheckAppInstallationWrapper>{children}</CheckAppInstallationWrapper>
    // </SafeArea>
  );
};

export default AppInitializeWrapper;
