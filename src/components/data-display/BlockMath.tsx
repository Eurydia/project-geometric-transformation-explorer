import Box from "@mui/material/Box";
import type { FC } from "react";
import { useMathJaxTypeset } from "@/hooks/useMathJaxTypeset";

export const BlockMath: FC<{ children: string }> = ({ children }) => {
  const elementRef = useMathJaxTypeset<HTMLElement>(children);

  return (
    <Box component="figure" ref={elementRef} sx={{ margin: 0 }}>
      {children}
    </Box>
  );
};
