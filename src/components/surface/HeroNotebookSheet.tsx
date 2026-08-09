import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { FC, ReactNode } from "react";

export const HeroNotebookSheet: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Box
    component="header"
    sx={{
      width: "100%",
      maxWidth: "xl",
      marginRight: "auto",
      marginLeft: "auto",
    }}
  >
    <Paper
      component="section"
      sx={(t) => ({
        paddingY: { xs: t.spacing(5), md: t.spacing(7) },
        paddingX: {
          xs: t.spacing(3),
          sm: t.spacing(5),
          md: t.spacing(8),
        },
        backgroundColor: t.palette.scrapbook.paper,
        backgroundImage: {
          xs: `repeating-linear-gradient(to bottom, ${t.alpha(t.palette.scrapbook.paper, 0)} 0, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.1)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.1)} ${t.spacing(4)})`,
          sm: [
            `linear-gradient(90deg, ${t.alpha(t.palette.scrapbook.paper, 0)} 0, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(8)}, ${t.alpha(t.palette.scrapbook.red, 0.3)} ${t.spacing(8)}, ${t.alpha(t.palette.scrapbook.red, 0.3)} ${t.spacing(8.25)}, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(8.25)})`,
            `repeating-linear-gradient(to bottom, ${t.alpha(t.palette.scrapbook.paper, 0)} 0, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.1)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.1)} ${t.spacing(4)})`,
          ].join(","),
        },
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: t.alpha(t.palette.scrapbook.ink, 0.68),
        borderRadius: t.spacing(1),
        boxShadow: [
          `${t.spacing(1.125)} ${t.spacing(1.375)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.13)}`,
          `0 ${t.spacing(2.75)} ${t.spacing(5.625)} ${t.alpha(t.palette.scrapbook.shadow, 0.12)}`,
        ].join(""),
        transform: { xs: "rotate(-0.2deg)", md: "rotate(-0.35deg)" },
      })}
    >
      {children}
    </Paper>
  </Box>
);
