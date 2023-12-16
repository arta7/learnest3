import { Button, Dialog, Drawer } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import buttonShareIcon from "../../../assets/img/icons/safari-share.png";
import safariAddToHomeScreen from "../../../assets/img/icons/safari-addToHomeScreen.png";

const CheckAppInstallationWrapper = ({ children }) => {
  //////////////
  const [showInstallDialog, set_showInstallDialog] = useState(false);
  const toggleShowInstallDialog = () => {
    set_showInstallDialog(!showInstallDialog);
  };
  //////////////
  const [showIosInstallPrompt, set_showIosInstallPrompt] = useState(false);
  const toggleShowIosInstallPrompt = () => {
    set_showIosInstallPrompt(!showIosInstallPrompt);
  };
  /////////////
  const location = useLocation();
  const [isStandalone, set_isStandalone] = useState();
  const [beforeInstallPrompt, set_beforeInstallPrompt] = useState();
  //////////////
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        eventHandler,
        errorHandler
      );
    };
  }, []);
  //////////////
  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches === false &&
      beforeInstallPrompt
    ) {
      set_showInstallDialog(true);
    }

    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      toggleShowIosInstallPrompt();
    }
  }, [isStandalone, beforeInstallPrompt, location.pathname]);

  function eventHandler(event) {
    set_beforeInstallPrompt(event);
  }

  function errorHandler(event) {
    console.log("error: " + event);
  }

  const showPrompt = () => {
    beforeInstallPrompt.prompt();
    toggleShowInstallDialog();
  };

  return (
    <>
      <Dialog
        open={showInstallDialog}
        // onClose={toggleShowInstallDialog}
      >
        <div
          style={{ minWidth: "350px", minHeight: "200px" }}
          className="m-0 bg-white box-rounded-1 p-3 d-flex flex-column justify-content-center align-items-center"
        >
          <h3 className="fs-5 align-self-stretch "> افزودن به صفحه اصلی </h3>
          <small className="  align-self-stretch fs-7 mt-2 mb-4 text-muted">
            با افزودن این وب اپلیکیشین به صفحه اصلی میتوانید به صورت تمام صفحه
            به این وب اپلیکیشین دسترسی داشته باشید .
          </small>
          <Button
            style={{ minWidth: "80px" }}
            onClick={showPrompt}
            variant="contained"
            color="primary"
          >
            نصب
          </Button>
        </div>
      </Dialog>
      <Drawer
        anchor="bottom"
        open={showIosInstallPrompt}
        // onClose={toggleShowIosInstallPrompt}
        sx={{
          "&.MuiDrawer-paper": {
            backgroundColor: "transparent",
          },
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.8rem",
            margin: "1rem",
          }}
          className="p-3 m-0 d-flex flex-column justify-content-start align-items-stretch"
        >
          <h3 className="fs-5 "> افزودن به صفحه اصلی </h3>
          <small className="fs-7 mt-2 text-muted">
            با افزودن این وب اپلیکیشین به صفحه اصلی میتوانید به صورت تمام صفحه
            به این وب اپلیکیشین دسترسی داشته باشید .
          </small>
          <div className="d-flex flex-row justify-content-start align-items-start mt-2">
            <img
              alt="button-share-icon"
              style={{ width: "28px" }}
              src={buttonShareIcon}
            />
            <span className="ms-2">
              1) این دکمه را در قسمت منو بار پایین بفشارید
            </span>
          </div>
          <div className="mt-3 d-flex flex-row justify-content-start align-items-start">
            <img
              style={{ width: "25px" }}
              src={safariAddToHomeScreen}
              alt="..."
            />
            <span className="ms-2">
              2) پنجره‌ی باز شده را به بالا بکشید و این دکمه را بفشارید
            </span>
          </div>
        </div>
      </Drawer>
      {children}
    </>
  );
};

export default CheckAppInstallationWrapper;
