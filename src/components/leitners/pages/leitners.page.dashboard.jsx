import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { leitners_apiCalls } from "../../../core/services/agent";
import { apiCaller, useApi } from "../../../core/custom-hooks/useApi";
import useToolbarPosition from "../../toolbar/useToolbarPosition.hook";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

import {
  Box,
  Typography,
  Tab,
  Tabs,
  Dialog,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddToLeitner from "../../toolbar/components/addToLeitner.component";

// app tour
import AppTour from "../../appTour/appTours.component";
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import { fileBaseUrl } from "../../../core/services/baseUrl";

const LeitnersPageMain = (props) => {
  //// Video Play Icon
  const { right, top } = useToolbarPosition();
  /////////////
  const { handleOpen, handleClose } = useLoadingContext();
  const navigate = useNavigate();

  const get_leitnerDashboardData = () => {
    apiCaller({
      api: leitners_apiCalls.apiCall_getDashboardInfo,
      toastMessage: true,
      onErrorMessage: "دریافت اطلاعات لایتنر با خطا مواجه شد .",
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        set_leitnerDashboardData(resp.data?.data);
      },
    });
  };
  const [leitnerDashboardData, set_leitnerDashboardData] = useState();
  useEffect(get_leitnerDashboardData, []);

  const handleGotoVocabsLeitner = () => {
    if (leitnerDashboardData?.remainingVocabs === 0) {
      toast.warn("لیست لایتنر لغات خالی میباشد .");
      return;
    }
    navigate("/leitner?isVocab=true");
  };
  const handleGotoGrammarsLeitner = () => {
    if (leitnerDashboardData?.remainingGrammars === 0) {
      toast.warn("لیست لایتنر گرامرها خالی میباشد .");
      return;
    }
    navigate("/leitner?isVocab=false");
  };

  const [openHowToUseLeitner, set_openHowToUseLeitner] = useState(false);
  const handle_openHowToUseLeitner = () => {
    set_openHowToUseLeitner(!openHowToUseLeitner);
  };

  //// Tabbing Codes
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // Add To Leitner
  const [openLeitnerDialog, set_openLeitnerDialog] = useState(false);
  const handle_openLeitnerDialog = () => {
    set_openLeitnerDialog(!openLeitnerDialog);
  };

  return (
    <section className="m-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      <div className="m-0 my-3 p-0 d-flex flex-row justify-content-start align-items-center">
        <span
          style={{
            position: "absolute",
            right,
            top,
            zIndex: "10",
          }}
          className="m-0 p-0 d-flex flex-column justify-content-start align-items-center"
        >
          <PlayCircleFilledIcon
            id="openHowToUseLeitner"
            onClick={handle_openHowToUseLeitner}
            color="primary"
            fontSize="large"
            className="cursor-pointer"
          />
          <span className="m-0 p-0 text-muted" style={{ fontSize: "0.5rem" }}>
            آموزش استفاده از لایتنر
          </span>
        </span>
        <Dialog open={openHowToUseLeitner} onClose={handle_openHowToUseLeitner}>
          <div
            className="m-0 p-3 d-flex flex-row justify-content-center align-items-center"
            style={{ minWidth: "calc(370px - 2rem)" }}
          >
            <ReactPlayer url={fileBaseUrl + "/tutorial/leitner.mp4"} controls />
          </div>
        </Dialog>
        <AppTour page="leitnerPage" />
      </div>
      <div className="leitners-info m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
        {/* Tabs Start */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="w-100"
              sx={{
                " .MuiTabs-flexContainer": {
                  justifyContent: "space-around !important",
                  "& button": {
                    width: "49%",
                  },
                },
              }}
            >
              <Tab label="لغات" {...a11yProps(0)} />
              <Tab label="گرامر ها" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/*********/}
            <div
              style={{ boxShadow: "0 3px 10px 3px #ebebeb" }}
              className="my-3 m-0 p-3 box-rounded-1 d-flex flex-column justify-content-start align-items-stretch"
            >
              <div className="d-flex flex-row   justify-content-between align-items-center">
                <span className="fs-6"> لغات تکمیل شده : </span>
                <span className="fs-6">
                  {leitnerDashboardData?.completedVocabs}{" "}
                </span>
              </div>
              <div className="d-flex flex-row my-4  justify-content-between align-items-center">
                <span className="fs-6"> لغات باقیمانده : </span>
                <span className="fs-6">
                  {leitnerDashboardData?.remainingVocabs}{" "}
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <span className="fs-6"> لغت های امروز : </span>
                <span className="fs-6">
                  {leitnerDashboardData?.todayVocabs}{" "}
                </span>
              </div>
              {/*  */}
              <div className="my-3 mt-5 m-0 p-0  d-flex flex-row justify-content-center align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGotoVocabsLeitner}
                  size="large"
                  className="py-3 px-5 w-100"
                >
                  مشاهده لایتنر لغات
                </Button>
              </div>
              {/*  */}
            </div>
            {/*********/}
            {/* <div className="my-3 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
              <div
                style={{ boxShadow: "0 3px 10px 3px #ebebeb" }}
                className="d-flex flex-row p-3 box-rounded-1  justify-content-between align-items-center"
              >
                <span className="fs-6"> لغات تکمیل شده </span>
                <span className="fs-6">
                  {" "}
                  {leitnerDashboardData?.completedVocabs}{" "}
                  <ChevronLeftIcon color="primary" />
                </span>
              </div>
              <div
                style={{ boxShadow: "0 3px 10px 3px #ebebeb" }}
                className="d-flex flex-row my-4 p-3 box-rounded-1  justify-content-between align-items-center"
              >
                <span className="fs-6"> لغات باقیمانده </span>
                <span className="fs-6">
                  {" "}
                  {leitnerDashboardData?.remainingVocabs}{" "}
                  <ChevronLeftIcon color="primary" />
                </span>
              </div>
              <div
                style={{ boxShadow: "0 3px 10px 3px #ebebeb" }}
                className="d-flex flex-row p-3 box-rounded-1  justify-content-between align-items-center"
              >
                <span className="fs-6"> لغت های امروز : </span>
                <span className="fs-6">
                  {" "}
                  {leitnerDashboardData?.todayVocabs}{" "}
                  <ChevronLeftIcon color="primary" />
                </span>
              </div>
              <div className="my-3 m-0 p-0  d-flex flex-row justify-content-center align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGotoVocabsLeitner}
                >
                  مشاهده لایتنر لغات
                </Button>
              </div>
            </div> */}
          </TabPanel>
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <TabPanel value={value} index={1}>
            <div
              style={{ boxShadow: "0 3px 10px 3px #ebebeb" }}
              className="p-3 box-rounded-1 my-3 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch"
            >
              <div className="d-flex flex-row   justify-content-between align-items-center">
                <span className="fs-6"> گرامر های تکمیل شده : </span>
                <span className="fs-6 d-flex flex-row justify-content-center align-items-end">
                  {leitnerDashboardData?.completedGrammars}
                </span>
              </div>
              <div className="d-flex my-4 flex-row  justify-content-between align-items-center">
                <span className="fs-6"> گرامر های باقیمانده : </span>
                <span className="fs-6 d-flex flex-row justify-content-center align-items-end">
                  {leitnerDashboardData?.remainingGrammars}
                </span>
              </div>
              <div className="d-flex flex-row  justify-content-between align-items-center">
                <span className="fs-6"> گرامر های امروز : </span>
                <span className="fs-6 d-flex flex-row justify-content-center align-items-end">
                  {leitnerDashboardData?.todayGrammars}
                </span>
              </div>
              <div className="my-3 mt-5 m-0 p-0 d-flex flex-row justify-content-center align-items-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGotoGrammarsLeitner}
                  className="w-100 py-3"
                >
                  مشاهده لایتنر گرامر ها
                </Button>
              </div>
            </div>
          </TabPanel>
        </Box>
        {/* Tabs End */}
      </div>
      {/* Add To Leitner */}
      <div className="my-3 mt-5 text-center">
        <Button
          sx={{
            width: "120px",
            height: "120px",
          }}
          className="box-rounded-1"
          color="primary"
          variant="contained"
          onClick={handle_openLeitnerDialog}
        >
          <AddIcon
            sx={{
              fontSize: "50px",
            }}
          />
        </Button>
        <AddToLeitner
          toggle={handle_openLeitnerDialog}
          handleClickLeitner={handle_openLeitnerDialog}
          getLeitnerDashboardData={get_leitnerDashboardData}
          open={openLeitnerDialog}
        />
      </div>
    </section>
  );
};

export default LeitnersPageMain;
