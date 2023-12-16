import React, { useState, useEffect } from "react";
import fakeAvatar from "../../../../assets/img/Rectangle.png";
import commentIcon from "../../../../assets/img/icons/comment.png";
import "./styles/styles.css";
import { LandingPageCoursesCarousel } from "../../../../components/carousel/carousel";
import CoursesCarousel from "../../../../components/carousel/aliceCarousel";
import CoursesNukaCarousel from "../../../../components/carousel/nukaCarousel";
import { weekdaysEnum } from "../../../../core/enums";
import { useNavigate } from "react-router";

export const CourseItem = ({
  id,
  title,
  totalMessages,
  participants,
  weekDays,
  progress = 0,
}) => {
  const navigate = useNavigate();
  const handleGotoCourse = () => {
    navigate("/courses-details/" + id);
  };
  return (
    <div
      onClick={handleGotoCourse}
      style={{
        minHeight: "170px",
      }}
      dir="rtl"
      className="course-item m-0 p-2 px-3  d-flex flex-column justify-content-start align-items-stretch"
    >
      <div className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
        <span className="comments-count d-flex flex-row justify-content-start align-items-center">
          <img src={commentIcon} alt="..." className="me-1" />
          {parseInt(totalMessages) > 100 ? "+100" : totalMessages}
        </span>
        <span className="course-title fs-5 fw-bold">{title}</span>
      </div>
      {participants?.length > 0 && (
        <div className="m-0 p-0 my-3 d-flex flex-row justify-content-end align-items-center">
          <span className="fs-6 fw-bold me-3">
            {participants?.length > 100 ? "+100" : participants?.length}
          </span>
          <div
            style={{ width: "80px", height: "50px" }}
            className="classmates  m-0 p-0 position-relative"
          >
            {participants?.length >= 4 && (
              <>
                <span
                  style={{ top: "0", left: 0 * 10 + "px" }}
                  key={participants[0].id}
                  className="classmate-item position-absolute"
                >
                  <img
                    className="classmate-avatar"
                    src={participants[0].imageUrl}
                    alt="..."
                  />
                </span>
                <span
                  style={{ top: "0", left: 1 * 10 + "px" }}
                  key={participants[1].id}
                  className="classmate-item position-absolute"
                >
                  <img
                    className="classmate-avatar"
                    src={participants[1].imageUrl}
                    alt="..."
                  />
                </span>
                <span
                  style={{ top: "0", left: 2 * 10 + "px" }}
                  key={participants[2].id}
                  className="classmate-item position-absolute"
                >
                  <img
                    className="classmate-avatar"
                    src={participants[2].imageUrl}
                    alt="..."
                  />
                </span>
                <span
                  style={{ top: "0px", left: 3 * 10 + "px" }}
                  key={participants[3].id}
                  className="classmate-item position-absolute"
                >
                  <img
                    className="classmate-avatar"
                    src={participants[3].imageUrl}
                    alt="..."
                  />
                </span>
              </>
            )}
            {participants?.length < 4 &&
              participants.map((item, index) => (
                <span
                  style={{ top: "0", left: index * 10 + "px" }}
                  key={item.id}
                  className="classmate-item position-absolute"
                >
                  <img
                    className="classmate-avatar"
                    src={item.imageUrl}
                    alt="..."
                  />
                </span>
              ))}
          </div>
        </div>
      )}
      <div className="m-0 my-2 mt-3 mt-auto  mb-3 p-0 d-flex flex-row justify-content-center align-items-center">
        <div className="course-progress">
          <div className="range-all"></div>
          <div style={{ width: progress + "%" }} className="range-passed"></div>
          <span
            style={{
              left: "calc(" + (progress === 0 ? 2 : progress) + "% - 10px)",
            }}
            className="range-percent"
          >
            {progress + "%"}
          </span>
        </div>
      </div>
      <div className="m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-baseline">
        {` روز های هفته : `}
        {weekdaysEnum[weekDays]}
      </div>
    </div>
  );
};

const CoursesSection = ({ myCourses }) => {
  /*
  id: 17, title: 'Elementary', weekDays: 2, totalMessages: 0, participants: Array(0)
  */
  const [list, set_list] = useState([
    {
      id: 0,
      progress: 34,
      title: "Elementary",
      totalMessages: 200,
      participants: [
        { id: 0, name: "ali", imageUrl: fakeAvatar },
        { id: 1, name: "asghar", imageUrl: fakeAvatar },
        { id: 2, name: "javad", imageUrl: fakeAvatar },
        { id: 3, name: "pari", imageUrl: fakeAvatar },
        { id: 4, name: "maryam", imageUrl: fakeAvatar },
        { id: 5, name: "mamad", imageUrl: fakeAvatar },
      ],
    },
    {
      id: 1,
      progress: 74,
      title: "Chemistry",
      totalMessages: 95,
      participants: [
        { id: 0, name: "ali", imageUrl: fakeAvatar },
        { id: 1, name: "asghar", imageUrl: fakeAvatar },
      ],
    },
    {
      id: 2,
      progress: 20,
      title: "Mathematics",
      totalMessages: 42,
      participants: [
        { id: 0, name: "ali", imageUrl: fakeAvatar },
        { id: 1, name: "asghar", imageUrl: fakeAvatar },
        { id: 2, name: "javad", imageUrl: fakeAvatar },
        { id: 3, name: "mamad", imageUrl: fakeAvatar },
      ],
    },
  ]);

  return (
    <section dir="ltr" className="courses-section m-0 p-0 my-4">
      <h2 className="text-center fs-5 fw-bold">دوره های جاری</h2>
      {myCourses?.length > 0 ? (
        <CoursesNukaCarousel list={myCourses} />
      ) : (
        <p className="my-2 text-center w-100">
          در حال حاضر هیچ دوره ای برای شما ثبت نشده است.
        </p>
      )}
    </section>
  );
};

export default CoursesSection;
