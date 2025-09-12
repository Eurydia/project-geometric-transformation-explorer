import { createFileRoute } from "@tanstack/react-router";
import { Paper, Stack, Typography } from "@mui/material";
import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { FormulaBlog } from "@/components/blogs/FormulaBlog";
import { PropertyBlog } from "@/components/blogs/PropertyBlog";
import {
  RotationForm,
  RotationFormDataSchema,
} from "@/components/form/rotation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useCallback, useState } from "react";
import z from "zod/v4";
import { useRotationGraph } from "@/hooks/useRotationGraph";
import { Collapsible } from "@/components/surface/Collapsible";
import { MathJax } from "better-react-mathjax";

export const Route = createFileRoute("/rotation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<z.output<
    typeof RotationFormDataSchema
  > | null>(null);
  const { plotRotation, image } = useRotationGraph("#desmos");

  const handleSolve = useCallback(
    (v: z.output<typeof RotationFormDataSchema>) => {
      setResult(v);
      plotRotation(v);
    },
    [plotRotation]
  );
  return (
    <SplitLayout
      slots={{
        primary: (
          <Paper
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5" component="div" fontWeight={700}>
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component="div" fontWeight={700}>
                {`การหมุน`}
              </Typography>
              <RotationForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={800}>{"ผลลัพท์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`จุดหมุน: ไม่พร้อมแสดง`}</Typography>
                      <Typography>{`ขนาดของมุมที่หมุน: ไม่พร้อมแสดง`}</Typography>
                      <Typography>{`ทิศทาง: ไม่พร้อมแสดง`}</Typography>
                      <MathJax>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่: ไม่พร้อมแสดง`}</MathJax>
                    </>
                  )}
                  {result !== null && (
                    <>
                      <MathJax>{`จุดหมุน: $(${result.center.x} , ${result.center.y})$`}</MathJax>
                      <MathJax>{`ขนาดของมุมที่หมุน: $${result.angle}^{\\circ}$`}</MathJax>
                      {result.direction === -1 && (
                        <MathJax>{`ทิศทาง: ทวนเข็มนาฬิกา`}</MathJax>
                      )}
                      {result.direction === 1 && (
                        <MathJax>{`ทิศทาง: ตามเข็มนาฬิกา`}</MathJax>
                      )}
                      <MathJax>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
                      <MathJax>
                        {`$$
                          \\begin{array}{lll}
                        ${result.points
                          .map(({ x, y }, i) => {
                            const char = String.fromCharCode(i + 65);
                            const preImageTex = `${char}(${x}, ${y})`;
                            const img = image[i];
                            if (img === undefined) {
                              return `${preImageTex} &\\rightarrow & ${char}^{\\prime}(?,?) `;
                            }
                            const [ix, iy] = img;
                            return `${preImageTex} &\\rightarrow & ${char}^{\\prime}(${ix},${iy}) `;
                          })
                          .join("\\\\")}
                        \\end{array}$$`}
                      </MathJax>
                    </>
                  )}
                </Stack>
              </Collapsible>
              <PropertyBlog />
              <FormulaBlog />
              <AttributionBlog />
            </Stack>
          </Paper>
        ),
        secondary: (
          <Stack spacing={1} sx={{ height: "100%" }}>
            <Paper
              sx={{
                height: "100%",
              }}
            >
              <div
                id="desmos"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Paper>
          </Stack>
        ),
      }}
    />
  );
}
