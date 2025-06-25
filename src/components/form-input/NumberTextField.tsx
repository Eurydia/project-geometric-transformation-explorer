import { OutlinedInput } from "@mui/material";
import type { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => unknown;
  error?: boolean;
};
export const NumberTextField: FC<Props> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <OutlinedInput
      fullWidth
      size="small"
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
