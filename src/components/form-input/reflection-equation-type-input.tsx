import { useFieldContext } from "@/contexts/app-form-context";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import type z from "zod/v4";
import type { ReflectionFormDataSchema } from "../form/reflection-form";

export const ReflectionEquationTypeInput = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = useFieldContext<z.input<typeof ReflectionFormDataSchema>["type"]>();
  return (
    <RadioGroup
      value={value}
      onChange={(_, value) =>
        handleChange(value as z.input<typeof ReflectionFormDataSchema>["type"])
      }
      onBlur={handleBlur}
    >
      <FormControlLabel
        value={"horizontal"}
        control={<Radio />}
        label={<MathJax>{`แนวแกน $x$`}</MathJax>}
      />
      <FormControlLabel
        value={"vertical"}
        control={<Radio />}
        label={<MathJax>{`แนวแกน $y$`}</MathJax>}
      />
      <FormControlLabel
        value={"linear"}
        control={<Radio />}
        label="สมการเส้นตรง"
      />
    </RadioGroup>
  );
};
