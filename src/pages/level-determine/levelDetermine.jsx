import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styles.css";
import LevelDetermineItemBg from "../../assets/img/level-determine-item.png";
import { placement_apiCalls } from "../../core/services/agent";
import { toast } from "react-toastify";
import { LevelDeterminePic, lightnessEnum } from "../../components/icons/icons";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { apiCaller } from "../../core/custom-hooks/useApi";
import { Button, Dialog } from "@mui/material";
import LevelDetermineItem from "./levelDetermineItem.component";
import LevelDetermineDescription from "./levelDetermineDescription.component";
import { useUserProfileContext } from "../../core/contexts/profile/profileProvider";

// const LevelDetermineItem = ({
//   id,
//   title,
//   totalQuestoins,
//   responseTime,
//   onClick,
// }) => {
//   const navigate = useNavigate();
//   const goToLevelsPage = () => {
//     if (onClick && id) onClick(id);
//     else {
//       navigate("/level-determine-exam?id=description");
//     }
//   };

//   return (
//     <div
//       dir="rtl"
//       onClick={goToLevelsPage}
//       className="level-determine-item m-0 p-0 pe-3 pt-2 d-flex flex-column justify-content-start align-items-stretch"
//     >
//       <div className="d-flex flex-row justify-content-between align-items-center">
//         <span className="ms-2">
//           {`${totalQuestoins ? totalQuestoins : ""}`}
//         </span>
//         <span
//           className={
//             "fs-5 fw-bold" +
//             (id !== null && typeof id !== "undefined"
//               ? " "
//               : " mx-auto text-center")
//           }
//         >
//           {title ? title : ""}
//         </span>
//       </div>
//       <div className="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
//         <LevelDeterminePic lightness={lightnessEnum.light} />
//         <span dir="ltr" className="mb-2">
//           {responseTime ? `${responseTime} min` : ""}
//         </span>
//       </div>
//     </div>
//   );
// };

const LevelDetermine = (props) => {
  const { profileData } = useUserProfileContext();
  const { handleOpen, handleClose } = useLoadingContext();
  const navigate = useNavigate();
  const [allExams, set_allExams] = useState(null);

  ///////////////////////////////////////
  ////////////////////////////////////
  /////////////////////////////////
  const [showClickedItemInfo, set_showClickedItemInfo] = useState(false);
  const [clickedItemInfo, set_clickedItemInfo] = useState();
  const handleGetTestInfo = async (id) => {
    // console.log(id);
    if (clickedItemInfo?.testId === id) {
      set_showClickedItemInfo(true);
      return;
    }
    apiCaller({
      api: placement_apiCalls.apiCall_getExamDetail,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (response) => {
        set_clickedItemInfo({ testId: id, ...response.data.data });
      },
      onErrorMessage: "دریافت اطلاعات آزمون با خطا مواجه شد .",
    });
  };
  useEffect(() => {
    if (clickedItemInfo?.testId && clickedItemInfo?.responseTime) {
      set_showClickedItemInfo(true);
    }
  }, [clickedItemInfo]);
  const handle_showClickedItemInfo = () => {
    set_showClickedItemInfo(!showClickedItemInfo);
  };

  const goToLevelsPage = () => {
    navigate("/level-determine-exam?id=" + clickedItemInfo?.testId);
    // onClick(clickedItemInfo?.testId);
  };
  //////////////////////////////////
  ////////////////////////////////////
  ///////////////////////////////////////

  useEffect(() => {
    const getData = async () => {
      await placement_apiCalls
        .apiCall_getAll()
        .then((resp) => {
          if (resp.status === 200) {
            set_allExams(resp.data.data);
          }
        })
        .catch((ex) => {
          toast.error("دریافت آزمون ها با خطا مواجه شد.");
        });
    };
    if (!allExams) getData();
  }, []);

  return (
    <section
      dir="ltr"
      className="level-determine m-0 p-3 flex-grow-1 p-0 d-flex flex-row justify-content-start align-items-stretch flex-wrap"
    >
      <div className="col-12 m-0 px-0 mb-2 p-0">
        <LevelDetermineDescription title={`توضیحات`} />
      </div>

      {allExams &&
        allExams.map((item, index) => (
          <div
            key={item.id}
            className={
              (index % 2 === 0 ? "ps-2" : "pe-2") + " col-6 m-0 p-0 my-2"
            }
          >
            <LevelDetermineItem
              onClick={handleGetTestInfo}
              userlevel={profileData?.level}
              {...item}
            />
          </div>
        ))}

      <Dialog open={showClickedItemInfo} onClose={handle_showClickedItemInfo}>
        <div
          style={{ width: "300px", minHeight: "250px" }}
          className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch"
        >
          <div className="m-0 p-0 d-flex flex-row justify-content-start align-items-baseline">
            <span className="">مدت زمان آزمون :</span>
            <span className="ms-1"> {clickedItemInfo?.responseTime} دقیقه</span>
          </div>
          <div className="m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-baseline">
            <span className="">تعداد سوالات : </span>
            <span className="ms-1"> {clickedItemInfo?.totalQuestoins} </span>
          </div>
          <div className="m-0 my-2 p-0 d-flex flex-row justify-content-start align-items-baseline">
            <span className=""> حداقل درصد قبولی : </span>
            <span className="ms-1">
              {clickedItemInfo?.minimumPercentToQualify}
            </span>
          </div>

          <Button
            onClick={goToLevelsPage}
            variant="contained"
            color="primary"
            className="mt-auto"
          >
            شروع آزمون
          </Button>
        </div>
      </Dialog>
    </section>
  );
};

export default LevelDetermine;
