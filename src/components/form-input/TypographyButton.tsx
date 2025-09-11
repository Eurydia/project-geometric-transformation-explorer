import { useFieldContext } from "@/contexts/app-form-context";
import { Typography, type TypographyProps } from "@mui/material";
import { memo, type FC } from "react";

type Props = {
  index: number;
};
export const RemoveArrayItemButton: FC<Props> = memo(({ index }) => {
  const {
    state: { value },
    removeValue,
  } = useFieldContext<unknown[]>();
  return (
    <Typography
      component={"div"}
      tabIndex={0}
      color={value.length > 1 ? "error" : "textDisabled"}
      onClick={() => {
        if (value.length > 1) {
          removeValue(index);
        }
      }}
      sx={{
        cursor: value.length > 1 ? "pointer" : undefined,
        width: "fit-content",
      }}
    >
      (ลบ)
    </Typography>
  );
});
