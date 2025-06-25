import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  memo,
  useCallback,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

type Props = {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
};
export const DirectionInput: FC<Props> = memo(
  ({ onChange, value }) => {
    const handleDirectionChange = useCallback(
      (_: unknown, value: string) => {
        onChange(Number(value));
      },
      [onChange]
    );

    return (
      <FormControl>
        <Grid
          container
          spacing={1}
        >
          <Grid size={{ md: 4 }}>
            <FormLabel>
              <Typography color="textPrimary">{`ทิศทางการหมุน`}</Typography>
            </FormLabel>
          </Grid>
          <Grid size={{ md: 8 }}>
            <RadioGroup
              row
              value={value}
              onChange={handleDirectionChange}
            >
              <FormControlLabel
                value={1}
                control={
                  <Radio
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  />
                }
                label="ตามเข็มนาฬิกา"
              />

              <FormControlLabel
                value={-1}
                control={
                  <Radio
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  />
                }
                label="ทวนเข็มนาฬิกา"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
);
