import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { CSSProperties } from "react";

export type ScrapbookPalette = {
  ink: string;
  inkSecondary: string;
  inkDisabled: string;
  blue: string;
  blueDark: string;
  blueSoft: string;
  red: string;
  redDark: string;
  redSoft: string;
  yellow: string;
  yellowPale: string;
  green: string;
  pink: string;
  paper: string;
  paperDeep: string;
  graphPaper: string;
  desk: string;
  shadow: string;
  graphLine: string;
  graphPreimage: string;
  graphImage: string;
  graphReference: string;
};

declare module "@mui/material/styles" {
  interface Palette {
    scrapbook: ScrapbookPalette;
  }

  interface PaletteOptions {
    scrapbook?: ScrapbookPalette;
  }

  interface TypographyVariants {
    emptyState: CSSProperties;
    numericInput: CSSProperties;
  }

  interface TypographyVariantsOptions {
    emptyState?: CSSProperties;
    numericInput?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    emptyState: true;
  }
}

const scrapbook: ScrapbookPalette = {
  ink: "#24435e",
  inkSecondary: "#526779",
  inkDisabled: "#8d948f",
  blue: "#2f6fa7",
  blueDark: "#214f78",
  blueSoft: "#82b2d6",
  red: "#c9575d",
  redDark: "#923b41",
  redSoft: "#e49a9f",
  yellow: "#f4cf55",
  yellowPale: "#fff1a8",
  green: "#dcefdc",
  pink: "#f5d9dc",
  paper: "#fffdf4",
  paperDeep: "#f6edda",
  graphPaper: "#fffefa",
  desk: "#e9dfc9",
  shadow: "#372b1c",
  graphLine: "#616161",
  graphPreimage: "#2979ff",
  graphImage: "#ff3d00",
  graphReference: "#90a4ae",
};

let theme = createTheme({
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Noto Serif Thai", serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
    },
    emptyState: {
      fontFamily: '"Noto Serif Thai", serif',
      fontSize: "1rem",
      fontStyle: "italic",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    numericInput: {
      fontFamily: "monospace",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.4375,
    },
  },
  palette: {
    primary: {
      main: scrapbook.blue,
      dark: scrapbook.blueDark,
      light: scrapbook.blueSoft,
      contrastText: scrapbook.paper,
    },
    secondary: {
      main: scrapbook.red,
      dark: scrapbook.redDark,
      light: scrapbook.redSoft,
    },
    error: {
      main: scrapbook.red,
    },
    background: {
      default: scrapbook.desk,
      paper: scrapbook.paper,
    },
    text: {
      primary: scrapbook.ink,
      secondary: scrapbook.inkSecondary,
      disabled: scrapbook.inkDisabled,
    },
    divider: alpha(scrapbook.ink, 0.28),
    scrapbook,
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
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: { variant: "outlined" },
    },
    MuiCardActionArea: {
      defaultProps: { disableRipple: true },
    },
    MuiSvgIcon: {
      defaultProps: { fontSize: "inherit" },
    },
    MuiCssBaseline: {
      styleOverrides: { "*": { userSelectable: "none" } },
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
