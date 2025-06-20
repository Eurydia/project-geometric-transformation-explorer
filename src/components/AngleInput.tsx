import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  memo,
  useCallback,
  useMemo,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { ErrorList } from "./ErrorList";
import { NumberTextField } from "./NumberTextField";

type Props = {
  angle: string;
  onAngleChange: Dispatch<SetStateAction<string>>;
  direction: number;
  onDirectionChange: Dispatch<SetStateAction<number>>;
};

export const AngleInput: FC<Props> = memo(
  ({
    angle,
    direction,
    onAngleChange,
    onDirectionChange,
  }) => {
    const errors = useMemo(() => {
      const _errors: string[] = [];
      const parsedValue = Number(angle);
      if (isNaN(parsedValue)) {
        _errors.push("องศาในการหมุนไม่ถูกต้อง");
      }

      if (
        !isNaN(parsedValue) &&
        (parsedValue >= 360 || parsedValue < 0)
      ) {
        const divFloor = Math.floor(parsedValue / 360);
        const divFloorStr = divFloor.toLocaleString(
          "fullwide",
          {
            useGrouping: false,
          }
        );
        const multStr = (360 * divFloor).toLocaleString(
          "fullwide",
          {
            useGrouping: false,
          }
        );
        const remDiv = parsedValue % 360;
        const remDivStr = remDiv.toLocaleString(
          "fullwide",
          {
            useGrouping: false,
          }
        );

        const valueStr = parsedValue.toLocaleString(
          "fullwide",
          {
            useGrouping: false,
          }
        );

        _errors.push(
          `องศาที่กำหนดมีค่าเท่ากับ $$${valueStr}^{\\circ} - (360^{\\circ} \\cdot  ${divFloorStr})=  ${valueStr}^{\\circ} -  ${multStr}^{\\circ} = \\underline{\\underline{${remDivStr}^{\\circ}}}$$`
        );
      }

      return _errors;
    }, [angle]);

    const handleDirectionChange = useCallback(
      (_: unknown, value: string) => {
        onDirectionChange(Number(value));
      },
      [onDirectionChange]
    );

    return (
      <Grid
        container
        spacing={1}
      >
        <Grid size={12}>
          <FormControl>
            <FormLabel>{`ทิศทาง`}</FormLabel>
            <RadioGroup
              row
              value={direction}
              onChange={handleDirectionChange}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="ตามเข็มนาฬิกา"
              />

              <FormControlLabel
                value={-1}
                control={<Radio />}
                label="ทวนเข็มนาฬิกา"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <NumberTextField
            value={angle}
            onChange={onAngleChange}
            label="องศาการหมุน :"
          />
        </Grid>
        <Grid size={12}>
          <Stack
            spacing={1}
            direction="row"
            useFlexGap
          >
            {new Array(3).fill(0).map((_, index) => (
              <Button
                key={`preset-btn-${index}`}
                variant="outlined"
                disableElevation
                disableRipple
                onClick={() =>
                  onAngleChange(
                    (90 * (index + 1)).toString()
                  )
                }
              >
                <MathJax dynamic>
                  {`$${(index + 1) * 90}^{\\circ}$`}
                </MathJax>
              </Button>
            ))}
          </Stack>
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
