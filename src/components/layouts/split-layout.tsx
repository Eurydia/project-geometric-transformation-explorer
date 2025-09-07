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
        size={{ md: 4 }}
        sx={{
          maxHeight: { md: "100%" },
        }}
      >
        {primary}
      </Grid>
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          height: { xs: "50vh", md: "100%" },
        }}
      >
        {secondary}
      </Grid>
    </Grid>
  );
};
