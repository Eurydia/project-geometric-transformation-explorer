import { GraphNotebookPaper } from "@/components/surface/GraphNotebookPaper";
import { PrimaryNotebookPaper } from "@/components/surface/PrimaryNotebookPaper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
        sx={(t) => ({
          width: "100%",
          padding: {
            xs: t.spacing(2),
            sm: t.spacing(3),
            lg: t.spacing(5),
          },
          filter: `drop-shadow(0 ${t.spacing(2.5)} ${t.spacing(3)} ${t.alpha(t.palette.scrapbook.shadow, 0.1)})`,
        })}
      >
        <Grid
          size={{ xs: 12, md: 5, lg: 4 }}
          sx={{ maxHeight: { md: "100vh" } }}
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
