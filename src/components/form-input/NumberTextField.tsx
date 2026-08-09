import OutlinedInput from "@mui/material/OutlinedInput";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const NumberTextField: FC = () => {
  const {
    state: {
      value,
      meta: { errors },
    },
    handleBlur,
    handleChange,
  } = AppFormHookContexts.useFieldContext<string>();
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
      sx={(t) => ({
        backgroundColor: t.alpha(t.palette.scrapbook.graphPaper, 0.9),
        borderRadius: t.spacing(0.5, 0.75, 0.375, 0.625),
        ":focus-within": {
          boxShadow: `${t.spacing(0.375)} ${t.spacing(0.375)} 0 ${t.alpha(t.palette.scrapbook.blue, 0.2)}`,
        },
      })}
    />
  );
};
