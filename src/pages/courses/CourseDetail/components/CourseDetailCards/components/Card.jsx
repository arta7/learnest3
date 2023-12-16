import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data, title }) => {
  const navigate = useNavigate();

  return (
    <div className="border">
      {data?.length === 1 && (
        <div
          onClick={() => {
            navigate("/vocabularies?id=" + data[0]?.id);
          }}
        >
          {data[0]?.title}
        </div>
      )}
      {data?.length > 1 && (
        <>
          {" "}
          {/* <div onClick={() => handle_openModal()}>{data[0]?.title}</div>
          <Dialog /> */}
        </>
      )}
    </div>
  );
};

export default Card;
