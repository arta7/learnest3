import { baseUrl } from "./baseUrl";

export const API_URLs = {
  authentincation: {
    signup: baseUrl + "/students/signup",
    login: baseUrl + "/students/login",
    verify: baseUrl + "/students/verify",
  },
  bookmark: {
    bookmarks: baseUrl + "/bookmark/bookmarks",
    questions: baseUrl + "/bookmark/questions",
    createbookmark: baseUrl + "/bookmark/createbookmark",
    deletebookmark: baseUrl + "/bookmark/deletebookmark",
    addquestion: baseUrl + "/bookmark/addquestion",
    deletequestion: baseUrl + "/bookmark/deletequestion",
  },
  home: {
    getDashboardInfo: baseUrl + "/students/dashboard",
    report: baseUrl + "/home/report",
  },
  profile: {
    getProfile: baseUrl + "/students/information",
    editProfile: baseUrl + "/students/updateprofile",
    changeAvatar: baseUrl + "/students/updateavatar",
  },
  placement: {
    getAll: baseUrl + "/placementtests/getall",
    getExamDetails: baseUrl + "/placementtests/get",
    finishtest: baseUrl + "/placementtests/finishtest",
    starttest: baseUrl + "/placementtests/starttest",
  },
  leitners: {
    dashboard: baseUrl + "/leitners/dashboard",
    getall: baseUrl + "/leitners/getall",
    addtoleitner: baseUrl + "/leitners/addtoleitner",
    updateleitners: baseUrl + "/leitners/updateleitners",
  },
  answerToQuestion: {
    answerTo_YNB: baseUrl + "/courses/answertoynbquestion",
    answerTo_CONVERSATION: baseUrl + "/courses/answertoconversationquestion",
    answerTo_MULTICHOICE: baseUrl + "/courses/answertomultichoicequestion",
    answerTo_PHRASE: baseUrl + "/courses/answertophrasequestion",
  },
  session: {
    sessionLearning: baseUrl + "/courses/sessionlearning",
    completelearning: baseUrl + "/courses/completelearning",
    getPartQuestions: baseUrl + "/courses/getpartquestions",
    completeSessionPart: baseUrl + "/courses/completesessionpart",
  },
  buyCourse: {
    classroominvites: baseUrl + "/courses/classroominvites",
    invitetocourse: baseUrl + "/courses/invitetocourse",
    invitetoclassroom: baseUrl + "/courses/invitetoclassroom",
    suggestedstartdateforcourse:
      baseUrl + "/courses/suggestedstartdateforcourse",
    buycourseCheckout: baseUrl + "/courses/buycourse",
    paycoursefactor: baseUrl + "/courses/paycoursefactor",
  },
  exam: {
    getExam: baseUrl + "/courses/getexam",
    startExam: baseUrl + "/courses/startexam",
    finishExam: baseUrl + "/courses/finishexam",
  },
  note: {
    addNote: baseUrl + "/notes/createnote",
    editNote: baseUrl + "/notes/editnote",
    deleteNote: baseUrl + "/notes/deletenote",
    getNotes: baseUrl + "/notes/getnotes",
  },
  extra: {
    getAll: baseUrl + "/extras/getallextras",
    getcrossWord: baseUrl + "/extras/getcrossword",
    completeExtra: baseUrl + "/extras/completeextra",
    details: baseUrl + "/extras/details",
  },
  chat: {
    getchatslist: baseUrl + "/chats/getchatslist",
    getchatmessages: baseUrl + "/chats/getchatmessages",
  },
  notifications: {
    getNotificationsList: baseUrl + "/students/notifications",
    setNotificationsSeen: baseUrl + "/students/setnotificationseen",
  },
  pushNotif: {
    setPushDeviceID: baseUrl + "/students/setpushedeviceid",
  },
};
