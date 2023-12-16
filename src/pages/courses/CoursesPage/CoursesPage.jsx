import React, { useEffect, useState } from "react";
import CourseFilter from "./components/CourseFilter/CourseFilter";
import CourseList from "./components/CourseList/CourseList";
import axios from "axios";
import { baseUrl } from "../../../core/services/baseUrl";

const CoursesPage = () => {
  const [courses, set_courses] = useState();
  const [filteredCourses, set_filteredCourses] = useState();

  const [selectedFilter, set_selectedFilter] = useState("all");
  const getAllUrl = baseUrl + "/courses/getall";

  const getAllCourses = async () => {
    await axios
      .post(getAllUrl, null, {
        headers: {
          // authorization: localStorage.getItem("learnestToken"),
          "Cache-Control": "public,max-age=1, stale-while-revalidate=119",
          Version: "ewano"
        },
      })
      .then((resp) => {
        // console.log(resp.data.data);
        set_courses(resp.data.data);
        set_filteredCourses(resp.data.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    filter();
  }, [selectedFilter, courses]);

  const filter = () => {
    if (courses) {
      const coursesClone = [...courses];

      if (selectedFilter === "all") {
        set_filteredCourses(coursesClone);
      }
      if (selectedFilter === "isDiscount") {
        const arr = coursesClone.filter((item) => item.discount !== 0);
        set_filteredCourses(arr);
      }
      if (selectedFilter === "isSpecial") {
        const arr = coursesClone.filter((item) => item.isSpecial);
        set_filteredCourses(arr);
      }
      if (selectedFilter === "isBought") {
        const arr = coursesClone.filter((item) => item.isBought);
        set_filteredCourses(arr);
      }
      if (selectedFilter === "isElementary") {
        const arr = coursesClone.filter((item) => item.isElementary);
        set_filteredCourses(arr);
      }
      if (selectedFilter === "minPrice") {
        const arr = coursesClone.sort((a, b) => a.price - b.price);
        set_filteredCourses(arr);
      }
      if (selectedFilter === "maxPrice") {
        const arr = coursesClone.sort((a, b) => b.price - a.price);
        set_filteredCourses(arr);
      }
    }
  };

  return (
    <div
      // style={{ backgroundColor: "white", overflowY: "scroll", height: "550px" }}
      className="px-3 m-0 mt-3 p-0 mx-auto"
    >
      <CourseFilter
        selectedFilter={selectedFilter}
        set_selectedFilter={set_selectedFilter}
      />
      <CourseList courseData={filteredCourses} />
      {filteredCourses?.length === 0 && (
        <div className=" bg-warning p-3 py-4 rounded-3">
          {" "}
          دوره ای مطابق با این فیلتر وجود ندارد .{" "}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
