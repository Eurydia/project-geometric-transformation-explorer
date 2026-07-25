import { alpha, Box } from "@mui/material";
import type { FC } from "react";

export const BinderHoles: FC = () => (
  <Box
    aria-hidden
    sx={(theme) => ({
      position: "absolute",
      width: 12,
      top: 38,
      bottom: 24,
      left: 8,
      pointerEvents: "none",
      backgroundImage: `radial-gradient(circle, ${theme.palette.scrapbook.desk} 0 ${theme.spacing(0.5)}, ${alpha(theme.palette.scrapbook.ink, 0.28)} ${theme.spacing(0.5625)} ${theme.spacing(0.6875)}, ${alpha(theme.palette.scrapbook.paper, 0)} ${theme.spacing(0.75)})`,
      backgroundSize: theme.spacing(1.5, 7),
    })}
  />
);
