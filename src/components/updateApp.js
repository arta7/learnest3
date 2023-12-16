import React, { useEffect } from "react";
import { Snackbar, Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import { deleteAllCookies } from "../core/utils/utils";

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState();
  const handleCloseSnackbar = () => {
    setShowReload(false);
  };

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);

    if ("serviceWorker" in navigator) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    deleteAllCookies();
    window.location.reload(true);
  };

  return (
    <Snackbar
      open={showReload}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={
        <div className="d-flex flex-row justify-content-start align-items-center">
          <IconButton className="m-0 p-0 me-3" onClick={handleCloseSnackbar}>
            <HighlightOffIcon color="error" fontSize="medium" />
          </IconButton>
          <span>نسخه جدیدی موجود است .</span>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={reloadPage}
            className="ms-3"
          >
            بروزرسانی
          </Button>
        </div>
      }
    />
  );
};

export default ServiceWorkerWrapper;
