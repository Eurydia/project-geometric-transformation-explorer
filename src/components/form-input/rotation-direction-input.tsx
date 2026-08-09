import { Box, FormControlLabel, Radio } from "@mui/material";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const RotationDirectionInput: FC = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = AppFormHookContexts.useFieldContext<"1" | "-1">();
  return (
    <Box component="fieldset" sx={{ border: 0, margin: 0, padding: 0 }}>
      <FormControlLabel
        control={
          <Radio
            checked={value === "1"}
            onChange={() => handleChange("1")}
            onBlur={handleBlur}
          />
        }
        label="ตามเข็มนาฬิกา"
      />
      <FormControlLabel
        control={
          <Radio
            checked={value === "-1"}
            onChange={() => handleChange("-1")}
            onBlur={handleBlur}
          />
        }
        label="ทวนเข็มนาฬิกา"
      />
    </Box>
  );
};
