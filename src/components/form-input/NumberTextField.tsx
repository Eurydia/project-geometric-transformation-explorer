import { useFieldContext } from "@/contexts/app-form-context";
import { OutlinedInput } from "@mui/material";
import { memo, type FC } from "react";

export const NumberTextField: FC = memo(() => {
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
    />
  );
});
