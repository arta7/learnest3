import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from 'react-router';

// COMPONENTS
import Aside from "./components/aside/aside";
import Header from "./components/header/header";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// THEME
import MaterialTheme from "../../material-theme/materialTheme";
//styles
import "./styles/styles.css";
import Footer from "./components/footer/footer";

const Layout = ({ children }) => {
  return (
    <main className="m-0 p-0 hidden-scrollbar d-flex flex-column justify-content-start align-items-stretch">
      <Header />
      <section className="main_content flex-grow-1  m-0 p-0 d-flex flex-row justify-content-start align-items-stretch">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
