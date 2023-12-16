import React, { useState, useEffect } from "react";
import usePersistedState from "use-persisted-state-hook";

const appTourContext = React.createContext();

const wrapContent = (content) => {
  return () => {
    return (
      <div className="pt-2" dir="rtl">
        {content}
      </div>
    );
  };
};

const SS = () => (
  <div
    dir="rtl"
    className="d-flex flex-column justify-content-start aliifn-items-start"
    onLoad={(e) => {
      console.log(e);
    }}
    onError={(e) => {
      console.log(e);
    }}
  >
    <span className="ps-3">منو</span>
    <div className="mt-2">
      میتوانید از این بخش ویدیوی آموزش استفاده از اپلیکیشن را مشاهده کنید .
    </div>
  </div>
);

const AppTourProvider = ({ children }) => {
  const [tourInfo, set_tourInfo] = usePersistedState("appTour", {
    landingPageSteps: [
      {
        selector: "#sidemenuToggler",
        content:
          " میتوانید از این بخش ویدیوی آموزش استفاده از اپلیکیشن را مشاهده کنید .",
        isFirstTime: true,
      },
      {
        selector: "#landing-placementTest",
        content: "از این بخش میتوانید وارد صفحه تعیین سطح شوید",
        isFirstTime: true,
      },
      {
        selector: "#landing-jems",
        content: "اینجا میتوانید جم های دریافتی خود را مشاهده کنید .",
        isFirstTime: true,
      },
      {
        selector: "#courses-btn",
        content: "با فشردن این دکمه میتوانید وارد صفحه دوره ها شوید .",
        isFirstTime: true,
      },
      {
        selector: "#leitner-btn",
        content: "با فشردن این دکمه میتوانید وارد صفحه لایتنر شوید .",
        isFirstTime: true,
      },
      {
        selector: "#home-btn",
        content: "با فشردن این دکمه میتوانید وارد صفحه خانه شوید .",
        isFirstTime: true,
      },
      {
        selector: "#extra-btn",
        content: "با فشردن این دکمه میتوانید وارد صفحه سرگرمی ها شوید .",
        isFirstTime: true,
      },
      {
        selector: "#chat-btn",
        content:
          "با فشردن این دکمه میتوانید وارد واتساپ خود شوید و با پشتیبانی در ارتباط باشید. .",
        isFirstTime: true,
      },
    ],
    leitnerPage: [
      {
        selector: "#openHowToUseLeitner",
        content:
          "با فشردن این دکمه میتوانید آموزش استفاده از لایتنر را مشاهده کنید .",
        isFirstTime: true,
      },
    ],
    crosswordPage: [
      {
        selector: "#openHowToUseCrossword",
        content:
          "با فشردن این دکمه میتوانید آموزش استفاده از جدول را مشاهده کنید .",
        isFirstTime: true,
      },
    ],
    aside: [
      {
        selector: "#openHowToUseApp",
        content:
          "با فشردن این دکمه میتوانید آموزش استفاده از اپلیکیشن را مشاهده کنید .",
        isFirstTime: true,
      },
    ],
    vocabularies: [
      {
        selector: "#addToLeitner",
        content:
          " با فشردن این دکمه میتوانید لغت را به لاینتر اضافه کنید کنید .",
        isFirstTime: true,
      },
    ],
    questionPage: [
      {
        selector: "#questionsList",
        content:
          "با فشردن این بخش پنجره ای باز میشود که میتوانید لیست سوالات را مشاهده کنید و با فشردن روی هر سوال وارد صفحه آن شوید .",
        isFirstTime: true,
      },
    ],
  });

  const [isTourOpen, set_isTourOpen] = usePersistedState("isTourOpen", true);

  return (
    <appTourContext.Provider
      value={{ tourInfo, isTourOpen, set_tourInfo, set_isTourOpen }}
    >
      {children}
    </appTourContext.Provider>
  );
};

export const useTour = () => {
  return React.useContext(appTourContext);
};
export const useTourActions = () => {
  const { tourInfo, set_tourInfo, set_isTourOpen } = useTour();

  const onTourEnd = (page) => {
    set_isTourOpen(false);
    const clonedTour = JSON.parse(JSON.stringify(tourInfo));
    set_tourInfo({
      ...tourInfo,
      [page.toString()]: clonedTour[page.toString()].map((item) => {
        return { ...item, isFirstTime: false };
      }),
    });
  };

  return { onTourEnd };
};

export default AppTourProvider;
