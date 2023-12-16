import React from "react";
import ClassmateTabSearch from "./components/ClassmateTabSearch/ClassmateTabSearch";
import ClassmateAvatars from "./components/ClassmateAvatars/ClassmateAvatars";
import ClassmateCards from "./components/ClassmateCards/ClassmateCards";
import "./style/style.css";

import defImg from "../../../../../../../assets/img/babak-images/classmate-avatar.png";

const fakeClassMates = [
  { phone: "09360314540", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314541", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314542", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314543", name: "ssssss", avatarUrl: defImg },
  { phone: "09360314544", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314545", name: "امیرمحمد حیدری", avatarUrl: defImg },
  {
    phone: "09360314546",
    name: "امیرمحمد حیدری",
    avatarUrl: "https://avatars.dicebear.com/api/avataaars/02.svg",
  },
];
const ClassmateTab = ({ classRoomInfo }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* <ClassmateTabSearch /> */}
      {classRoomInfo?.length > 0 && (
        <>
          <ClassmateAvatars
            avatars={classRoomInfo?.map((item) => item.avatarUrl)}
          />
          <ClassmateCards classRoomInfo={classRoomInfo} />
        </>
      )}
      {classRoomInfo?.classmates?.length === 0 && (
        <>
          <p>شما همکلاسی ای در این کلاس ندارید .</p>
          <p>
            برای داشتن‌ همکلاسی که در جلسات درسی دوره ها در کنار شما حضور داشته
            باشد و از طریق بخش چت اپلیکیشن نیز بتوانید با هم به گفتگو و بررسی
            مشکلات اموزشی و تبادلات علمی بپردازید ، در هنگام خرید دوره ، حضور
            گروهی را انتخاب کنید و شماره ی تلفن همراه دوست خود را وارد نمایید تا
            دعوتنامه ای برای همکلاسی شدن با شما برای فرد مورد نظراتتان از طریق
            اپلیکیشن لرنست فرستاده شود.
          </p>
        </>
      )}
    </div>
  );
};

export default ClassmateTab;
