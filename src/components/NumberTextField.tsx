import { TextField } from "@mui/material";
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
    <TextField
      fullWidth
      size="small"
      error={error}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        htmlInput: {
          inputMode: "numeric",
        },
        input: {
          sx: { fontFamily: "monospace" },
        },
      }}
    />
  );
};
