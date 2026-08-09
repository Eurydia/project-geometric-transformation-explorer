import { Box, lighten, useTheme } from "@mui/material";
import { type FC, memo } from "react";
import { BlockMath } from "@/components/data-display/BlockMath";

type Props = { latex: string; highlight?: boolean };
export const StackedEquationItem: FC<Props> = memo(
  ({ latex, highlight: isLast }) => {
    const {
      palette: {
        primary: { light, dark },
      },
    } = useTheme();
    return (
      <Box
        component="article"
        sx={(theme) => ({
          padding: theme.spacing(0, 2),
          borderLeftStyle: "solid",
          borderLeftColor: !isLast ? lighten(light, 0.5) : dark,
          borderLeftWidth: 8,
          backgroundColor: lighten(light, 0.87),
        })}
      >
        <BlockMath>{latex}</BlockMath>
      </Box>
    );
  },
);
