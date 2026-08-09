import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";

export const DoodleIconFrame: FC<{ children: ReactNode }> = ({ children }) => (
  <Typography
    component="figure"
    variant="h2"
    sx={(t) => ({
      padding: { xs: t.spacing(1), md: t.spacing(2) },
      backgroundColor: t.alpha(t.palette.scrapbook.paper, 0.34),
      display: "flex",
      color: t.palette.primary.main,
      filter: `drop-shadow(${t.spacing(0.375)} ${t.spacing(0.5)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.12)})`,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: t.alpha(t.palette.scrapbook.ink, 0.27),
      borderRadius: "50%",
    })}
  >
    {children}
  </Typography>
);
