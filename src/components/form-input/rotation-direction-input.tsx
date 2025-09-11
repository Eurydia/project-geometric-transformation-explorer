import { useFieldContext } from "@/contexts/app-form-context";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { type FC } from "react";

export const RotationDirectionInput: FC = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = useFieldContext<string>();
  return (
    <RadioGroup
      value={value}
      onChange={(_, v) => handleChange(v)}
      onBlur={handleBlur}
    >
      <FormControlLabel value={"1"} control={<Radio />} label="ตามเข็มนาฬิกา" />
      <FormControlLabel
        value={"-1"}
        control={<Radio />}
        label="ทวนเข็มนาฬิกา"
      />
    </RadioGroup>
  );
};
