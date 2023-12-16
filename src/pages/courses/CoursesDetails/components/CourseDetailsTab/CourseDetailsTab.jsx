import React, { useEffect, useState } from "react";
import MeetingTab from "./components/MeetingTab/MeetingTab";
import ClassmateTab from "./components/ClassmateTab/ClassmateTab";
import CourseIntroductionTab from "./components/CourseIntroductionTab/CourseIntroductionTab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style/style.scss";

const CourseDetailsTab = (props) => {
  const courseDetailsData = props.detailsData;
  const [value, setValue] = useState(2);

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
          <Box sx={{ p: 3 }}>
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

  return (
    <>
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
                  width: "30%",
                },
              },
            }}
          >
            <Tab label="همکلاسی" {...a11yProps(0)} />
            <Tab label="معرفی دوره" {...a11yProps(1)} />
            <Tab
              label={
                courseDetailsData?.sessions?.length > 0
                  ? `${courseDetailsData?.sessions?.length} جلسه`
                  : "تعداد جلسات"
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ClassmateTab classRoomInfo={props?.detailsData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CourseIntroductionTab
            courseIntroductionData={courseDetailsData?.introduction}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MeetingTab courseData={courseDetailsData?.sessions} />
        </TabPanel>
      </Box>
    </>
  );
};

export default CourseDetailsTab;
