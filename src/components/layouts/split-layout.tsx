import { Grid } from "@mui/material";
import type { FC, ReactNode } from "react";

type Props = {
  slots: {
    secondary: ReactNode;
    primary: ReactNode;
  };
};
export const SplitLayout: FC<Props> = ({ slots: { primary, secondary } }) => {
  return (
    <Grid container spacing={2} sx={{ padding: 2, height: { md: "100vh" } }}>
      <Grid
        size={{ md: 4, xs: 12 }}
        sx={{
          maxHeight: "100%",
        }}
      >
        {primary}
      </Grid>
      <Grid
        size={{ md: 8, xs: 12 }}
        sx={{
          height: { xs: "70vh", md: "100%" },
        }}
      >
        {secondary}
      </Grid>
    </Grid>
  );
};
