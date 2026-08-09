import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

type Props = {
  index: number;
};
export const ArrayItemRemoveButton: FC<Props> = ({ index }) => {
  const {
    state: { value },
    removeValue,
  } = AppFormHookContexts.useFieldContext<unknown[]>();
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
        ":hover": {
          textDecorationLine: !disabled ? "underline" : undefined,
        },
      }}
    >
      {`(ลบ)`}
    </Typography>
  );
};
