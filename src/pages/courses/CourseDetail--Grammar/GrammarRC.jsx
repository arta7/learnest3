import React, { useEffect, useState } from "react";
import GrammarItem from "./components/GrammarItem/GrammarItem";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "./style/style.css";
import "swiper/css";
import { baseUrl } from "../../../core/services/baseUrl";

const GrammarRC = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const [grammar, setGrammar] = useState([]);
  const [hasExercise, setHasExercise] = useState();
  const [counter, setCounter] = useState(1);
  const [grammarQuestions, setGrammarQuestions] = useState([]);

  // state for swiper
  const [swiper, setSwiper] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state) {
      setGrammar(location?.state.grammar);
      setHasExercise(location?.state.hasExercise);
      console.log(location.state);
    }
  }, [location?.state]);

  // sliding Swiper
  const slidingSwiper = (btnName) => {
    if (btnName === "Next") {
      document.querySelector(".swiper-button-next").click();
    }
    if (btnName === "Previous") {
      document.querySelector(".swiper-button-prev").click();
    }
  };

  // handle See Grammar Questions
  const handleSeeGrammarQuestions = async (partId) => {
    await axios
      .post(
        baseUrl + "/courses/getpartquestions?partId=" + partId,
        null
      )
      .then((resp) => {
        if (resp?.status === 200 && resp?.data.status === "1") {
          // console.log(response);
          /*
                navigate("/question-engine", {
                  state: {
                    questions: resp?.data.data.questions,
                    typeId: data?.typeId,
                    baseAnsweringType: 0,
                    pageDataOnFinishQuestions: {
                      path: "/grammar/75",
                      lessonId: data.id,
                      data: data.pageDataOnFinishQuestions,
                    },
                  },
                });
          */

          setGrammarQuestions(resp?.data.data.questions);
          navigate("/grammar-questions", {
            state: resp?.data.data.questions,
          });
        }
      })
      .catch((exp) => {
        console.log(exp);
      });
  };

  return (
    <section>
      <div className="word-counter">faq header</div>
      <Swiper
        className="btn-cursor"
        modules={[Navigation]}
        onSwiper={setSwiper}
        navigation
        onSlideChange={(e) => setCounter(e.activeIndex + 1)}
      >
        {grammar?.map((item) => (
          <SwiperSlide key={item.id}>
            <GrammarItem key={item.id} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* End Swiper Slider */}
      <div className="m-0 p-0 d-flex w-100 flex-row justify-content-center align-items-center">
        <div
          onClick={() => slidingSwiper("Next")}
          className={
            (counter === grammar?.length ? "d-none" : "") +
            " col-3 m-0 p-3 mb-2 align-middle text-center font-15 btn-cursor"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          {" "}
          {"< بعدی"}{" "}
        </div>
        {hasExercise ? (
          <div
            onClick={() => handleSeeGrammarQuestions(id)}
            className={
              (counter === grammar?.length ? "d-flex" : "d-none") +
              " col-5 m-0 d-flex justify-content-center align-items-center mb-2 mx-2 p-3 text-center btn-cursor"
            }
            style={{ backgroundColor: "#82c91e", borderRadius: "10px" }}
          >
            {" "}
            مشاهده سوالات{" "}
          </div>
        ) : null}
        <div
          onClick={() => slidingSwiper("Previous")}
          className={
            (counter - 1 === 0 ? "d-none" : "") +
            " col-3 m-0 p-3 mb-2 me-1 align-middle text-center font-15 btn-cursor"
          }
          style={{ backgroundColor: "#228be6", borderRadius: "10px" }}
        >
          {" "}
          {"قبلی >"}{" "}
        </div>
      </div>
    </section>
  );
};

export default GrammarRC;
