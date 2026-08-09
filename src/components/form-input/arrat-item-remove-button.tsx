import ButtonBase from "@mui/material/ButtonBase";
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
    <ButtonBase
      type="button"
      disableRipple
      disabled={disabled}
      onClick={() => {
        if (disabled) {
          return;
        }
        removeValue(index);
      }}
      sx={(theme) => ({
        ...theme.typography.body1,
        color: !disabled
          ? theme.palette.error.main
          : theme.palette.text.disabled,
        cursor: !disabled ? "pointer" : undefined,
        width: "fit-content",
        ":hover": {
          textDecorationLine: !disabled ? "underline" : undefined,
        },
      })}
    >
      {`(ลบ)`}
    </ButtonBase>
  );
};
