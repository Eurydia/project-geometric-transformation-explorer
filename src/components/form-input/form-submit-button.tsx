import { useFormContext } from "@/libs/form/app-form-hook-context";
import { alpha, Button } from "@mui/material";
import type { FC } from "react";

export const FormSubmitButton: FC = () => {
  const { Subscribe, handleSubmit } = useFormContext();
  return (
    <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
      {({ canSubmit }) => (
        <Button
          disabled={!canSubmit}
          variant="contained"
          onClick={handleSubmit}
          sx={(theme) => ({
            minHeight: 38,
            borderWidth: 2,
            borderRadius: theme.spacing(0.5, 0.875, 0.5, 0.75),
            fontWeight: 700,
            textTransform: "none",
            boxShadow: `${theme.spacing(0.375)} ${theme.spacing(0.375)} 0 ${alpha(theme.palette.scrapbook.ink, 0.72)}`,
            transition: theme.transitions.create(["transform", "box-shadow"], {
              duration: 140,
              easing: "ease",
            }),
            ":hover": {
              borderWidth: 2,
              transform: `translate(${theme.spacing(0.125)}, ${theme.spacing(0.125)}) rotate(-0.25deg)`,
              boxShadow: `${theme.spacing(0.25)} ${theme.spacing(0.25)} 0 ${alpha(theme.palette.scrapbook.ink, 0.64)}`,
            },
          })}
        >
          {`คำนวณ`}
        </Button>
      )}
    </Subscribe>
  );
};
