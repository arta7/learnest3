import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.rtl.css";
import "./assets/styles/base.scss";
import reportWebVitals from "./reportWebVitals";
import ServiceWorkerWrapper from "./components/updateApp";

ReactDOM.render(
  <BrowserRouter>
    <>
      <ServiceWorkerWrapper />
      <App />
    </>
  </BrowserRouter>,
  document.getElementById("root")
);

// serviceWorkerRegistration.register();

reportWebVitals();
