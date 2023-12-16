import React, { useState, useEffect } from "react";

// import { createMuiTheme, ThemeProvider } from '@mui/private-theming';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import colors from "../../assets/styles/variables/_colors.module.scss";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors["main-color-1"],
      dark: colors["main-color-1-dark"],
      light: colors["main-color-1-light"],
      contrastText: colors["main-color-1-contrast"],
    },
    primary2: {
      main: colors["main-color-2"],
      dark: colors["main-color-2-dark"],
      light: colors["main-color-2-light"],
      contrastText: colors["main-color-2-contrast"],
    },
    error: {
      main: "#EF3939",
    },
    success: {
      main: "#139608",
      light: "#1de30c",
    },
    gold: {
      main: "#FFDC64",
    },
    grey: {
      main: grey[800],
      dark: grey[900],
      light: grey[400],
      contrastText: grey[100],
    },
  },
});

const MaterialTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default MaterialTheme;
