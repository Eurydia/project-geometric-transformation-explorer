import { validateNum } from "@/hooks/useRotationGroup";
import {
  Button,
  ButtonGroup,
  Grid,
  Typography,
} from "@mui/material";
import {
  memo,
  useMemo,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { NumberTextField } from "./NumberTextField";

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const AngleInput: FC<Props> = memo(
  ({ value, onChange }) => {
    const error = useMemo(() => {
      return !validateNum(value);
    }, [value]);

    return (
      <Grid
        container
        spacing={1}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography>{`ขนาดของมุมที่หมุน (องศา)`}</Typography>
        </Grid>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NumberTextField
            error={error}
            value={value}
            onChange={onChange}
          />
          <ButtonGroup
            fullWidth
            variant="outlined"
            disableElevation
            disableRipple
            color="inherit"
          >
            {new Array(3).fill(0).map((_, index) => (
              <Button
                key={`preset-btn-${index}`}
                onClick={() =>
                  onChange((90 * (index + 1)).toString())
                }
              >
                {(index + 1) * 90}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
);
