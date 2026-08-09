import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import type { FC, ReactNode } from "react";

export const GraphNotebookPaper: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Box
    component="figure"
    sx={{ position: "relative", height: "100%", margin: 0 }}
  >
    <Paper
      component="section"
      sx={(t) => ({
        height: "100%",
        backgroundColor: t.palette.scrapbook.graphPaper,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: t.alpha(t.palette.scrapbook.ink, 0.66),
        borderRadius: t.spacing(0.625),
      })}
    >
      {children}
    </Paper>
  </Box>
);
