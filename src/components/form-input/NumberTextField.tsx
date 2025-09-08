import { OutlinedInput } from "@mui/material";
import type { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => unknown;
  onBlur?: () => unknown;
  error?: boolean;
};
export const NumberTextField: FC<Props> = ({
  value,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <OutlinedInput
      fullWidth
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      slotProps={{
        root: {
          inputMode: "decimal",
        },
        input: {
          sx: { fontFamily: "monospace" },
          type: "number",
        },
      }}
    />
  );
};
