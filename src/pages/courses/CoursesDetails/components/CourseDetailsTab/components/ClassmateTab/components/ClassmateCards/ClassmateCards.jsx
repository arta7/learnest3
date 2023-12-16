import React from "react";
import ClassmateCardItem from "./components/ClassmateCardItem";
import "./style/style.css";

const ClassmateCards = ({ classRoomInfo }) => {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center w-100">
      {classRoomInfo?.classmates?.map((item) => (
        <ClassmateCardItem {...item} key={item?.phone} />
      ))}
      <div style={{ height: "215px" }}></div>
    </section>
  );
};

export default ClassmateCards;
