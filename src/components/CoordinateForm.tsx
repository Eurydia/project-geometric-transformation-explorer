import { Grid, Typography } from "@mui/material";
import { memo, useMemo, type FC } from "react";
import { ErrorList } from "./ErrorList";
import { NumberTextField } from "./NumberTextField";

type Props = {
  label?: string;
  value: { x: string; y: string };
  onChange: (
    callback: (prev: { x: string; y: string }) => {
      x: string;
      y: string;
    }
  ) => unknown;
};
export const CoordinateForm: FC<Props> = memo(
  ({ value, onChange, label }) => {
    const errors = useMemo(() => {
      const _errors: string[] = [];

      if (isNaN(Number(value.x))) {
        _errors.push(`พิกัด $x$ ไม่ถูกต้อง`);
      }
      if (isNaN(Number(value.y))) {
        _errors.push(`พิกัด $y$ ไม่ถูกต้อง`);
      }
      return _errors;
    }, [value]);

    return (
      <Grid
        container
        spacing={1}
      >
        {label !== undefined && (
          <Grid size={12}>
            <Typography>{label}</Typography>
          </Grid>
        )}
        <Grid size={{ md: 6 }}>
          <NumberTextField
            label="$x:$"
            value={value.x}
            onChange={(x) =>
              onChange(({ y }) => ({
                x,
                y,
              }))
            }
          />
        </Grid>
        <Grid size={{ md: 6 }}>
          <NumberTextField
            label="$y:$"
            value={value.y}
            onChange={(y) =>
              onChange(({ x }) => ({
                y,
                x,
              }))
            }
          />
        </Grid>
        {errors.length > 0 && (
          <Grid size={12}>
            <ErrorList errors={errors} />
          </Grid>
        )}
      </Grid>
    );
  }
);
