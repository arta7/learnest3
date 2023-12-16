import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ClassmateTabSearch = () => {
  return (
    <div
      style={{
        borderRadius: "1.5rem",
        height: "50px",
      }}
      className=" p-0 position-relative d-flex flex-row justify-content-start align-items-stretch w-100 shadow rounded-20"
    >
      <IconButton>
        <Search
          // style={{ position: "absolute", right: "3%" }}
          // htmlColor="#157DBC"
          color="primary"
        />
      </IconButton>
      <input
        style={{ outline: "none", border: "none", borderRadius: "1.5rem" }}
        type="text"
        placeholder="جستجو"
        className="py-2 px-2 flex-grow-1"
      />
    </div>
  );
};

export default ClassmateTabSearch;
