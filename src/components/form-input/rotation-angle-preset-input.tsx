import { Button, ButtonGroup } from "@mui/material";
import { type FC } from "react";
import { useFieldContext } from "@/contexts/app-form-context";
import _ from "lodash";

export const RotationAnglePresetInput: FC = () => {
  const { handleBlur, handleChange } = useFieldContext<string>();
  return (
    <ButtonGroup fullWidth variant="outlined" color="inherit">
      {_.range(3).map((index) => (
        <Button
          key={`btn-${index}`}
          onBlur={handleBlur}
          onClick={() => handleChange((90 * (index + 1)).toString())}
        >
          {(index + 1) * 90}
        </Button>
      ))}
    </ButtonGroup>
  );
};
