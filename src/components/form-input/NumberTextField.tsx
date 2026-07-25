import { useFieldContext } from "@/libs/form/app-form-hook-context";
import { alpha, OutlinedInput } from "@mui/material";
import type { FC } from "react";

export const NumberTextField: FC = () => {
  const {
    state: {
      value,
      meta: { errors },
    },
    handleBlur,
    handleChange,
  } = useFieldContext<string>();
  return (
    <OutlinedInput
      fullWidth
      error={errors.length > 0}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      slotProps={{
        input: {
          sx: { fontFamily: "monospace" },
          type: "number",
          inputMode: "decimal",
        },
      }}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.scrapbook.graphPaper, 0.9),
        borderRadius: theme.spacing(0.5, 0.75, 0.375, 0.625),
        ":focus-within": {
          boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.375)} 0 ${alpha(theme.palette.scrapbook.blue, 0.2)}`,
        },
      })}
    />
  );
};
