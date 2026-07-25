import { MathJax } from "better-react-mathjax";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export const ReflectionEquationTypeInput: FC = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = AppFormHookContexts.useFieldContext<
    "horizontal" | "vertical" | "linear"
  >();
  return (
    <RadioGroup
      value={value}
      onChange={(_, value) =>
        handleChange(value as "horizontal" | "vertical" | "linear")
      }
      onBlur={handleBlur}
    >
      <FormControlLabel
        value={"horizontal"}
        control={<Radio />}
        label={<MathJax dynamic>{`แนวแกน $x$`}</MathJax>}
        sx={{ width: "fit-content" }}
      />
      <FormControlLabel
        value={"vertical"}
        control={<Radio />}
        label={<MathJax dynamic>{`แนวแกน $y$`}</MathJax>}
        sx={{ width: "fit-content" }}
      />
      <FormControlLabel
        value={"linear"}
        control={<Radio />}
        label="สมการเส้นตรง"
        sx={{ width: "fit-content" }}
      />
    </RadioGroup>
  );
};
