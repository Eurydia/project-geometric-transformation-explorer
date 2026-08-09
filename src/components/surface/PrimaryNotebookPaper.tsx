import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { FC, PropsWithChildren } from "react";

export const PrimaryNotebookPaper: FC<PropsWithChildren> = ({ children }) => (
  <Box sx={{ height: "100%" }}>
    <Paper
      sx={(t) => ({
        height: "100%",
        padding: {
          xs: t.spacing(2.75),
          sm: t.spacing(3.25),
          lg: t.spacing(4.25),
        },
        overflowY: "auto",
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
        backgroundColor: t.palette.scrapbook.paper,
        backgroundImage: [
          `linear-gradient(90deg, ${t.alpha(t.palette.scrapbook.paper, 0)} 0, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(3.5)}, ${t.alpha(t.palette.scrapbook.red, 0.28)} ${t.spacing(3.5)}, ${t.alpha(t.palette.scrapbook.red, 0.28)} ${t.spacing(3.75)}, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(3.75)})`,
          `repeating-linear-gradient(to bottom, ${t.alpha(t.palette.scrapbook.paper, 0)} 0, ${t.alpha(t.palette.scrapbook.paper, 0)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.09)} ${t.spacing(3.875)}, ${t.alpha(t.palette.scrapbook.blue, 0.09)} ${t.spacing(4)})`,
        ].join(","),
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: t.alpha(t.palette.scrapbook.ink, 0.66),
        borderRadius: t.spacing(0.875),
      })}
    >
      {children}
    </Paper>
  </Box>
);
