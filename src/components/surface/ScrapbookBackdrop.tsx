import { alpha, Box } from "@mui/material";
import type { FC, ReactNode } from "react";

export const ScrapbookBackdrop: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Box
    component="section"
    sx={(theme) => ({
      position: "relative",
      isolation: "isolate",
      minHeight: "100vh",
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.scrapbook.desk,
      backgroundImage: [
        `linear-gradient(${alpha(theme.palette.scrapbook.blue, 0.13)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)})`,
        `linear-gradient(90deg, ${alpha(theme.palette.scrapbook.blue, 0.13)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)})`,
        `linear-gradient(${alpha(theme.palette.scrapbook.blue, 0.065)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)})`,
        `linear-gradient(90deg, ${alpha(theme.palette.scrapbook.blue, 0.065)} ${theme.spacing(0.125)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.125)})`,
      ].join(","),
      backgroundPosition: theme.spacing(-0.125, -0.125),
      backgroundSize: {
        xs: `${theme.spacing(12)} ${theme.spacing(12)}, ${theme.spacing(12)} ${theme.spacing(12)}, ${theme.spacing(3)} ${theme.spacing(3)}, ${theme.spacing(3)} ${theme.spacing(3)}`,
        md: `${theme.spacing(15)} ${theme.spacing(15)}, ${theme.spacing(15)} ${theme.spacing(15)}, ${theme.spacing(3)} ${theme.spacing(3)}, ${theme.spacing(3)} ${theme.spacing(3)}`,
      },
    })}
  >
    {children}
  </Box>
);
