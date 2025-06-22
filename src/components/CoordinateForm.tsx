import { validateNum } from "@/hooks/useRotationGroup";
import type { Vec2D } from "@/types";
import { Grid, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  memo,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import { NumberTextField } from "./NumberTextField";

type Props = {
  label: string | ReactNode;
  value: Vec2D<string>;
  onChange: (value: Vec2D<string>) => unknown;
  endIcon?: ReactNode;
};
export const CoordinateForm: FC<Props> = memo(
  ({ endIcon, value, onChange, label }) => {
    const error = useMemo(() => {
      return {
        x: !validateNum(value.x),
        y: !validateNum(value.y),
      };
    }, [value]);

    const handleXChange = useCallback(
      (x: string) => {
        onChange({ x, y: value.y });
      },
      [value.y, onChange]
    );
    const handleYChange = useCallback(
      (y: string) => {
        onChange({ y, x: value.x });
      },
      [value.x, onChange]
    );

    return (
      <Grid
        container
        spacing={1}
      >
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              wordWrap: "break-word",
              wordBreak: "break-all",
              whiteSpace: "wrap",
            }}
          >
            <MathJax dynamic>{label}</MathJax>
          </Typography>
          {endIcon}
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <NumberTextField
            error={error.x}
            value={value.x}
            onChange={handleXChange}
          />
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 4,
          }}
        >
          <NumberTextField
            error={error.y}
            value={value.y}
            onChange={handleYChange}
          />
        </Grid>
      </Grid>
    );
  }
);
