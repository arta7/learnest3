import React, { useState, useEffect, useRef } from "react";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import { useLoadingContext } from "../../../../core/contexts/loading/loading";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { Button, Dialog, IconButton } from "@mui/material";
import colors from "../../../../assets/styles/variables/_colors.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { toast } from "react-toastify";
import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";
import { useNavigate } from "react-router";
import { formatNumber } from "../../../../core/utils/formatPrice";
import InfoIcon from "@mui/icons-material/Info";

const BuyCourseFourthPage = (props) => {
  const paymentGateLink_ref = useRef();
  const { factor, priceInformation } = useBuyCourseState();
  const { dispatchFactor } = useBuyCourseDispatch();
  const { handleOpen, handleClose } = useLoadingContext();
  const [finalAmount, set_finalAmount] = useState();
  const navigate = useNavigate();

  const handleGiftCodeChange = (e) => {
    const { value } = e.target;
    dispatchFactor({ type: actions.SETINVITECODE, payload: value });
  };

  useEffect(() => {
    if (factor.courseId === 0) {
      navigate(-3);
    }
    dispatchFactor({ type: actions.SETISTEMP, payload: true });
    dispatchFactor({ type: actions.SETSTEP, payload: 3 });
    checkoutFactor(true);

    return () => {
      dispatchFactor({ type: actions.SETINVITECODE, payload: "" });
    };
  }, []);

  const handleAddInviteCode = () => {
    dispatchFactor({ type: actions.SETISTEMP, payload: true });
    checkoutFactor(true);
  };

  const checkoutFactor = async (isTemp) => {
    const factorClone = JSON.parse(JSON.stringify(factor));
    // console.log(factorClone);
    factorClone.isTemp = isTemp;
    delete factorClone.step;

    handleOpen();
    await apiCaller({
      api: buyCourse_apiCalls.apiCall_buycourseCheckout,
      apiArguments: factorClone,
      toastMessage: true,
      onErrorMessage: "خطا . لطفا دوباره تلاش کنید",
      onSuccess: (response) => {
        if (response.data?.data === null) {
          handleClose();
          toast.error(
            <div className="text-wrap">{response?.data?.message}</div>
          );
          return;
        }
        if (!response?.data?.data?.factorId) {
          handleClose();
        }
        set_finalAmount(response?.data?.data?.finalAmount);

        if (!factorClone.isTemp) {
          apiCaller({
            api: buyCourse_apiCalls.apiCall_paycoursefactor,
            apiArguments: response?.data?.data?.factorId,
            onError: (ex) => {
              // if (ex?.response?.data?.message) {
              //   toast.error(ex?.response?.data?.message);
              // }
              handleClose();
            },
            onSuccess: (resp) => {
              paymentGateLink_ref.current.href = resp.data.data;
              paymentGateLink_ref.current.click();
            },
          });
        } else {
          handleClose();
        }
      },
      onError: (ex) => {
        // if (ex?.response?.data?.message) {
        //   toast.error(ex?.response?.data?.message);
        // }
        handleClose();
      },
    });
  };

  const handlePay = () => {
    dispatchFactor({ type: actions.SETISTEMP, payload: false });
    checkoutFactor(false);
  };

  // notif
  const [hasNotif, set_hasNotif] = useState(false);
  const handle_hasNotif_change = (e) => {
    set_hasNotif(!hasNotif);
  };
  useEffect(() => {
    dispatchFactor({ type: "SETHASNOTIF", payload: hasNotif ? true : false });
  }, [hasNotif]);

  // support
  const [showExplanationsDialog, set_showExplanationsDialog] = useState(false);
  const handleShowExplanationsDialog = () => {
    set_showExplanationsDialog(!showExplanationsDialog);
  };

  const [withSupport, set_withSupport] = useState(false);
  const handle_withSupport_change = (e) => {
    set_withSupport(!withSupport);
  };
  useEffect(() => {
    if (withSupport) {
      dispatchFactor({ type: "ISWITHTEACHER", payload: true });
    } else {
      dispatchFactor({ type: "ISWITHTEACHER", payload: false });
    }
  }, [withSupport]);
  ////isWithTeacher
  useEffect(() => {
    if (finalAmount) {
      checkoutFactor(true);
    }
  }, [factor.isWithTeacher]);

  return (
    <div className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div
        style={{
          border: `3px solid ${colors["main-color-1"]}`,
          borderRadius: ".5625rem",
        }}
        className="m-0 my-4 p-2 d-flex flex-column justify-content-start align-items-stretch"
      >
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">قیمت دوره</span>
          <span className="fs-6 fw-bold">
            {priceInformation?.formattedPrice}
          </span>
        </div>
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">تخفیف این دوره</span>
          <span className="fs-6 fw-bold"> %{priceInformation?.discount}</span>
        </div>
        <div className="m-0 my-2 p-0 d-flex flex-row justify-content-between align-items-baseline">
          <span className="fs-6 fw-bold">جمع کل </span>
          <span className="fs-6 fw-bold">
            {priceInformation?.formattedDiscountPrice}
          </span>
        </div>
        {/******** WITH SUPPORT ********/}
        <div className="m-0 mt-2 p-0 d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row justify-content-start align-items-center">
            <label
              className="fs-6 fw-bold m-0 p-0 d-flex flex-row justify-content-start align-items-center"
              htmlFor="withSupport"
            >
              <input
                type="checkbox"
                onChange={handle_withSupport_change}
                checked={withSupport}
                id="withSupport"
                className="me-2"
              />
              با پشتیبان
            </label>

            {/* <IconButton className="ms-2" onClick={handleShowExplanationsDialog}>
              <InfoIcon color="primary" />
            </IconButton> */}
            <Dialog
              open={showExplanationsDialog}
              onClose={handleShowExplanationsDialog}
            >
              <div
                style={{ minWidth: "300px", minHeight: "200px" }}
                className="m-0 p-3 d-flex flex-column justify-content-start align-items-start"
              >
                در صورت گذراندن دوره ی مورد نظر " با پشتیبان " پس از ثبت نام ،
                در داخل گروهی در واتساپ متناسب با دوره ی ثبت نام شده اضافه
                خواهید شد و در آن گروه میتوانید تمام سوالات و ابهامات اموزشی
                خودتان را به صورت روزانه از پشتیبان آموزشی مجموعه بپرسید و
                همچنین نکات آموزشی پاسخ داده شده به سوالات سایر هم‌ لول های خود
                را نیز در آن گروه مشاهده نمایید.
              </div>
            </Dialog>
          </div>

          <div className="m-0 mt-1 text-muted p-0 d-flex flex-column justify-content-start align-items-start">
            هزینه پشتیبان : {priceInformation?.formattedTeacherPrice}
          </div>
        </div>
        <small className="text-muted fs-8 mt-1 ps-0 m-0 p-0">
          <InfoIcon
            color="primary"
            className="m-0 me-1"
            sx={{ fontSize: "18px" }}
          />
          برای خواندن توضیحات گزینه "با پشتیبان"
          <strong
            className="text-main-color-1 mx-1"
            onClick={handleShowExplanationsDialog}
          >
            اینجا
          </strong>
          را کلیک کنید.
        </small>

        {/******** WITH SUPPORT ********/}
        {/******** WITH NOTIFICATIONS ********/}
        <div className="m-0 my-2 mt-3 p-0 d-flex flex-row justify-content-start align-items-start">
          <label
            className="fs-6 fw-bold m-0 p-0 d-flex flex-row justify-content-start align-items-center"
            htmlFor="hasNotif"
          >
            <input
              type="checkbox"
              onChange={handle_hasNotif_change}
              checked={hasNotif}
              id="hasNotif"
              className="me-2"
            />
            یادآوری روزهای کلاس
          </label>
        </div>
        {/******** WITH NOTIFICATIONS ********/}
        <div className="m-0 my-2 mt-3 p-0 d-flex flex-row justify-content-between align-items-stretch">
          <input
            style={{
              background: `${colors["input-background"]}`,
              border: "none",
              outline: "none",
              height: "50px",
            }}
            dir="rtl"
            placeholder="کد تخفیف"
            className=" flex-grow-1 py-2 px-3 box-rounded-1 auth-input"
            id="inviteCode"
            type={"text"}
            onChange={handleGiftCodeChange}
            value={factor?.classRoomConfig?.inviteCode || ""}
          />
          <Button
            onClick={handleAddInviteCode}
            color="primary"
            variant="contained"
            className="ms-2 box-rounded-1 "
            sx={{
              minWidth: "50px",
              width: "50px",
              height: "50px",
            }}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <div className="my-3 mt-4 mb-6 d-flex flex-column justify-content-start aign-items-start">
        <div className="">قیمت با مالیات بر ارزش افزوده</div>
        <div
          style={{
            background: `${colors["input-background"]}`,
            border: "none",
            outline: "none",
            height: "50px",
          }}
          dir="rtl"
          className="m-0 py-2 mt-1 px-3 fs-5 d-flex flex-row justify-content-center align-items-center box-rounded-1"
        >
          {` ${formatNumber(finalAmount)} تومان`}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        className=" mx-auto py-3 d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          style={{
            width: "calc(100% - 2rem)",
          }}
          variant="contained"
          color="primary"
          className="py-2"
          onClick={handlePay}
        >
          پرداخت
        </Button>
      </div>
      <a className="d-none" id="paymentGateLink" ref={paymentGateLink_ref}></a>
    </div>
  );
};

export default BuyCourseFourthPage;
