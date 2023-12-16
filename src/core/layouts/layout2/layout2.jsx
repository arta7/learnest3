import React, { useState, useEffect, useContext } from "react";
// THEME
import leftArrowIcon from "../../../assets/img/icons/left-arrow.png";
import { useNavigate } from "react-router";
import "./styles/styles.css";
import { BackIcon } from "../../../components/icons/icons";

const Layout2 = ({ children }) => {
  const navigate = useNavigate();

  return (
    <main className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div
        style={{
          position: "sticky",
          top: "0",
          boxShadow: "0 2px 5px 2px #ccc",
        }}
        className="m-0 p-3 d-flex flex-row justify-content-between align-items-center"
      >
        <div className="m-0 p-0 col-2"> </div>
        <div
          id="layout2-title"
          className="m-0 p-0 col-8 fs-5 fw-bold d-flex flex-row justify-content-center align-items-center"
        >
          {window.location.pathname === "/level-determine" && "تعیین سطح"}
          {window.location.pathname === "/leitner" && "لایتنر"}
          {window.location.pathname === "/notes" && "یادداشت ها"}
          {window.location.pathname === "/support" && "پشتیبانی"}
          {window.location.pathname.includes("crossword") && "جدول"}
        </div>
        <div className="m-0 p-0 col-2 d-flex flex-row justify-content-end align-items-center">
          <BackIcon
            onClick={() => {
              navigate(-1);
            }}
            lightness="main"
            className="cursor-pointer"
          />
        </div>
      </div>

      <section className=" hidden-scrollbar main_content flex-grow-1  m-0 p-0 ">
        {children}
      </section>
    </main>
  );
};

export default Layout2;
