import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import colors from "../../../../../assets/styles/variables/_colors.module.scss";
import InviteWithPhoneNumber from "./inviteWithPhoneNumber.component";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #fff;
  color: ${colors["main-color-1"]};
  transition: 0.2s;

  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;

  &:focus {
    color: ${colors["main-color-1-contrast"]};
    border-radius: 0.625rem;
    outline: none;
    background-color: ${colors["main-color-1"]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${colors["main-color-1"]};
    color: ${colors["main-color-1-contrast"]};
  }

  &.${buttonUnstyledClasses.disabled} {
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  // background-color: ${colors["main-color-1"]};
  border: 2px solid ${colors["main-color-1"]};
  border-radius: 0.75rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function CustomizedTabPanel() {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>تک نفره</Tab>
        <Tab>گروهی</Tab>
        {/* <Tab>اتوماتیک</Tab> */}
      </TabsList>
      <TabPanel dir="rtl" value={0} className="fs-6">
        در این حالت شما به صورت انفرادی در جلسات دوره ها حضور خواهید داشت .
      </TabPanel>
      <TabPanel value={1}>
        <InviteWithPhoneNumber />
      </TabPanel>
      <TabPanel value={2} dir="rtl">
        این بخش به زودی در دسترس قرار خواهد گرفت .
      </TabPanel>
    </TabsUnstyled>
  );
}
