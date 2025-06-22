import { createTheme } from "@mui/material";
import { brown } from "@mui/material/colors";

export const theme = createTheme({
  typography: { fontFamily: "Noto Serif Thai; serif" },
  palette: {
    primary: brown,
    text: {
      primary: brown["800"],
      secondary: brown["A700"],
    },
    // background: { paper: grey["900"] },
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
