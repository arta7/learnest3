import React, { useState, useEffect, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";
import { Badge, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Aside from "../aside/aside";

import "./styles/styles.scss";
import { useNotificationsContext } from "../../../../contexts/notifications/notificationsCTX";
import { useNavigate } from "react-router";

const Header = (props) => {
  const [openSidebar, set_openSidebar] = useState(false);
  /////////////
  const navigate = useNavigate();
  const { getUnseenNotifications } = useNotificationsContext();
  const [isInIOS, set_isInIOS] = useState(false);
  const toggle_sidebar = () => {
    set_openSidebar(!openSidebar);
  };

  useEffect(() => {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    if (isIos()) {
      set_isInIOS(true);
    }
  }, []);

  const handleNavToNotifications = () => {
    navigate("/notifications");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: "0",
        width: "calc(100% + 5px)",
        maxWidth: "805px",
        left: "0",
        right: "0",
        zIndex: "20",
        boxShadow: "0 2px 5px 2px #ccc",
      }}
      className=" main_header bg-white mx-auto m-0 p-3 px-2  d-flex flex-row justify-content-between align-items-center"
    >
      <IconButton
        id="sidemenuToggler"
        onClick={toggle_sidebar}
        aria-label="menu"
      >
        <MenuOutlined fontSize="medium" />
      </IconButton>
      <span className="title fs-5 fw-bold text-main-color-1">
        {window.location.pathname === "/" && "LearNest"}
        {window.location.pathname === "/allcourses" && "دوره ها"}
        {window.location.pathname === "/extra" && "سرگرمی"}
        {window.location.pathname === "/chat" && "چت"}
      </span>
      <IconButton aria-label="alarm" onClick={handleNavToNotifications}>
        {getUnseenNotifications()?.length === 0 && (
          <NotificationsNoneIcon color="primary" fontSize="medium" />
        )}
        {getUnseenNotifications()?.length > 0 && (
          <Badge
            badgeContent={getUnseenNotifications()?.length}
            color="primary"
          >
            <NotificationsNoneIcon color="primary" fontSize="medium" />
          </Badge>
        )}
      </IconButton>

      <Aside open={openSidebar} onClose={toggle_sidebar} />
    </header>
  );
};

export default Header;
