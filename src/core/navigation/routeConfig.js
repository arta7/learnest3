import React, { lazy, Suspense } from "react";
// import { Switch, Route} from "react-router";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useLoginContext } from "../contexts/authentication/authenticationProvider";
import ClassRoomProvider from "../contexts/classRoom/classRoom";
import BuyCourseContext from "../contexts/buyCourseContext/buyCourseContext";
import PreLoader from "../../components/preloader/preloader";
import Layout from "../layouts/layout1/layout";
import Layout2 from "../layouts/layout2/layout2";
import BuyCourseLayout from "../layouts/buyCourseLayout/buyCourseLayout";

import QuestionContainer from "../../components/question/question.container";
import CrossWordTable from "../../components/crossword/crossWord.component";
import LeitnersDashboard from "../../components/leitners/pages/leitners.page.dashboard";
import Leitners from "../../components/leitners/pages/leitners.page.main";
// import QuestionsIterator from "../../components/question/questionsIterator";
import QuestionsIterator from "../../components/question/questions.page";
// temprory data for questions
import { questionsData } from "./questionsData";

const NotesPage = lazy(() => import("../../pages/notes/notes.page"));
const Profile = lazy(() => import("../../pages/profile/index.page"));

const EditProfile = lazy(() => import("../../pages/profile/edit.page"));

const LevelDetermine = lazy(() =>
  import("../../pages/level-determine/levelDetermine")
);
const LevelDetermineExam = lazy(() =>
  import("../../pages/level-determine-exam/levelDetermineExam")
);
const LandingPage = lazy(() => import("../../pages/home/landingPage"));
const Register = lazy(() => import("../../pages/register/register"));
const CoursesPage = lazy(() =>
  import("../../pages/courses/CoursesPage/CoursesPage")
);
const CoursesDetails = lazy(() =>
  import("../../pages/courses/CoursesDetails/CoursesDetails")
);

const CourseDetail = lazy(() =>
  import("../../pages/courses/CourseDetail/CourseDetail")
);
const Vocabularies = lazy(() =>
  import("../../pages/courses/CouerseDetail--Vocabularies/Vocabularies")
);
const SeeVocabsQuestions = lazy(() =>
  import("../../pages/courses/SeeVocabsQuestions/SeeVocabsQuestions")
);
const FAQ = lazy(() => import("../../pages/courses/CourseDetail--Faqs/FaqsRC"));

const FaqQuestions = lazy(() =>
  import(
    "../../pages/courses/CourseDetail--Faqs/components/FaqQuestions/FaqQuestions"
  )
);

const GrammarRC = lazy(() =>
  import("../../pages/courses/CourseDetail--Grammar/GrammarRC")
);
const SessionPart = lazy(() =>
  import("../../pages/courses/sessionPart/sessionPart.page")
);
const GrammarQuestion = lazy(() =>
  import(
    "../../pages/courses/CourseDetail--Grammar/components/GrammarQuestion/GrammarQuestion"
  )
);
const SessionLearning = lazy(() =>
  import("../../pages/courses/sessionLearning/sessionLearninig.page")
);

// buyCoursePages
const BuyCourseFirstPage = lazy(() =>
  import("../../pages/courses/buyCoursePages/buyCourse-firstPage/index")
);
const BuyCourseSecondPage = lazy(() =>
  import("../../pages/courses/buyCoursePages/buyCourse-secondPage")
);
const BuyCourseThirdPage = lazy(() =>
  import("../../pages/courses/buyCoursePages/buyCourse-thirdPage/index")
);
const BuyCourseFourthPage = lazy(() =>
  import("../../pages/courses/buyCoursePages/buyCourse-fourthPage/index")
);

/// extra pages

const ExtraIndexPage = lazy(() => import("../../pages/extra/index/extra.page"));

const ExtraDetailsPage = lazy(() =>
  import("../../pages/extra/extraDetails/extraDetails.page")
);

// chat pages

const ChatListPage = lazy(() => import("../../pages/chat/chatList.page"));
const ChatPage = lazy(() => import("../../pages/chat/chat.page"));

////////
const NotFound = lazy(() => import("../../pages/404/404"));
/////////
const TestVoiceAPI = lazy(() => import("../../pages/test/tts-api/testAPI"));
/////////
const NotificationsPage = lazy(() =>
  import("../../pages/notifications/notifications.page")
);
/////////
const ContactUsPage = lazy(() =>
  import("../../pages/contact-us/contactUs.page")
);
///bookmarkFoolder

const BookMarkFolders = lazy(() =>
  import("../../pages/bookmark-folders/bookmarkFolders")
);
//////

const FolderQuestions = lazy(() =>
  import("../../pages/folder-questions/folderQuestions")
);


function RouterConfig() {
  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        <Route path="/login" element={<Register />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/" element={<WithLayout1 />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/allcourses" element={<CoursesPage />} />
            {/* <Route path="/extra" element={<ExtraIndexPage />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<InClassRoom />}>
            <Route path="/" element={<WithLayout1 />}>
              <Route path="/extra" element={<ExtraIndexPage />} />
            </Route>
            <Route path="/" element={<WithLayout2 />}>
              <Route path="/support" element={<ContactUsPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/level-determine" element={<LevelDetermine />} />
              <Route
                path="/level-determine-exam"
                element={<LevelDetermineExam />}
              />
              {/* leitner */}
              <Route
                path="/leitner-dashboard"
                element={<LeitnersDashboard />}
              />
              <Route path="/leitner" element={<Leitners />} />

              {/* Start Courses's Routes */}
              <Route path="/courses-details/:id" element={<CoursesDetails />} />
              <Route path="/course-detail" element={<CourseDetail />}>
                <Route path=":id" element={<CourseDetail />} />
              </Route>
              <Route path="/session-learning" element={<SessionLearning />} />
              <Route path="/question-engine" element={<Questions />} />
              <Route path="/session-part/:id" element={<SessionPart />} />
              <Route path="/vocabularies/:id" element={<Vocabularies />} />
              <Route
                path="/vocabulariesquestion"
                element={<SeeVocabsQuestions />}
              />
              <Route path="/faqs/:id" element={<FAQ />} />
              <Route path="/faq-questions" element={<FaqQuestions />} />
              <Route path="/grammar/:id" element={<GrammarRC />} />
              <Route path="/grammar-questions" element={<GrammarQuestion />} />
              {/* extra pages */}

              <Route path="/extra-details" element={<ExtraDetailsPage />} />
              {/* buy course pages */}
              <Route path="/" element={<WithBuyCourseContext />}>
                <Route
                  path="/buyCourseFirstPage/:courseId"
                  element={<BuyCourseFirstPage />}
                />
                <Route path="/" element={<WithBuyCourseLayout />}>
                  <Route
                    path="/buyCourseSecondPage"
                    element={<BuyCourseSecondPage />}
                  />
                  <Route
                    path="/buyCourseThirdPage"
                    element={<BuyCourseThirdPage />}
                  />
                  <Route
                    path="/buyCourseFourthPage"
                    element={<BuyCourseFourthPage />}
                  />
                </Route>
              </Route>
              {/* extra pages */}
              <Route path="/extra/crossword" element={<CrossWordTable />} />
              {/*  chat pages */}
              <Route path="/chatlist" element={<ChatListPage />} />
              <Route path="/chat/:group" element={<ChatPage />} />
              {/* bookmark foolder */}
              <Route path="/bookmarks" element={<BookMarkFolders />} />
              <Route path="/folder-questions/:bid" element={<FolderQuestions />} />
            </Route>
          </Route>
        </Route>
        {/* End Courses's Routes */}
        {/* <Route path="/test" element={<QuestionsIterator />} /> */}
        {/* <Route path="/test1" element={<QPage />} /> */}
        {/* <Route path="/crossword-test" element={<CrossWordTable />} /> */}
        {/* <Route
          path="/leitners-dashboard-test"
          element={<LeitnersDashboard />}
        /> */}
        <Route path="/test-v" element={<TestVoiceAPI />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default RouterConfig;

function PrivateOutlet() {
  const { token } = useLoginContext();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

function WithLayout1() {
  return (
    <Layout>
      {/* <Routes> */}
      <Outlet />
      {/* </Routes> */}
    </Layout>
  );
}

function WithLayout2() {
  return (
    <Layout2>
      {/* <Routes> */}
      <Outlet />
      {/* </Routes> */}
    </Layout2>
  );
}

function InClassRoom() {
  return (
    <ClassRoomProvider>
      <Outlet />
    </ClassRoomProvider>
  );
}

function WithBuyCourseContext() {
  return (
    <BuyCourseContext>
      <Outlet />
    </BuyCourseContext>
  );
}

function WithBuyCourseLayout() {
  return (
    <BuyCourseLayout>
      <Outlet />
    </BuyCourseLayout>
  );
}

function QPage(props) {
  return <QuestionContainer {...data_conversation_recordVoice} />;
}
function Questions() {
  return (
    <QuestionsIterator
      questions={questionsData[0].questions}
      typeId={questionsData[0].id}
      baseAnsweringType={0}
    />
  );
}
// YNB Questions

var data_choose = {
  id: 113,
  title: ".Complete the sentences with an adjectives",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 0,
    answeringType: 0,
    options: [
      "delicious",
      "disgusting",
      "crowded",
      "basic",
      "sunny",
      "nice",
      "cloudy",
      "comfortable",
      "friendly",
      "unhelpful",
    ],
    data: [
      {
        id: 12312,
        body: "1. We loved room . It was very ##.",
      },
      {
        id: 12313,
        body: "9. It was ## and we didn't see the sun at all.",
      },
      {
        id: 12314,
        body: "8. The town was ## . All the houses had flowers on the balcony and were painted different colors.",
      },
      {
        id: 12315,
        body: "7. The other people on the trip were very ## We hope to meet some of them again in the future.",
      },
      {
        id: 12316,
        body: "6. There wasn't much in the apartment . It was very ## . It didn't even have a refrigerator",
      },
      {
        id: 12317,
        body: "5. The staff at the hotel was horrible . They were vert ## . and sometimes very rude.",
      },
      {
        id: 12318,
        body: "4. We ate very well . The food was  ## ",
      },
      {
        id: 12319,
        body: "3. a lot of people everywhere . It was very ##",
      },
      {
        id: 12320,
        body: "2. The weather was warm ## everyday.\r\n\r\n",
      },
      {
        id: 12321,
        body: "10. Our first meal was ##. So we didn't eat at the hotel again.",
      },
    ],
  },
};
var data_choose_image = {
  id: 135,
  title: "Match the words and pictures.",
  content: '<h1 class="ql-align-right ql-direction-rtl">Fish and seafood</h1>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 1,
    answeringType: 0,
    options: ["squid", "crab", "mussels", "shrimp", "salmon", "tuna"],
    data: [
      {
        id: 37804,
        body: "uploads/questionmedia/da77c385-76ba-4c31-bd8f-603be8587e81.jpg",
      },
      {
        id: 37805,
        body: "uploads/questionmedia/10e0e3e1-34c9-49a3-9f9a-e29d57d1bb34.jpg",
      },
      {
        id: 37806,
        body: "uploads/questionmedia/6ec1ede3-4273-4592-8aa8-942a66c51e26.jpg",
      },
      {
        id: 37807,
        body: "uploads/questionmedia/9fff0df9-6f4b-48f3-a0ed-3ce230e6dd22.jpg",
      },
      {
        id: 37808,
        body: "uploads/questionmedia/0476c12f-294d-4c25-aa67-5d975cd4f064.jpg",
      },
      {
        id: 37809,
        body: "uploads/questionmedia/5949aa30-2861-4300-80d0-1fc6b059ac56.jpg",
      },
    ],
  },
};

var data_chooseRepeat = {
  id: 120,
  title: "Complete the sentences with so/because/although/but",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 0,
    answeringType: 1,
    options: ["because", "Although", "so", "but"],
    data: [
      {
        id: 12378,
        body: "1. \r\na) Linda ran to train station ## she was very late.",
      },
      {
        id: 12379,
        body: "b) Linda was very late ## , she ran to the train station.",
      },
      {
        id: 12380,
        body: "c) ## Linda was ran to the train station , she was too late and she missed the train.",
      },
      {
        id: 12381,
        body: "2. \r\na) ## we couldn't go out , we had a really good afternoon at home.",
      },
      {
        id: 12382,
        body: "b) It was raining ## we stayed at home .",
      },
      {
        id: 12383,
        body: "c) We stayed at home Last sunday ## it was training.",
      },
      {
        id: 12384,
        body: "3. \r\na) The tickets were really expensive ## they managed to sell them in an hour.",
      },
      {
        id: 12385,
        body: "b) ## the tickets were really expensive , they sold them all in an hour.",
      },
      {
        id: 12386,
        body: "c) They sold the tickets quickly ## the concert was very popular.",
      },
    ],
  },
};
var data_chooseRepeat_image = {
  id: 120,
  title: "Complete the sentences with so/because/although/but",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 1,
    answeringType: 1,
    options: ["because", "Although", "so", "but"],
    data: [
      {
        id: 37804,
        body: "uploads/questionmedia/da77c385-76ba-4c31-bd8f-603be8587e81.jpg",
      },
      {
        id: 37805,
        body: "uploads/questionmedia/10e0e3e1-34c9-49a3-9f9a-e29d57d1bb34.jpg",
      },
      {
        id: 37806,
        body: "uploads/questionmedia/6ec1ede3-4273-4592-8aa8-942a66c51e26.jpg",
      },
      {
        id: 37807,
        body: "uploads/questionmedia/9fff0df9-6f4b-48f3-a0ed-3ce230e6dd22.jpg",
      },
      {
        id: 37808,
        body: "uploads/questionmedia/0476c12f-294d-4c25-aa67-5d975cd4f064.jpg",
      },
      {
        id: 37809,
        body: "uploads/questionmedia/5949aa30-2861-4300-80d0-1fc6b059ac56.jpg",
      },
    ],
  },
};

var data_typing = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 0,
    answeringType: 2,
    options: [],
    data: [
      {
        id: 12387,
        body: "1. I didn't have any breakfast beacuse i didn't have time. ( so) \r\nI didn't have time , ##",
      },
      {
        id: 12388,
        body: "2. I had a great vacation in Egypt although I can't speak Arabic . ( but) \r\nI can't speak Arabic ##",
      },
      {
        id: 12389,
        body: "3. I don't really like Ryan , but I went to lunch with him ( although) I went to lunch with Ryan ##",
      },
      {
        id: 12390,
        body: "4. I called the police because the door to my apartment was open.( so) The door to my apartment was open ##",
      },
      {
        id: 12391,
        body: "5. Jim has a lot of money , but he's really cheap ( although) \r\nJim's really cheap ##",
      },
      {
        id: 12392,
        body: "6. Marry couldn't find her bag , so she canceled her credit cards . ( because)\r\nMarry canceled her credit cards ##",
      },
    ],
  },
};
var data_typing_image = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 1,
    answeringType: 2,
    options: [],
    data: [
      {
        id: 37804,
        body: "uploads/questionmedia/da77c385-76ba-4c31-bd8f-603be8587e81.jpg",
      },
      {
        id: 37805,
        body: "uploads/questionmedia/10e0e3e1-34c9-49a3-9f9a-e29d57d1bb34.jpg",
      },
      {
        id: 37806,
        body: "uploads/questionmedia/6ec1ede3-4273-4592-8aa8-942a66c51e26.jpg",
      },
      {
        id: 37807,
        body: "uploads/questionmedia/9fff0df9-6f4b-48f3-a0ed-3ce230e6dd22.jpg",
      },
      {
        id: 37808,
        body: "uploads/questionmedia/0476c12f-294d-4c25-aa67-5d975cd4f064.jpg",
      },
      {
        id: 37809,
        body: "uploads/questionmedia/5949aa30-2861-4300-80d0-1fc6b059ac56.jpg",
      },
    ],
  },
};

var data_recording = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 0,
    answeringType: 3,
    options: [],
    data: [
      {
        id: 12387,
        body: "1. I didn't have any ## breakfast beacuse i didn't have time. ( so) \r\nI didn't have time , ##",
      },
      {
        id: 12388,
        body: "2. I had a great vacation in Egypt although I can't speak Arabic . ( but) \r\nI can't speak Arabic ##",
      },
      {
        id: 12389,
        body: "3. I don't really like Ryan , but I went to lunch with him ( although) I went to lunch with Ryan ##",
      },
      {
        id: 12390,
        body: "4. I called the police because the door to my apartment was open.( so) The door to my apartment was open ##",
      },
      {
        id: 12391,
        body: "5. Jim has a lot of money , but he's really cheap ( although) \r\nJim's really cheap ##",
      },
      {
        id: 12392,
        body: "6. Marry couldn't find her bag , so she canceled her credit cards . ( because)\r\nMarry canceled her credit cards ##",
      },
    ],
  },
};
var data_recording_image = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 1,
    answeringType: 3,
    options: [],
    data: [
      {
        id: 37804,
        body: "uploads/questionmedia/da77c385-76ba-4c31-bd8f-603be8587e81.jpg",
      },
      {
        id: 37805,
        body: "uploads/questionmedia/10e0e3e1-34c9-49a3-9f9a-e29d57d1bb34.jpg",
      },
      {
        id: 37806,
        body: "uploads/questionmedia/6ec1ede3-4273-4592-8aa8-942a66c51e26.jpg",
      },
      {
        id: 37807,
        body: "uploads/questionmedia/9fff0df9-6f4b-48f3-a0ed-3ce230e6dd22.jpg",
      },
      {
        id: 37808,
        body: "uploads/questionmedia/0476c12f-294d-4c25-aa67-5d975cd4f064.jpg",
      },
      {
        id: 37809,
        body: "uploads/questionmedia/5949aa30-2861-4300-80d0-1fc6b059ac56.jpg",
      },
    ],
  },
};

var data_sorting = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 0,
    answeringType: 4,
    options: [],
    data: [
      {
        id: 12387,
        body: "1. I didn't have any breakfast beacuse i didn't have time. ( so) \r\nI didn't have time , ##",
      },
      {
        id: 12388,
        body: "2. I had a great vacation in Egypt although I can't speak Arabic . ( but) \r\nI can't speak Arabic ##",
      },
      {
        id: 12389,
        body: "3. I don't really like Ryan , but I went to lunch with him ( although) I went to lunch with Ryan ##",
      },
      {
        id: 12390,
        body: "4. I called the police because the door to my apartment was open.( so) The door to my apartment was open ##",
      },
      {
        id: 12391,
        body: "5. Jim has a lot of money , but he's really cheap ( although) \r\nJim's really cheap ##",
      },
      {
        id: 12392,
        body: "6. Marry couldn't find her bag , so she canceled her credit cards . ( because)\r\nMarry canceled her credit cards ##",
      },
    ],
  },
};
var data_sorting_image = {
  id: 121,
  title: "Rewrite the sentences and use the words from the parentheses.",
  content: '<p class="ql-align-right ql-direction-rtl"><br></p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  difficulty: 0,
  questionType: 0,
  data: {
    contentType: 1,
    answeringType: 4,
    options: [],
    data: [
      {
        id: 37804,
        body: "uploads/questionmedia/da77c385-76ba-4c31-bd8f-603be8587e81.jpg",
      },
      {
        id: 37805,
        body: "uploads/questionmedia/10e0e3e1-34c9-49a3-9f9a-e29d57d1bb34.jpg",
      },
      {
        id: 37806,
        body: "uploads/questionmedia/6ec1ede3-4273-4592-8aa8-942a66c51e26.jpg",
      },
      {
        id: 37807,
        body: "uploads/questionmedia/9fff0df9-6f4b-48f3-a0ed-3ce230e6dd22.jpg",
      },
      {
        id: 37808,
        body: "uploads/questionmedia/0476c12f-294d-4c25-aa67-5d975cd4f064.jpg",
      },
      {
        id: 37809,
        body: "uploads/questionmedia/5949aa30-2861-4300-80d0-1fc6b059ac56.jpg",
      },
    ],
  },
};

// Conversation

const data_conversation_choose = {
  id: 8,
  title: "تست",
  content: "<p><br></p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 1,
  data: {
    answeringType: 0,
    options: ["asdas", "fine", "john", "will", "tom"],
    data: [
      {
        id: 1,
        body: "ajdbhas ##",
        name: null,
      },
      {
        id: 2,
        body: "hi ##",
        name: "tom",
      },
      {
        id: 3,
        body: "hello ##",
        name: "john",
      },
      {
        id: 4,
        body: "how are you ##",
        name: "tom",
      },
      {
        id: 5,
        body: "I'm ##. Thanks ",
        name: "john",
      },
    ],
  },
};

const data_conversation_chooseRepeat = {
  id: 8,
  title: "تست",
  content: "<p><br></p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 1,
  data: {
    answeringType: 1,
    options: ["asdas", "fine", "john", "tom"],
    data: [
      {
        id: 1,
        body: "ajdbhas ##",
        name: null,
      },
      {
        id: 2,
        body: "hi ##",
        name: "tom",
      },
      {
        id: 3,
        body: "hello ##",
        name: "john",
      },
      {
        id: 4,
        body: "how are you ##",
        name: "tom",
      },
      {
        id: 5,
        body: "I'm ##. Thanks ",
        name: "john",
      },
    ],
  },
};

const data_conversation_recordVoice = {
  id: 8,
  title: "تست",
  content: "<p><br></p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 1,
  data: {
    answeringType: 3,
    options: [],
    data: [
      {
        id: 1,
        body: "hello ## ajdbhas ##",
        name: null,
      },
      {
        id: 2,
        body: "hi ##",
        name: "tom",
      },
      {
        id: 3,
        body: "hello ##",
        name: "john",
      },
      {
        id: 4,
        body: "how are you ##",
        name: "tom",
      },
      {
        id: 5,
        body: "I'm ##. Thanks ",
        name: "john",
      },
    ],
  },
};

const data_conversation_typing = {
  id: 8,
  title: "تست",
  content: "<p><br></p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 1,
  data: {
    answeringType: 2,
    options: [],
    data: [
      {
        id: 1,
        body: "ajdbhas ##",
        name: null,
      },
      {
        id: 2,
        body: "hi ##",
        name: "tom",
      },
      {
        id: 3,
        body: "hello ##",
        name: "john",
      },
      {
        id: 4,
        body: "how are you ##",
        name: "tom",
      },
      {
        id: 5,
        body: "I'm ##. Thanks ",
        name: "john",
      },
    ],
  },
};

// MultiChoice

const multiChoice_choose = {
  id: 1579,
  title: "Choose the best answer.",
  content:
    '<p class="ql-align-right ql-direction-rtl">According to the text, what should an ethical consumer probably not buy?</p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 3,
  data: {
    contentType: 0,
    answeringType: 0,
    options: [
      {
        id: 9138,
        content: "a winter coat",
      },
      {
        id: 9137,
        content: "a mobile phone",
      },
      {
        id: 9136,
        content: "cheap clothes",
      },
    ],
  },
};
const multiChoice_chooseRepeat = {
  id: 1579,
  title: "Choose the best answer.",
  content:
    '<p class="ql-align-right ql-direction-rtl">According to the text, what should an ethical consumer probably not buy?</p>',
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 3,
  data: {
    contentType: 0,
    answeringType: 1,
    options: [
      {
        id: 9138,
        content: "a winter coat",
      },
      {
        id: 9137,
        content: "a mobile phone",
      },
      {
        id: 9136,
        content: "cheap clothes",
      },
    ],
  },
};
const multiChoice_choose_image = {
  id: 4,
  title: "tesst",
  content: "<p>testa fasofnas dkasn dk</p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 3,
  data: {
    contentType: 1,
    answeringType: 0,
    options: [
      {
        id: 12,
        content:
          "/uploads/questionmedia/b276693a-a5ff-4c64-8359-494abeb065f6.jpg",
      },
      {
        id: 11,
        content:
          "/uploads/questionmedia/6da42130-521d-40c0-88c8-af2287a73aa9.jpg",
      },
    ],
  },
};
const multiChoice_chooseRepeat_image = {
  id: 4,
  title: "tesst",
  content: "<p>testa fasofnas dkasn dk</p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 3,
  data: {
    contentType: 1,
    answeringType: 1,
    options: [
      {
        id: 12,
        content:
          "/uploads/questionmedia/b276693a-a5ff-4c64-8359-494abeb065f6.jpg",
      },
      {
        id: 11,
        content:
          "/uploads/questionmedia/6da42130-521d-40c0-88c8-af2287a73aa9.jpg",
      },
    ],
  },
};

// Phrase
const phrase = {
  id: 20,
  title: "Put the words in order to make sentences.",
  content: "<p><br></p>",
  voiceUrl: "",
  videoUrl: "",
  imageUrl: "",
  shouldTakeVoice: true,
  tryCounter: 0,
  isCorrect: false,
  difficulty: 0,
  questionType: 4,
  data: {
    phrase: ["Didn't", "That", "I", "Sorry", "I'm", "Get", "Still"],
  },
};

/*
 
    <Route
       path="/"
       element={
           <PrivateRoute>
               <LandingPage />
           </PrivateRoute>
   }



       

    function PrivateRoute({ children }) {
        const { token } = useLoginContext();
        return token ? children : <Navigate to="/login" />;
    }


   />
   
   
   
   
   
   
   
   
   {
"status": "1",
"message": "لیست سوالات",
"errors": [],
"data": {
"questions": [
{
"id": 112,
"title": ".Listen to the Mia and Linda about their vacations and answer the  questions.",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 2,
"options": [],
"data": [
{
  "id": 12832,
  "body": "1.her relationship with Joe before they went\r\n##"
},
{
  "id": 12833,
  "body": "8.the cost of lier vacation \r\n##"
},
{
  "id": 12834,
  "body": "7.what they did there\r\n##"
},
{
  "id": 12835,
  "body": "6.Costa Rica \r\n##"
},
{
  "id": 12836,
  "body": "5.going on vacation with a boyfriend\r\n##"
},
{
  "id": 12837,
  "body": "4.photos\r\n##"
},
{
  "id": 12838,
  "body": "3.talking to other travelers. \r\n##"
},
{
  "id": 12839,
  "body": "2.the places where they stayed\r\n##"
},
{
  "id": 12840,
  "body": "9.her next vacation\r\n##"
}
]
}
},
{
"id": 113,
"title": ".Complete the sentences with an adjectives",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 0,
"options": [
"delicious",
"disgusting",
"crowded",
"basic",
"sunny",
"nice",
"cloudy",
"comfortable",
"friendly",
"unhelpful"
],
"data": [
{
  "id": 12312,
  "body": "1. We loved our room . It was very ##."
},
{
  "id": 12313,
  "body": "9. It was ## and we didn't see the sun at all."
},
{
  "id": 12314,
  "body": "8. The town was ## . All the houses had flowers on the balcony and were painted different colors."
},
{
  "id": 12315,
  "body": "7. The other people on the trip were very ## We hope to meet some of them again in the future."
},
{
  "id": 12316,
  "body": "6. There wasn't much in the apartment . It was very ## . It didn't even have a refrigerator"
},
{
  "id": 12317,
  "body": "5. The staff at the hotel was horrible . They were vert ## . and sometimes very rude."
},
{
  "id": 12318,
  "body": "4. We ate very well . The food was  ## "
},
{
  "id": 12319,
  "body": "3. a lot of people everywhere . It was very ##"
},
{
  "id": 12320,
  "body": "2. The weather was warm ## everyday.\r\n\r\n"
},
{
  "id": 12321,
  "body": "10. Our first meal was ##. So we didn't eat at the hotel again."
}
]
}
},
{
"id": 114,
"title": ".Make negative questions",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 2,
"options": [],
"data": [
{
  "id": 12322,
  "body": "1. We stayed at a campsite.\r\n## in a hotel."
},
{
  "id": 12323,
  "body": "2. They bought postcards. \r\n## any souvenirs."
},
{
  "id": 12324,
  "body": "3. The people were unfriendly.\r\n## very helpful."
},
{
  "id": 12325,
  "body": "4. I sunbathed on the beach.\r\n## by the pool.\r\n"
},
{
  "id": 12326,
  "body": "5. We rented bikes.\r\n## a car."
},
{
  "id": 12327,
  "body": "6. He spent a month in Bangkok. \r\n## a week three."
},
{
  "id": 12328,
  "body": "7. Our room was dirty.\r\n ## very clean."
}
]
}
},
{
"id": 116,
"title": "Write the sentences with verbs in parentheses in past continuous.",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 0,
"options": [
"was sitting",
"was snowing",
"were you crying",
"wasn't working",
"was he doing",
"weren't driving fast",
"were laughing",
"were living"
],
"data": [
{
  "id": 12353,
  "body": "1. You ## ( laugh) when I took the photo."
},
{
  "id": 12354,
  "body": "2. It ## (snow) when our plane landed"
},
{
  "id": 12355,
  "body": "3. We ## ( not drive fast) when the accident happend."
},
{
  "id": 12356,
  "body": "4. What ## ( he / do ) when his boss arrived?"
},
{
  "id": 12357,
  "body": "5. Why ## ( you / cry) at the party?"
},
{
  "id": 12358,
  "body": "6. I ## ( sit) on the bus when I saw my boss."
},
{
  "id": 12359,
  "body": "7. They ## ( live) in Brazil when their first child was born."
},
{
  "id": 12360,
  "body": "8. He didn't call you because his cellphone ## ( not work)"
}
]
}
},
{
"id": 117,
"title": "Complete the story with verbs in simple past or continuous.",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 0,
"options": [
"took",
"was laughing",
"noticed",
"got",
"said",
"went",
"came",
"was speaking",
"was passing",
"stopped",
"looked",
"was sitting",
"went",
"was smiling",
"decided",
"were having"
],
"data": [
{
  "id": 12361,
  "body": "Last summer I ## (go) to Los Angeles to stay with my cousin for a few weeks. One afternoon , we \r\n## (have) lunch in a nice resturant when my cousin ## (get) a cell on her cell phone and went outside to walk . While she ## (speak) to her friend . I suddenly ## (notice) a man in a black hat who ## (sit) at the next table. It was the actor Jonny Depp! He was alone , and I ## ( decide) to take my chance . So i got up and ## ( go ) to his table . \"Excuse me , could I have my photo taken with you? \" I asked. He  ## ( say) yes. So i ## ( stop) the waitress who ## ( pass) by and gave her my camera. She ## (take) the photo of me and Johnny . I thanksed them both and then I returned to my table . When my cousin ## (come) back , I ## ( smile) . \" why are you looking so happy? \" she asked . \" I had my photo taken with Johnny Depp\" \r\n\"Johnny Depp? Where is he?\"\r\n\" He's sitting over there, Look!\"\r\nShe turned around to look and then started to laugh \" That's not Johnny Depp\"I ## ( look) at the man in the black hat - he ## ( laugh) too!\r\n"
}
]
}
},
{
"id": 118,
"title": ".Complete the sentences with in / at / on about time and place.",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 1,
"options": [],
"data": []
}
},
{
"id": 120,
"title": "Complete the sentences with so/because/although/but",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 1,
"options": [
"because",
"Although",
"so",
"but"
],
"data": [
{
  "id": 12378,
  "body": "1. \r\na) Linda ran to train station ## she was very late."
},
{
  "id": 12379,
  "body": "b) Linda was very late ## , she ran to the train station."
},
{
  "id": 12380,
  "body": "c) ## Linda was ran to the train station , she was too late and she missed the train."
},
{
  "id": 12381,
  "body": "2. \r\na) ## we couldn't go out , we had a really good afternoon at home."
},
{
  "id": 12382,
  "body": "b) It was raining ## we stayed at home ."
},
{
  "id": 12383,
  "body": "c) We stayed at home Last sunday ## it was training."
},
{
  "id": 12384,
  "body": "3. \r\na) The tickets were really expensive ## they managed to sell them in an hour."
},
{
  "id": 12385,
  "body": "b) ## the tickets were really expensive , they sold them all in an hour."
},
{
  "id": 12386,
  "body": "c) They sold the tickets quickly ## the concert was very popular."
}
]
}
},
{
"id": 121,
"title": "Rewrite the sentences and use the words from the parentheses.",
"content": "<p class=\"ql-align-right ql-direction-rtl\"><br></p>",
"voiceUrl": "",
"videoUrl": "",
"imageUrl": "",
"shouldTakeVoice": true,
"difficulty": 0,
"questionType": 0,
"data": {
"contentType": 0,
"answeringType": 2,
"options": [],
"data": [
{
  "id": 12387,
  "body": "1. I didn't have any breakfast beacuse i didn't have time. ( so) \r\nI didn't have time , ##"
},
{
  "id": 12388,
  "body": "2. I had a great vacation in Egypt although I can't speak Arabic . ( but) \r\nI can't speak Arabic ##"
},
{
  "id": 12389,
  "body": "3. I don't really like Ryan , but I went to lunch with him ( although) I went to lunch with Ryan ##"
},
{
  "id": 12390,
  "body": "4. I called the police because the door to my apartment was open.( so) The door to my apartment was open ##"
},
{
  "id": 12391,
  "body": "5. Jim has a lot of money , but he's really cheap ( although) \r\nJim's really cheap ##"
},
{
  "id": 12392,
  "body": "6. Marry couldn't find her bag , so she canceled her credit cards . ( because)\r\nMarry canceled her credit cards ##"
}
]
}
}
]
}
}
   
   
   
   
   
   
   
   
   */
