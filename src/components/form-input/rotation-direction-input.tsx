import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const RotationDirectionInput: FC = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = AppFormHookContexts.useFieldContext<"1" | "-1">();
  return (
    <RadioGroup
      value={value}
      onChange={(_, v) => handleChange(v as "-1" | "1")}
      onBlur={handleBlur}
    >
      <FormControlLabel value={"1"} control={<Radio />} label="ตามเข็มนาฬิกา" />
      <FormControlLabel value={"-1"} control={<Radio />} label="ทวนเข็มนาฬิกา" />
    </RadioGroup>
  );
};
