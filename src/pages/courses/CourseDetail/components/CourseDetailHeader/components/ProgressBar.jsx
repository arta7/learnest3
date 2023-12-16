import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import "./style/style.css";

const progressTheme = createTheme({
  palette: {
    progressColor: {
      main: "#FFC850",
      light: "",
      dark: "",
      contrastText: "",
    },
    zeroProgressColor: {
      main: "#e9ecef",
      light: "",
      dark: "",
      contrastText: "",
    },
  },
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ThemeProvider theme={progressTheme}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </ThemeProvider>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ProgressBar = (props) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel
          color="progressColor"
          value={props?.percentage}
        />
      </Box>
    </>
  );
};

export default ProgressBar;
