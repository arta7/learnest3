import * as actions from "./actions";
import { mapToLocalStorage } from "./dataCache";

export const setStateReducer = (state, action) => {
  switch (action.type) {
    case actions.SETSTEP:
      // mapToLocalStorage({ ...state, step: action.payload });
      return { ...state, step: action.payload };
    case actions.SETCOURSEID:
      // mapToLocalStorage({ ...state, courseId: action.payload });
      return { ...state, courseId: action.payload };
    case actions.SETHASNOTIF:
      // mapToLocalStorage({ ...state, courseId: action.payload });
      return { ...state, hasNotif: action.payload };
    case actions.ISWITHTEACHER:
      // mapToLocalStorage({ ...state, courseId: action.payload });
      return { ...state, isWithTeacher: action.payload };
    case actions.SETGIFTCODE:
      // mapToLocalStorage({ ...state, giftCode: action.payload });
      return { ...state, giftCode: action.payload };
    case actions.SETWEEKDAYS:
      // mapToLocalStorage({ ...state, weekDays: action.payload });
      return { ...state, weekDays: action.payload };
    case actions.SETISTEMP:
      // mapToLocalStorage({ ...state, isTemp: action.payload });
      return { ...state, isTemp: action.payload };
    case actions.SETSTARTDATE:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: {
      //     ...state.classRoomConfig,
      //     startDate: action.payload,
      //   },
      // });
      return {
        ...state,
        classRoomConfig: {
          ...state.classRoomConfig,
          startDate: action.payload,
        },
      };
    case actions.SETCLASSROOMID:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: {
      //     ...state.classRoomConfig,
      //     classRoomId: action.payload,
      //   },
      // });
      return {
        ...state,
        classRoomConfig: {
          ...state.classRoomConfig,
          classRoomId: action.payload,
        },
      };
    case actions.SETUSESYSTEMSEARCH:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: {
      //     ...state.classRoomConfig,
      //     useSystemSearch: action.payload,
      //   },
      // });
      return {
        ...state,
        classRoomConfig: {
          ...state.classRoomConfig,
          useSystemSearch: action.payload,
        },
      };
    case actions.SETGENDER:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: { ...state.classRoomConfig, gender: action.payload },
      // });
      return {
        ...state,
        classRoomConfig: { ...state.classRoomConfig, gender: action.payload },
      };
    case actions.SETMINAGE:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: { ...state.classRoomConfig, minAge: action.payload },
      // });
      return {
        ...state,
        classRoomConfig: { ...state.classRoomConfig, minAge: action.payload },
      };
    case actions.SETMAXAGE:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: { ...state.classRoomConfig, maxAge: action.payload },
      // });
      return {
        ...state,
        classRoomConfig: { ...state.classRoomConfig, maxAge: action.payload },
      };
    case actions.SETINVITECODE:
      // mapToLocalStorage({
      //   ...state,
      //   classRoomConfig: {
      //     ...state.classRoomConfig,
      //     inviteCode: action.payload,
      //   },
      // });
      return {
        ...state,
        classRoomConfig: {
          ...state.classRoomConfig,
          inviteCode: action.payload,
        },
      };
  }
};
