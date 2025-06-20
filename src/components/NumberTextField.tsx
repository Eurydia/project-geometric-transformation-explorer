import {
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import type { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => unknown;
  label: string;
};
export const NumberTextField: FC<Props> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        htmlInput: {
          inputMode: "numeric",
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ userSelect: "none" }}>
                <MathJax
                  dynamic
                  inline
                >
                  {label}
                </MathJax>
              </Typography>
            </InputAdornment>
          ),
          sx: { fontFamily: "monospace" },
        },
      }}
    />
  );
};
