import type { FC } from "react";
import { useMathJaxTypeset } from "@/hooks/useMathJaxTypeset";

export const InlineMath: FC<{ children: string }> = ({ children }) => {
  const elementRef = useMathJaxTypeset<HTMLDataElement>(children);

  return (
    <data ref={elementRef} value={children}>
      {children}
    </data>
  );
};
