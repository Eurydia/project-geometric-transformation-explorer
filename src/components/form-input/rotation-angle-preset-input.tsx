import { validateNum } from "@/hooks/useRotationGroup";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import {
  memo,
  useMemo,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { NumberTextField } from "./NumberTextField";
import { useFieldContext } from "@/contexts/app-form-context";
import _ from "lodash";
import { MathJax } from "better-react-mathjax";

export const RotationAnglePresetInput: FC = memo(() => {
  const { handleBlur, handleChange } = useFieldContext<string>();
  return (
    <ButtonGroup fullWidth variant="outlined" color="inherit">
      {_.range(3).map((index) => (
        <Button
          key={`btn-${index}`}
          onBlur={handleBlur}
          onClick={() => handleChange((90 * (index + 1)).toString())}
        >
          <MathJax>{`${(index + 1) * 90}^{\\deg}`}</MathJax>
        </Button>
      ))}
    </ButtonGroup>
  );
});
