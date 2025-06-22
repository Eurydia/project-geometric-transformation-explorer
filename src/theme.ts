import { alpha, createTheme } from "@mui/material";
import { brown, orange } from "@mui/material/colors";

export const theme = createTheme({
  typography: { fontFamily: "Noto Serif Thai; serif" },
  palette: {
    primary: brown,
    text: { primary: brown[900], secondary: brown[500] },
    background: { paper: alpha(orange[50], 0.1) },
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
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
