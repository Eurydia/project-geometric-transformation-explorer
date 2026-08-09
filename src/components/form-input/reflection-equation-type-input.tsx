import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import type { FC } from "react";
import { InlineMath } from "@/components/data-display/InlineMath";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const ReflectionEquationTypeInput: FC = () => {
  const {
    state: { value },
    handleChange,
    handleBlur,
  } = AppFormHookContexts.useFieldContext<
    "horizontal" | "vertical" | "linear"
  >();
  return (
    <Box component="fieldset" sx={{ border: 0, margin: 0, padding: 0 }}>
      <FormControlLabel
        control={
          <Radio
            checked={value === "horizontal"}
            onChange={() => handleChange("horizontal")}
            onBlur={handleBlur}
          />
        }
        label={<InlineMath>{`แนวแกน $x$`}</InlineMath>}
        sx={{ width: "fit-content" }}
      />
      <FormControlLabel
        control={
          <Radio
            checked={value === "vertical"}
            onChange={() => handleChange("vertical")}
            onBlur={handleBlur}
          />
        }
        label={<InlineMath>{`แนวแกน $y$`}</InlineMath>}
        sx={{ width: "fit-content" }}
      />
      <FormControlLabel
        control={
          <Radio
            checked={value === "linear"}
            onChange={() => handleChange("linear")}
            onBlur={handleBlur}
          />
        }
        label="สมการเส้นตรง"
        sx={{ width: "fit-content" }}
      />
    </Box>
  );
};
