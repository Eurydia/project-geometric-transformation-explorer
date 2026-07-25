import { useFieldContext } from "@/libs/form/app-form-hook-context";
import { alpha, Button, ButtonGroup } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import _ from "lodash";
import type { FC } from "react";

export const RotationAnglePresetInput: FC = () => {
  const { handleBlur, handleChange } = useFieldContext<string>();
  return (
    <ButtonGroup fullWidth variant="outlined" color="inherit">
      {_.range(3).map((index) => (
        <Button
          key={`btn-${index}`}
          onBlur={handleBlur}
          onClick={() => handleChange((90 * (index + 1)).toString())}
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
          <MathJax dynamic>{`$${(index + 1) * 90}^{\\circ}$`}</MathJax>
        </Button>
      ))}
    </ButtonGroup>
  );
};
