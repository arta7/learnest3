import React, { useEffect } from "react";
import { useLocation } from "react-router";
import "./style/style.css";

const GrammarQuestion = () => {
  const location = useLocation();
  useEffect(() => {
    if (location?.state) {
      console.log(location?.state);
    }
  }, [location?.state]);
  return <div>GrammarQuestions</div>;
};

export default GrammarQuestion;
