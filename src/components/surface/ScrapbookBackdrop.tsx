import { alpha, Box } from "@mui/material";
import type { FC, ReactNode } from "react";

export const ScrapbookBackdrop: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={(theme) => ({
      position: "relative",
      isolation: "isolate",
      minHeight: "100vh",
      overflowX: "hidden",
      overflowY: "hidden",
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.scrapbook.desk,
      backgroundImage: `
        linear-gradient(${alpha(theme.palette.scrapbook.blue, 0.13)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)}),
        linear-gradient(90deg, ${alpha(theme.palette.scrapbook.blue, 0.13)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)}),
        linear-gradient(${alpha(theme.palette.scrapbook.blue, 0.065)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)}),
        linear-gradient(90deg, ${alpha(theme.palette.scrapbook.blue, 0.065)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)})
      `,
      backgroundPosition: theme.spacing(-0.125, -0.125),
      backgroundSize: {
        xs: `${theme.spacing(12)} ${theme.spacing(12)}, ${theme.spacing(12)} ${theme.spacing(12)}, ${theme.spacing(3)} ${theme.spacing(3)}, ${theme.spacing(3)} ${theme.spacing(3)}`,
        md: `${theme.spacing(15)} ${theme.spacing(15)}, ${theme.spacing(15)} ${theme.spacing(15)}, ${theme.spacing(3)} ${theme.spacing(3)}, ${theme.spacing(3)} ${theme.spacing(3)}`,
      },
      "::before": {
        position: "fixed",
        zIndex: -1,
        width: { xs: 190, md: 280 },
        height: { xs: 190, md: 280 },
        content: '""',
        borderTopWidth: 4,
        borderTopStyle: "dashed",
        borderTopColor: alpha(theme.palette.scrapbook.red, 0.32),
        borderRightWidth: 4,
        borderRightStyle: "dashed",
        borderRightColor: alpha(theme.palette.scrapbook.red, 0.32),
        borderBottomWidth: 4,
        borderBottomStyle: "dashed",
        borderBottomColor: alpha(theme.palette.scrapbook.red, 0.32),
        borderLeftWidth: 4,
        borderLeftStyle: "dashed",
        borderLeftColor: alpha(theme.palette.scrapbook.red, 0.32),
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
        borderBottomLeftRadius: "50%",
        top: -110,
        right: -90,
        transform: "rotate(16deg)",
      },
      "::after": {
        position: "fixed",
        zIndex: -1,
        width: 240,
        height: 64,
        content: '""',
        left: -68,
        bottom: 44,
        backgroundColor: alpha(theme.palette.scrapbook.yellow, 0.3),
        borderTopWidth: 1,
        borderTopStyle: "dashed",
        borderTopColor: alpha(theme.palette.scrapbook.ink, 0.18),
        borderRightWidth: 1,
        borderRightStyle: "dashed",
        borderRightColor: alpha(theme.palette.scrapbook.ink, 0.18),
        borderBottomWidth: 1,
        borderBottomStyle: "dashed",
        borderBottomColor: alpha(theme.palette.scrapbook.ink, 0.18),
        borderLeftWidth: 1,
        borderLeftStyle: "dashed",
        borderLeftColor: alpha(theme.palette.scrapbook.ink, 0.18),
        transform: "rotate(-12deg)",
      },
    })}
  >
    {children}
  </Box>
);
