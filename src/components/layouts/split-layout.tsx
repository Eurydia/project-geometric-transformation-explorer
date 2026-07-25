import { GraphNotebookPaper } from "@/components/surface/GraphNotebookPaper";
import { PrimaryNotebookPaper } from "@/components/surface/PrimaryNotebookPaper";
import { alpha, Box, Grid } from "@mui/material";
import type { FC, ReactNode } from "react";

type Props = {
  slots: {
    secondary: ReactNode;
    primary: ReactNode;
  };
};
export const SplitLayout: FC<Props> = ({ slots: { primary, secondary } }) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        columns={12}
        spacing={{ xs: 3, md: 4 }}
        sx={(theme) => ({
          width: "100%",
          height: "100vh",
          padding: {
            xs: theme.spacing(2),
            sm: theme.spacing(3),
            lg: theme.spacing(5),
          },
          filter: `drop-shadow(0 ${theme.spacing(2.5)} ${theme.spacing(3)} ${alpha(theme.palette.scrapbook.shadow, 0.1)})`,
        })}
      >
        <Grid
          size={{ xs: 12, md: 5, lg: 4 }}
          sx={{ maxHeight: { md: "100%" } }}
        >
          <PrimaryNotebookPaper>{primary}</PrimaryNotebookPaper>
        </Grid>
        <Grid
          size={{ xs: 12, md: 7, lg: 8 }}
          sx={{ height: { xs: "70vh", md: "100%" } }}
        >
          <GraphNotebookPaper>{secondary}</GraphNotebookPaper>
        </Grid>
      </Grid>
    </Box>
  );
};
