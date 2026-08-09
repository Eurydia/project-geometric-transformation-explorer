import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import Button from "@mui/material/Button";
import type { FC } from "react";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const FormResetButton: FC = () => {
  const { Subscribe, reset } = AppFormHookContexts.useFormContext();
  return (
    <Subscribe selector={({ isDefaultValue }) => ({ isDefaultValue })}>
      {({ isDefaultValue }) => (
        <Button
          startIcon={<WarningAmberRounded />}
          variant="outlined"
          color="error"
          disabled={isDefaultValue}
          onClick={() => reset()}
          sx={(t) => ({
            borderWidth: 2,
            borderRadius: t.spacing(0.875),
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
          {`คืนค่าเริ่มต้น`}
        </Button>
      )}
    </Subscribe>
  );
};
