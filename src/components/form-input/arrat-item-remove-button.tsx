import { useFieldContext } from "@/contexts/app-form-context";
import { Typography } from "@mui/material";
import { useMemo, type FC } from "react";

type Props = {
  index: number;
};
export const ArrayItemRemoveButton: FC<Props> = ({ index }) => {
  const {
    state: { value },
    removeValue,
  } = useFieldContext<unknown[]>();
  const disabled = useMemo(() => value.length === 1, [value.length]);
  return (
    <Typography
      component={"div"}
      tabIndex={0}
      color={!disabled ? "error" : "textDisabled"}
      onClick={() => {
        if (disabled) {
          return;
        }
        removeValue(index);
      }}
      sx={{
        cursor: !disabled ? "pointer" : undefined,
        width: "fit-content",
        "&:hover": {
          textDecorationLine: !disabled ? "underline" : undefined,
        },
      }}
    >
      (ลบ)
    </Typography>
  );
};
