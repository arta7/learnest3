import React, { useState, useEffect, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import chahtIcon from "../../../../../assets/img/icons/speech-bubble.png";
import noteIcon from "../../../../../assets/img/icons/footer-note.png";
import extraIcon from "../../../../../assets/img/icons/extra.png";
import homeIcon from "../../../../../assets/img/icons/home.png";

import { Link } from "react-router-dom";
import "./styles/styles.scss";
import {
  ChatIcon,
  ExtraIcon,
  HomeIcon,
  LeitnerIcon,
} from "../../../../../components/icons/icons";
import supportIcon from "../../../../../assets/img/icons/support-3.png";

//contexts
// import { useAuthenticationActions, useLoginContext } from "../../../contexts/authentication/authenticationProvider";

const Footer = (props) => {
  const navigate = useNavigate();
  const handle_navigateToCoursesPage = (e) => {
    navigate("/allcourses");
  };

  return (
    <>
      <footer className="main_footer m-0 p-0  d-flex flex-column justify-content-between align-items-stretch">
        <div className="footer-holder m-0 p-0 ">
          <div
            id="courses-btn"
            style={{
              cursor: "pointer",
            }}
            onClick={handle_navigateToCoursesPage}
            className="courses-btn d-flex flex-row justify-content-center align-items-center"
          >
            دوره ها
          </div>
          <div className="footer-down d-flex flex-row justify-content-between align-items-center">
            <div className="nav-right ps-3 col-4 d-flex flex-row justify-content-between align-items-center">
              <Link id="home-btn" to="/" className="text-decoration-none ">
                {/* <img className="" alt="..." src={homeIcon} /> */}
                <HomeIcon lightness="main" />
              </Link>
              <Link
                id="leitner-btn"
                to="/leitner-dashboard"
                className="text-decoration-none "
              >
                <LeitnerIcon lightness="main" />
              </Link>
            </div>
            <div className="nav-left pe-3 col-4 d-flex flex-row justify-content-between align-items-center">
              <Link
                id="extra-btn"
                to="/extra"
                className="text-decoration-none "
              >
                <ExtraIcon lightness="main" />
              </Link>
              <Link
                id="chat-btn"
                to="/support"
                className="text-decoration-none "
              >
                <img src={supportIcon} alt="..." />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-placeholder">
        this is footer's placeholder . don't touch it !
      </div>
    </>
  );
};

export default Footer;
