import type { FC } from "react";
import type z from "zod";
import type { RotationFormDataSchema } from "../form/rotation-form";
import { Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { CoordinateResultDisplay } from "./result-display";

type Props = {
  image: Record<number, number[] | undefined>;
  result: z.output<typeof RotationFormDataSchema> | null;
};
export const RotationResultDisplay: FC<Props> = ({ result, image }) => {
  return (
    <Stack>
      {result === null && (
        <>
          <Typography>{`จุดหมุน:`}</Typography>
          <Typography>{`ขนาดของมุมที่หมุน:`}</Typography>
          <Typography>{`ทิศทาง:`}</Typography>
          <MathJax dynamic>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
        </>
      )}
      {result !== null && (
        <>
          <MathJax dynamic>
            {`จุดหมุน: $(${result.center.x} , ${result.center.y})$`}
          </MathJax>
          <MathJax dynamic>
            {`ขนาดของมุมที่หมุน: $${result.angle}^{\\circ}$`}
          </MathJax>
          {result.direction === -1 && (
            <MathJax dynamic>{`ทิศทาง: ทวนเข็มนาฬิกา`}</MathJax>
          )}
          {result.direction === 1 && (
            <MathJax dynamic>{`ทิศทาง: ตามเข็มนาฬิกา`}</MathJax>
          )}
          <MathJax dynamic>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
          <CoordinateResultDisplay preImages={result.points} imageMap={image} />
        </>
      )}
    </Stack>
  );
};
