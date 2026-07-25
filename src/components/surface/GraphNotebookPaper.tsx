import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { FC, ReactNode } from "react";

export const GraphNotebookPaper: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Box sx={{ position: "relative", height: "100%" }}>
    <Paper
      sx={(t) => ({
        height: "100%",
        backgroundColor: t.palette.scrapbook.graphPaper,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: t.alpha(t.palette.scrapbook.ink, 0.66),
        borderRadius: t.spacing(0.625),
        boxShadow: [
          `${t.spacing(1.125)} ${t.spacing(1.375)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.13)}`,
          `0 ${t.spacing(3)} ${t.spacing(5)} ${t.alpha(t.palette.scrapbook.shadow, 0.13)}`,
        ].join(","),
      })}
    >
      {children}
    </Paper>
  </Box>
);
