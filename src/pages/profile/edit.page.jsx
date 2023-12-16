import React, { useState, useEffect } from "react";
import { apiCaller, useApi } from "../../core/custom-hooks/useApi";
import {
  useUserProfileContext,
  useUserProfileActions,
} from "../../core/contexts/profile/profileProvider";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { imagesBaseUrl } from "../../core/services/baseUrl";
import { toast } from "react-toastify";

// FORMIK
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../components/formik-input/formikInput";
import { profile_apiCalls } from "../../core/services/agent";
import UpdateAvatar from "./updateAvatar.component";

const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email().required("پر کردن فیلد الزامیست"),
  firstName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام فارسی وارد کنید .")
    .required("لطفا نام را وارد کنید"),
  lastName: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی فارسی وارد کنید .")
    .required("لطفا نام خانوادگی را وارد کنید"),
});

const EditProfile = () => {
  const { handleClose, handleOpen } = useLoadingContext();
  const [gender, set_gender] = useState();
  const { profileData } = useUserProfileContext();
  const { getProfileData } = useUserProfileActions();

  useEffect(() => {
    if (profileData) {
      set_gender(parseInt(profileData?.gender));
    } else {
      set_gender(0);
    }
  }, [profileData]);

  const handleSubmit_signup = async (values) => {
    //start loading
    handleOpen();

    //call api login
    await apiCaller({
      api: profile_apiCalls.apiCall_editProfile,
      apiArguments: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: gender,
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.status !== "0") {
          toast.success(
            <div className="text-wrap">
              ثبت با موفقیت انجام شد .{resp.data?.message}
            </div>
          );
        } else {
          toast.error(<div className="">{resp.data?.message}</div>);
        }
        getProfileData();
      },
      onError: () => {
        toast.error("ثبت  با خطا مواجه شد");
      },
    });

    //end loading
    handleClose();
  };

  const handle_genderChange = (e) => {
    if (e.target.id === "male") {
      set_gender(0);
    }
    if (e.target.id === "female") {
      set_gender(1);
    }
  };

  return (
    <div className="w-100 m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <UpdateAvatar
        holderClassName="m-0 p-0 my-3 align-self-start"
        avatarUrl={profileData?.avatarUrl}
      />
      <Formik
        initialValues={{
          email: profileData?.email || "",
          firstName: profileData?.firstName || "",
          lastName: profileData?.lastName || "",
        }}
        validationSchema={SignupFormSchema}
        onSubmit={handleSubmit_signup}
      >
        <Form className="d-flex flex-column justify-content-center align-items-stretch">
          <TextInput
            holderClassName="mt-0"
            inputClassName="box-rounded-1 auth-input"
            label="نام"
            placeholder="علی"
            name="firstName"
            id="firstName"
          />

          <TextInput
            holderClassName="mt-3"
            label={"نام خانوادگی"}
            inputClassName="box-rounded-1 auth-input"
            placeholder="علوی"
            name="lastName"
            id="lastName"
          />
          <TextInput
            holderClassName="mt-3"
            label={"ایمیل"}
            dir="ltr"
            placeholder="user@info.com"
            type="text"
            inputClassName="box-rounded-1 auth-input "
            name="email"
            id="email"
          />

          <label
            dir="rtl"
            className=" m-0 mt-3 p-0 d-flex flex-row justify-content-start align-items-center"
          >
            <span className="m-0 p-0 fs-6 fw-bold">جنسیت</span>
          </label>
          <div
            dir="rtl"
            className="m-0 mt-2 p-0 d-flex flex-row justify-content-start align-items-center"
          >
            <label
              htmlFor="male"
              className="m-0 p-0 d-flex flex-row justify-content-start align-items-center"
            >
              <input
                onChange={handle_genderChange}
                type={"radio"}
                id="male"
                name="gender"
                checked={gender === 0}
              />
              <span className="ms-1 ">مرد</span>
            </label>
            <label
              htmlFor="female"
              className="m-0 ms-2 p-0 d-flex flex-row justify-content-start align-items-center"
            >
              <input
                onChange={handle_genderChange}
                type={"radio"}
                id="female"
                name="gender"
                checked={gender === 1}
              />
              <span className="ms-1 ">زن</span>
            </label>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="m-0  mt-4 py-2"
            style={{ height: "50px", width: "100%" }}
          >
            ثبت
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
