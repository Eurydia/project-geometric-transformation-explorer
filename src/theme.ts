import { createTheme, darken } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const theme = createTheme({
  typography: { fontFamily: "Noto Serif Thai; serif" },
  palette: {
    primary: {
      main: green["700"],
    },
    secondary: red,
    background: {
      default: green["200"],
      paper: "#fff",
    },
    text: { primary: darken(green[900], 0.1) },
  },
  components: {
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
        variant: "dense",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      defaultProps: { variant: "outlined" },
    },
  },
});
