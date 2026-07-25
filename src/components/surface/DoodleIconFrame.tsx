import { alpha, Box } from "@mui/material";
import type { FC, ReactNode } from "react";

export const DoodleIconFrame: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={(theme) => ({
      position: "relative",
      flexGrow: 1,
      flexBasis: 0,
      paddingTop: { xs: theme.spacing(4), md: theme.spacing(6) },
      paddingRight: { xs: theme.spacing(4), md: theme.spacing(6) },
      paddingBottom: { xs: theme.spacing(4), md: theme.spacing(6) },
      paddingLeft: { xs: theme.spacing(4), md: theme.spacing(6) },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })}
  >
    <Box
      aria-hidden
      sx={(theme) => ({
        position: "absolute",
        width: 150,
        maxWidth: "70%",
        aspectRatio: "1",
        backgroundColor: alpha(theme.palette.scrapbook.paper, 0.34),
        borderTopWidth: 2,
        borderTopStyle: "dashed",
        borderTopColor: alpha(theme.palette.scrapbook.ink, 0.27),
        borderRightWidth: 2,
        borderRightStyle: "dashed",
        borderRightColor: alpha(theme.palette.scrapbook.ink, 0.27),
        borderBottomWidth: 2,
        borderBottomStyle: "dashed",
        borderBottomColor: alpha(theme.palette.scrapbook.ink, 0.27),
        borderLeftWidth: 2,
        borderLeftStyle: "dashed",
        borderLeftColor: alpha(theme.palette.scrapbook.ink, 0.27),
        borderTopLeftRadius: "48%",
        borderTopRightRadius: "52%",
        borderBottomRightRadius: "45%",
        borderBottomLeftRadius: "55%",
        transform: "rotate(7deg)",
      })}
    />
    <Box
      sx={(theme) => ({
        zIndex: 1,
        display: "flex",
        color: theme.palette.primary.main,
        fontSize: {
          xs: theme.typography.h2.fontSize,
          md: theme.typography.h1.fontSize,
        },
        filter: `drop-shadow(${theme.spacing(0.375)} ${theme.spacing(0.5)} 0 ${alpha(theme.palette.scrapbook.ink, 0.12)})`,
      })}
    >
      {children}
    </Box>
  </Box>
);
