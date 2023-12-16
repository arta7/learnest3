import React, { useState, useEffect } from "react";
import { sessionPartTypeEnum, extraMediaTypeEnum } from "../../enums";
import {
  getDataFromLocalStorage,
  mapToLocalStorage,
} from "../buyCourseContext/dataCache";

import usePersistedState from "use-persisted-state-hook";

const classRoomStateContext = React.createContext();
const classRoomSetStateContext = React.createContext();
const ClassRoomProvider = (props) => {
  const [classRoomInfo, set_classRoomInfo] = useState(
    getDataFromLocalStorage("classRoomInfo") || undefined
  );
  const [pagesTitles, set_pagesTitles] = useState({
    coursesDetails: "",
    courseDetails: "",
    sessio: "",
  });

  useEffect(() => {
    if (classRoomInfo) {
      mapToLocalStorage("classRoomInfo", classRoomInfo);
    }
  }, [classRoomInfo]);

  const [sessionLearningData, set_sessionLearningData] = useState();
  const [breadCrumbObject, set_breadCrumbObject] = usePersistedState(
    "learnest-breadcrumb",
    {
      classRoom: {
        title: "",
        link: "",
      },
      session: {
        title: "",
        link: "",
      },
      sessionLearning: {
        title: "",
        link: "",
      },
      questions: {
        title: "",
        link: "",
      },
      sessionPart: {
        title: "",
        link: "",
      },
    }
  );

  return (
    <classRoomStateContext.Provider
      value={{ breadCrumbObject, classRoomInfo, sessionLearningData }}
    >
      <classRoomSetStateContext.Provider
        value={{
          set_breadCrumbObject,
          set_classRoomInfo,
          set_sessionLearningData,
        }}
      >
        {props?.children}
      </classRoomSetStateContext.Provider>
    </classRoomStateContext.Provider>
  );
};

export const useClassRoomStateContext = () => {
  return React.useContext(classRoomStateContext);
};

export const useClassRoomSetStateContext = () => {
  return React.useContext(classRoomSetStateContext);
};

export const useClassRoomActions = () => {
  const { breadCrumbObject } = useClassRoomStateContext();
  const { set_breadCrumbObject } = useClassRoomSetStateContext();

  const set_breadCrumb_classRoom = (obj) => {
    set_breadCrumbObject({ ...breadCrumbObject, classRoom: obj });
  };
  const set_breadCrumb_session = (obj) => {
    set_breadCrumbObject({ ...breadCrumbObject, session: obj });
  };
  const set_breadCrumb_sessionLearning = (obj) => {
    set_breadCrumbObject({
      ...breadCrumbObject,
      sessionPart: { title: "", link: "" },
      questions: { title: "", link: "" },
      sessionLearning: obj,
    });
  };
  const set_breadCrumb_questions = (obj) => {
    set_breadCrumbObject({ ...breadCrumbObject, questions: obj });
  };
  const set_breadCrumb_Exam = (obj) => {
    set_breadCrumbObject({
      ...breadCrumbObject,
      questions: obj,
      sessionLearning: {
        title: "",
        link: "",
      },
      sessionPart: {
        title: "",
        link: "",
      },
    });
  };
  const set_breadCrumb_sessionPart = ({
    hasLesson,
    hasExercise,
    sessionPartType,
    sessionPartTitle,
    id,
  }) => {
    if (sessionPartType === 0) {
      set_breadCrumbObject({
        ...breadCrumbObject,
        sessionLearning: { title: "", link: "" },
        questions: { title: "", link: "" },
        sessionPart: {
          // title: sessionPartTypeEnum[sessionPartType].toString(),
          link: "/course-detail/" + id,
          title: sessionPartTitle,
        },
      });
    } else if (hasLesson) {
      set_breadCrumbObject({
        ...breadCrumbObject,
        sessionLearning: { title: "", link: "" },
        questions: { title: "", link: "" },
        sessionPart: {
          // title: sessionPartTypeEnum[sessionPartType].toString(),
          title: sessionPartTitle,
          link: "/course-detail/" + id,
        },
      });
    } else if (!hasLesson && hasExercise) {
      set_breadCrumbObject({
        ...breadCrumbObject,
        sessionLearning: { title: "", link: "" },
        // questions: { title: "سوالات", link: "/question-engine" },
        questions: { title: "", link: "" },
        sessionPart: {
          // title: sessionPartTypeEnum[sessionPartType].toString(),
          title: sessionPartTitle,
          link: "/course-detail/" + id,
        },
      });
    }
  };
  const set_breadCrumb_extra = (obj) => {
    const { extraLink, isQuestion, extraTitle, extraMediaType, extraId } = obj;
    set_breadCrumbObject({
      classRoom: {
        title: "سرگرمی" + " / " + extraMediaTypeEnum[extraMediaType],
        link: "/extra",
      },
      session: {
        title: extraTitle,
        link: extraLink,
      },
      sessionLearning: {
        title: "",
        link: "",
      },
      questions: {
        title: isQuestion ? "سوالات" : "لغات",
        link: isQuestion ? "/question-engine" : "/vocabularies/" + extraId,
      },
      sessionPart: {
        title: "",
        link: "",
      },
    });
  };

  return {
    breadCrumbActions: {
      set_breadCrumb_classRoom,
      set_breadCrumb_session,
      set_breadCrumb_sessionLearning,
      set_breadCrumb_questions,
      set_breadCrumb_sessionPart,
      set_breadCrumb_extra,
      set_breadCrumb_Exam,
    },
  };
};

export default ClassRoomProvider;
