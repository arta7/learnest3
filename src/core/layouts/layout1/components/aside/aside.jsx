import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { Button, Dialog, Drawer, Rating } from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
//styles
import { toast } from "react-toastify";

import ReactPlayer from "react-player";
// import { useRightDrawerStyles } from "../../../../custom-hooks/useDrawerStyles";

import Rectangle from "../../../../../assets/img/Rectangle.png";
import profileIcon from "../../../../../assets/img/icons/profile.png";
import noteIcon from "../../../../../assets/img/icons/note.png";
import levelingIcon from "../../../../../assets/img/icons/leveling.png";
import bookmarkIcon from "../../../../../assets/img/icons/bookmark.png";
import exitIcon from "../../../../../assets/img/icons/exit.png";
import updateIcon from "../../../../../assets/img/icons/exchange.png";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import "./styles/styles.scss";
import { useRightDrawerStyles } from "../../../../custom-hooks/useDrawerStyles";
import { useAuthenticationActions } from "../../../../../core/contexts/authentication/authenticationProvider";
import { useUserProfileContext } from "../../../../contexts/profile/profileProvider";
import { fileBaseUrl } from "../../../../services/baseUrl";
import { deleteAllCookies } from "../../../../utils/utils";
import { NoteIcon, ProfileIcon,BookmarkIcon } from "../../../../../components/icons/icons";
import AppTour from "../../../../../components/appTour/appTours.component";
const safeAreaInsets = require("safe-area-insets");
////////////////
const tabItems = [
  {
    id: 0,
    link: "/profile",
    title: "پروفایل",
  },
  {
    id: 1,
    link: "/notes",
    title: "یادداشت های من",
  },
  { id: 2, link: "/rules", title: "قوانین سایت" },
  { id: 3, link: "/howToUseSite", title: "ویدیوی آموزش اپلیکیشن" },
  { id: 4, link: "/bookmarks", title: "بوکمارک ها" },
];

const Aside = (props) => {
  const rightDrawerClasses = useRightDrawerStyles();
  const { logout } = useAuthenticationActions();
  const { profileData } = useUserProfileContext();
  const location = useLocation();

  const handleUpdateApp = () => {
    if ("serviceWorker" in navigator) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    deleteAllCookies();
    window.location.href = "/";
  };

  useEffect(() => {
    if (props.open) props?.onClose();
  }, [location.pathname]);

  const [seeSiteRules, set_seeSiteRules] = useState(false);
  const handle_seeSiteRules = () => {
    set_seeSiteRules(!seeSiteRules);
  };

  const [openHowToUseApp, set_openHowToUseApp] = useState(false);
  const handle_openHowToUseApp = () => {
    set_openHowToUseApp(!openHowToUseApp);
  };

  return (
    <Drawer classes={rightDrawerClasses} dir="rtl" anchor="right" {...props}>
      {safeAreaInsets?.top ? (
        <div
          style={{
            height: `${safeAreaInsets.top + 3}px`,
            width: "100%",
            backgroundColor: "#000",
          }}
        ></div>
      ) : (
        <></>
      )}

      <div
        className={
          " aside h-100 m-0 px-3 pb-3 d-flex flex-column justify-content-start align-items-stretch"
        }
      >
        <div className=" d-flex flex-column justify-content-between align-items-center">
          <div className="user-avatar">
            <div className="avatar-around l1 position-relative"></div>
            <div className="avatar-around l2 position-abosolute"></div>
            <div className="avatar-around l3 position-abosolute"></div>
            <div className="avatar-around l4 position-abosolute"></div>

            <img
              className=""
              src={fileBaseUrl + profileData?.avatarUrl}
              alt="..."
            />

            <svg
              viewBox="0 0 98 52"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.14"
                d="M96.4211 0.659912C92.8967 21.1376 78.909 38.3169 59.4975 46.0085C40.0859 53.7001 18.0473 50.7959 1.32153 38.3421"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="user-name my-2">{/* جین دو */}</div>
          {/* <div dir="ltr" className="user-rate my-2">
            <Rating name="read-only" value={4} readOnly />
          </div> */}
        </div>
        <div className="my-3 mx-3 align-self-start d-flex flex-column justify-content-between align-items-stretch">
          {tabItems.map(({ link, id, title }, index) => {
            if (link === "/rules" || link === "/howToUseSite") {
              return (
                <Link
                  to={link}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link === "/rules") handle_seeSiteRules();
                    if (link === "/howToUseSite") handle_openHowToUseApp();
                  }}
                  className="m-0 my-3 text-dark p-0 d-flex flex-row justify-content-start align-items-center text-decoration-none"
                  key={id}
                >
                  {link === "/rules" ? (
                    <RuleIcon
                      className={
                        (index === 1 || index === 2 ? "ms-1" : "") + " me-2"
                      }
                      color="primary"
                    />
                  ) : (
                    <PlayCircleOutlineIcon
                      id="openHowToUseApp"
                      className={
                        (index === 1 || index === 2 ? "ms-1" : "") + " me-2"
                      }
                      color="primary"
                    />
                  )}
                  {title}
                </Link>
              );
            }
            return (
              <Link
                to={link}
                className="m-0 my-3 text-dark p-0 d-flex flex-row justify-content-start align-items-center text-decoration-none"
                key={id}
              >
                {link === "/notes" && (
                  <NoteIcon
                    lightness="main"
                    className={
                      (index === 1 || index === 2 ? "ms-1" : "") + " me-2"
                    }
                  />
                )}
                {link === "/profile" && (
                  <ProfileIcon
                    lightness="main"
                    className={
                      (index === 1 || index === 2 ? "ms-1" : "") + " me-2"
                    }
                  />
                )}
                {link === "/bookmarks" && (
                  <BookmarkIcon
                    lightness="main"
                    className={
                      "ms-1 me-2"
                    }
                  />
                )}
                {title}
              </Link>
            );
          })}
        </div>
        {/*
          <div
            onClick={handleUpdateApp}
            className="cursor-pointer align-self-start flex-row mx-3 p-2 mb-2 mt-auto justify-content-start align-items-center"
          >
            <img
              className="me-2"
              src={updateIcon}
              style={{ width: "20px" }}
              alt="..."
            />
            <span className="text-success fw-bold ">به روز رسانی اپلیکیشن</span>
          </div>
        */}
        <div
          onClick={logout}
          className="cursor-pointer align-self-start flex-row mx-3 p-2 my-3 mt-2 justify-content-start align-items-center"
        >
          <img className="me-2" src={exitIcon} alt="..." />
          <span className="text-danger fw-bold ">خروج</span>
        </div>
      </div>
      <Dialog open={seeSiteRules} onClose={handle_seeSiteRules}>
        <p className="p-3" style={{ lineHeight: "1.7rem" }}>
          بند ۱: لرنست در ایران مدیریت شده و تابع قوانین جمهوری اسلامی ایران
          است.
          <br />
          <br />
          بند ۲: عضویت هر کاربر در لرنست به منزلهٔ پذیرش کلیهٔ قوانین و مقررات
          لرنست است و تمامی کاربران باید قبل از عضویت، قوانین را مطالعه کنند و
          تنها در صورت موافقت و تعهد به پایبندی، در لرنست عضو شوند.
          <br />
          <br />
          بند ۳: قوانین مندرج در این صفحه در طول زمان قابل تغییر است. مسئولیت
          مطالعه و آگاهی از این تغییرات بر عهدهٔ کاربران است. در صورت عدم توافق
          با این شرایط شما مجاز به استفاده از خدمات لرنست نخواهید بود.
          <br />
          <br />
          بند ۴: گرفتن شماره تلفن همراه و رایانامه(ایمیل) کاربران برای شناسایی و
          ایجاد حساب کاربری است. لرنست متعهد می‌شود که شماره تلفن و ایمیل
          کاربران در نزد او محفوظ است و آنها را در اختیار هیچ شخص حقیقی و یا
          حقوقی قرار نخواهد داد.
          <br />
          <br />
          بند ۵: لرنست هیچگاه از کاربران خود، اطلاعاتی را از طریق ایمیل و یا
          پیامک درخواست نخواهد کرد. و از ایمیل تنها به منظور اطلاع رسانی استفاده
          خواهد کرد.
          <br />
          <br />
          بند ۶: آموزش‌های لرنست شامل دو بخش رایگان و غیررایگان است. استفاده از
          آموزش‌ها و داده‌های غیررایگان لرنست صرفا با خرید اشتراک امکان‌پذیر است
          و هر راه دیگری برای دسترسی به آنها غیر قانونی است و باعث حذف حساب
          کاربری و یا پیگرد قانونی متخلف می‌شود.
          <br />
          <br />
          بند ۷: دسترسی کاربران به داده‌ها، آموزش‌ها و تمرین‌های غیررایگان لرنست
          فقط در مدت زمان اشتراک خریداری شده امکان‌پذیر است و بعد از اتمام زمان
          اشتراک دسترسی کاربر به موارد غیررایگان قطع می‌شود.
          <br />
          <br />
          بند ۸: چنانچه کاربری تمایل به ادامه فعالیت در لرنست را نداشته باشد
          می‌تواند با ارسال تیکت حساب کاربری خود را متوقف کند، لرنست، حساب
          کاربری موردنظر را متوقف می‌کند ولی به منظور نگهداری جزئیات کاربر و
          تراکنش‌ها، اطلاعات را از پایگاه دادهٔ خود حذف نمی‌کند
        </p>
      </Dialog>
      <Dialog open={openHowToUseApp} onClose={handle_openHowToUseApp}>
        <div
          className="m-0 p-3 d-flex flex-row justify-content-center align-items-center"
          style={{ minWidth: "calc(370px - 2rem)" }}
        >
          <ReactPlayer controls url={fileBaseUrl+"/tutorial/app.mp4"} />
        </div>
      </Dialog>
      {/* <AppTour page="aside" /> */}
    </Drawer>
  );
};

export default Aside;
