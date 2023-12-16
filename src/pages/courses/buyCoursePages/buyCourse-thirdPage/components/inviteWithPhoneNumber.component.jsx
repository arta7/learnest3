import React, { useState, useEffect } from "react";
import { Button, DialogActions } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useLoadingContext } from "../../../../../core/contexts/loading/loading";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../../../components/formik-input/formikInput";
import { toast } from "react-toastify";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../../../../core/services/agent";
import { useBuyCourseState } from "../../../../../core/contexts/buyCourseContext/buyCourseContext";

const loginFormSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("پر کردن فیلد الزامیست")
    .test(
      "len",
      "شماره وارد شده باید 11 رقم باشد",
      (val) => val && val.toString().length === 11
    ),
});

function InvitationDialog({ onClose, open }) {
  const { factor } = useBuyCourseState();
  const { handleOpen, handleClose } = useLoadingContext();
  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit_login = async (values) => {
    handleOpen();
    await apiCaller({
      api: buyCourse_apiCalls.apiCall_invitetocourse,
      apiArguments: {
        courseId: factor.courseId,
        invites: [values.phoneNumber],
      },
      toastMessage: true,
      onErrorMessage: "دعوت با خطا مواجه شد .",
      onSuccessMessage: "دعوت با موفقیت انجام شد",
    });
    onClose();
    handleClose();
  };

  return (
    <Dialog onClose={handleCloseModal} open={open}>
      <DialogTitle>همکلاسی خود را انتخاب کنید</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            phoneNumber: "",
          }}
          validationSchema={loginFormSchema}
          onSubmit={handleSubmit_login}
        >
          <Form
            style={{
              width: "300px",
            }}
            className="d-flex flex-column justify-content-center align-items-stretch"
          >
            <TextInput
              focus={true}
              onKeyPress={(e) => {
                if (e.which < 48 || e.which > 57) {
                  e.preventDefault();
                }
              }}
              dir="ltr"
              maxLength="11"
              placeholder="شماره تلفن"
              inputClassName="box-rounded-1 auth-input"
              name="phoneNumber"
              id="phoneNumber"
            />
            <div className="m-0 mb-0 mt-4 p-0 w-100 d-flex flex-row justify-content-between align-items-stretch">
              <Button
                style={{
                  width: "70%",
                  height: "45px",
                }}
                variant="contained"
                color="primary"
                type="submit"
                className=" box-rounded-1 "
              >
                تایید
              </Button>
              <Button
                variant="contained"
                color="error"
                className=" box-rounded-1 ms-2"
                onClick={onClose}
              >
                انصراف
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

const InviteWithPhoneNumber = () => {
  ////// ========> handle dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      dir="rtl"
      className=" mt-5 d-flex flex-row justify-content-between align-items-baseline"
    >
      <p className="m-0 p-0 me-2 fs-6">
        برای دعوت از دوستانتان جهت شرکت در جلسات در کنار شما و در قالب همکلاسی
        گزینه‌ی دعوت کردن را انتخاب نمایید .
      </p>
      <Button
        style={{
          width: "150px",
          height: "41px",
        }}
        variant="contained"
        color={"grey"}
        className=""
        onClick={handleClickOpen}
      >
        دعوت کردن
      </Button>

      <InvitationDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default InviteWithPhoneNumber;
