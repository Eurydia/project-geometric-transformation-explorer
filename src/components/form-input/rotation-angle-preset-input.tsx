import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import type { FC } from "react";
import { InlineMath } from "@/components/data-display/InlineMath";
import { AppFormHookContexts } from "@/libs/form/app-form-hook-context";

export const RotationAnglePresetInput: FC = () => {
  const { handleBlur, handleChange } =
    AppFormHookContexts.useFieldContext<string>();
  return (
    <ButtonGroup
      component="fieldset"
      fullWidth
      variant="outlined"
      color="inherit"
      sx={{ border: 0, margin: 0, padding: 0 }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Button
          key={`btn-${index}`}
          onBlur={handleBlur}
          onClick={() => handleChange((90 * (index + 1)).toString())}
          sx={(t) => ({
            borderWidth: 2,
            borderRadius: t.spacing(0.875),
            boxShadow: `${t.spacing(0.375)} ${t.spacing(0.375)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.72)}`,
            transition: t.transitions.create(["transform", "box-shadow"], {
              duration: 140,
              easing: "ease",
            }),
            ":hover": {
              borderWidth: 2,
              transform: `translate(${t.spacing(0.125)}, ${t.spacing(0.125)}) rotate(-0.25deg)`,
              boxShadow: `${t.spacing(0.25)} ${t.spacing(0.25)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.64)}`,
            },
          })}
        >
          <InlineMath>{`$${(index + 1) * 90}^{\\circ}$`}</InlineMath>
        </Button>
      ))}
    </ButtonGroup>
  );
};
