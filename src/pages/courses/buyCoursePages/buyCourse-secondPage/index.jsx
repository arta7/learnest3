import React, { useState, useEffect } from "react";
import {
  useBuyCourseState,
  useBuyCourseDispatch,
} from "../../../../core/contexts/buyCourseContext/buyCourseContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import * as actions from "../../../../core/contexts/buyCourseContext/actions";
import { buyCourse_apiCalls } from "../../../../core/services/agent";
import { useNavigate, useParams } from "react-router";
import { Button, Dialog, IconButton } from "@mui/material";
import { initialState } from "../../../../core/contexts/buyCourseContext/initialState";
import { weekdaysEnum } from "../../../../core/enums";
import InfoIcon from "@mui/icons-material/Info";

const weekdays = weekdaysEnum;

const BuyCourseSecondPage = (props) => {
  const navigate = useNavigate();
  const { dispatchFactor } = useBuyCourseDispatch();
  const { factor } = useBuyCourseState();

  const [suggestedDates, set_suggestedDates] = useState();

  useEffect(() => {
    if (factor.courseId === 0) {
      navigate(-1);
    }

    dispatchFactor({ type: actions.SETSTEP, payload: 1 });

    const { data, status } = apiCaller({
      api: buyCourse_apiCalls.apiCall_getSuggestedstartdateforcourse,
      apiArguments: factor.courseId,
      toastMessage: false,
      onSuccess: (resp) => {
        set_suggestedDates(resp?.data?.data);
        dispatchFactor({
          type: actions.SETWEEKDAYS,
          payload: parseInt(resp?.data?.data[0].weekDay),
        });
        dispatchFactor({
          type: actions.SETSTARTDATE,
          payload: resp?.data?.data[0].dates[0]?.date.toString(),
        });
      },
    });
  }, []);

  const handleGotoThirdPage = () => {
    navigate("/buyCourseThirdPage");
  };

  ////
  const handleWeekDayChange = (e) => {
    const { id } = e.target;
    dispatchFactor({ type: actions.SETWEEKDAYS, payload: parseInt(id) });
  };
  const handleStartDateChange = (e) => {
    const { id } = e.target;
    dispatchFactor({ type: actions.SETSTARTDATE, payload: id.toString() });
  };

  const gotoNextStep = () => {
    dispatchFactor({ type: actions.SETSTEP, payload: 2 });
    navigate("/buyCourseThirdPage");
  };

  const [showExplanationsDialog, set_showExplanationsDialog] = useState(false);
  const handleShowExplanationsDialog = () => {
    set_showExplanationsDialog(!showExplanationsDialog);
  };

  return (
    <section className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <div className="m-0 p-0 mt-3 d-flex flex-row justify-content-between align-items-center">
        <h6 className="mt-3 ">انتخاب روز‌ های هفته</h6>
        <IconButton
          onClick={handleShowExplanationsDialog}
          className="d-flex flex-column justify-content-start align-items-center"
        >
          <InfoIcon color="primary" />
          <span className="fs-9">توضیحات</span>
        </IconButton>
        <Dialog
          open={showExplanationsDialog}
          onClose={handleShowExplanationsDialog}
        >
          <div
            style={{ minWidth: "300px", minHeight: "200px" }}
            className="m-0 p-3 d-flex flex-column justify-content-start align-items-start"
          >
            با انتخاب روزهای هفته ، جلسات هر دوره در روز های انتخاب شده توسط شما
            باز خواهند شد و در روزهای دیگر هفته جلسات جدید قفل خواهند یود . در
            صورت تمایل به باز شدن یک جلسه‌ی جدید در هر روز هفته و حضور روزانه در
            دوره ها، گزینه همه روزه را انتخاب نمایید .
          </div>
        </Dialog>
      </div>
      <div className="select-weekdays m-0 p-0 my-2 d-flex flex-row justify-content-start align-items-center flex-wrap">
        {suggestedDates?.length > 0 &&
          suggestedDates?.map((item, index) => (
            <label
              className="col-6 m-0 p-0 my-1 d-flex flex-row justify-content-start align-items-center"
              htmlFor={item.weekDay}
              key={item.weekDay}
            >
              <input
                onChange={handleWeekDayChange}
                checked={factor.weekDays === item.weekDay}
                id={item.weekDay}
                className=""
                type="radio"
                name="weekday"
              />
              <span className="mx-2">{weekdays[item.weekDay]}</span>
            </label>
          ))}
      </div>
      <>
        <h6 className="mt-3 ">انتخاب تاریخ شروع کلاس</h6>
        <div className="select-startDate m-0 p-0 my-2 d-flex flex-row justify-content-start align-items-center flex-wrap">
          {suggestedDates?.find(
            (itemm) => parseInt(itemm?.weekDay) === factor.weekDays
          )?.dates?.length > 0 &&
            suggestedDates
              .find((item) => parseInt(item?.weekDay) === factor.weekDays)
              ?.dates?.map((item, index) => (
                <label
                  className="col-6 m-0 p-0 my-1 d-flex flex-row justify-content-start align-items-center"
                  htmlFor={item.date}
                  key={item.date}
                >
                  <input
                    onChange={handleStartDateChange}
                    checked={factor?.classRoomConfig.startDate === item.date}
                    id={item.date}
                    className=""
                    type="radio"
                    name="startDate"
                  />
                  <span className="mx-2">{item.persianDate}</span>
                </label>
              ))}
        </div>
      </>
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "800px",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        className=" py-3 mx-auto d-flex flex-row justify-content-center align-items-center"
      >
        <Button
          style={{
            width: "calc(100% - 2rem)",
          }}
          className="py-2"
          variant="contained"
          color="primary"
          onClick={gotoNextStep}
        >
          مرحله بعد
        </Button>
      </div>
    </section>
  );
};

export default BuyCourseSecondPage;
