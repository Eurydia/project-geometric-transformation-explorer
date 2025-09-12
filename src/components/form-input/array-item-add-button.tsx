import { useFieldContext } from "@/contexts/app-form-context";
import { Button } from "@mui/material";
import type { FC } from "react";

export const ArrayItemAddButton: FC = () => {
  const {
    state: { value },
    pushValue,
  } = useFieldContext<{ x: string; y: string }[]>();
  return (
    <Button
      disabled={value.length >= 4}
      variant="outlined"
      onClick={() => pushValue({ x: "", y: "" })}
    >
      {`เพิ่มพิกัด`}
    </Button>
  );
};
