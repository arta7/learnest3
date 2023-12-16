import React, { useEffect } from "react";
import { useLocation } from "react-router";
import "./style/style.css";

const FaqQuestions = () => {
  const location = useLocation();
  useEffect(() => {
    if (location?.state) {
        console.log(location?.state)
    }
  }, [location?.state]);
  return <div>FaqQuestions</div>;
};

export default FaqQuestions;
