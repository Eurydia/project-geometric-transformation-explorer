import Button from "@mui/material/Button";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const ArrayItemAddButton: FC = () => {
  const {
    state: { value },
    pushValue,
  } = AppFormHookContexts.useFieldContext<{ x: string; y: string }[]>();
  return (
    <Button
      disabled={value.length >= 4}
      variant="outlined"
      onClick={() => pushValue({ x: "", y: "" })}
      sx={(t) => ({
        borderWidth: 2,
        borderRadius: t.spacing(0.5, 0.875, 0.5, 0.75),
        boxShadow: `${t.spacing(0.375)} ${t.spacing(0.375)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.72)}`,
        transition: t.transitions.create(["transform", "box-shadow"], {
          duration: 140,
          easing: "ease",
        }),
        ":hover": {
          transform: `translate(${t.spacing(0.125)}, ${t.spacing(0.125)}) rotate(-0.25deg)`,
          boxShadow: `${t.spacing(0.25)} ${t.spacing(0.25)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.64)}`,
        },
      })}
    >
      {`เพิ่มพิกัด`}
    </Button>
  );
};
