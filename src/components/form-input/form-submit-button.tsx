import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";
import Button from "@mui/material/Button";
import type { FC } from "react";

export const FormSubmitButton: FC = () => {
  const { Subscribe, handleSubmit } = AppFormHookContexts.useFormContext();
  return (
    <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
      {({ canSubmit }) => (
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={handleSubmit}
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
          {`คำนวณ`}
        </Button>
      )}
    </Subscribe>
  );
};
