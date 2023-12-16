import React, { useState, useEffect } from "react";
import { useApi } from "../../core/custom-hooks/useApi";
import { useUserProfileContext } from "../../core/contexts/profile/profileProvider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { fileBaseUrl } from "../../core/services/baseUrl";
import defImage from "../../assets/img/icons/profile.png";

const Profile = (props) => {
  const { profileData } = useUserProfileContext();
  const navigate = useNavigate();
  const handleGotoEditPage = () => {
    navigate("/edit-profile");
  };

  useEffect(()=>{
    console.log('profileData',profileData)
  },[])

  return (
    <div className="w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <div className="profile-picture m-0 p-0 my-3">
        <img
          src={fileBaseUrl + profileData?.avatarUrl}
          style={{
            width: "50%",
            maxWidth: "400px",
            minWidth: "180px",
            border: "3px solid #ccc",
            borderRadius: "1.5rem",
          }}
          alt="..."
          className=""
        />
      </div>
      <span className="my-2"> {`نام : ${profileData?.firstName}`} </span>
      <span className="my-2">
        {" "}
        {`نام خانوادگی : ${profileData?.lastName}`}{" "}
      </span>
      <span className="my-2">
        {" "}
        {`جنسیت : ${!profileData?.gender ? "آقا" : "خانم"}`}{" "}
      </span>
      <span className="my-2"> {`شماره موبایل : ${profileData?.phone}`} </span>
      <span className="my-2"> {`ایمیل : ${profileData?.email || ""}`} </span>

      <Button
        variant="contained"
        color="primary"
        style={{ height: "50px", width: "100%" }}
        onClick={handleGotoEditPage}
      >
        ویرایش پروفایل
      </Button>
    </div>
  );
};

export default Profile;

/*
${profileData?.avatarUrl}
${profileData?.email}
${profileData?.firstName}
${profileData?.gender}
${profileData?.lastName}
${profileData?.phone}
*/
