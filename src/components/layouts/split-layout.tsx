import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { GraphNotebookPaper } from "@/components/surface/GraphNotebookPaper";
import { PrimaryNotebookPaper } from "@/components/surface/PrimaryNotebookPaper";

export const SplitLayout: FC<
  PropsWithChildren<{
    secondary: ReactNode;
  }>
> = (props) => {
  return (
    <Box sx={{ overflow: { xs: "auto", md: "unset" } }}>
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
        })}
      >
        <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ height: { md: "100%" } }}>
          <PrimaryNotebookPaper>{props.children}</PrimaryNotebookPaper>
        </Grid>
        <Grid
          size={{ xs: 12, md: 7, lg: 8 }}
          sx={{ height: { xs: "70vh", md: "100%" } }}
        >
          <GraphNotebookPaper>{props.secondary}</GraphNotebookPaper>
        </Grid>
      </Grid>
    </Box>
  );
};
