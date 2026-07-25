import { RotationFormulaBlog } from "@/components/blogs/rotation-formula-blog";
import { RotationPropertyBlog } from "@/components/blogs/rotation-property-blog";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import { RotationForm } from "@/components/form/rotation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { RouterLink } from "@/components/router/router-link";
import { Collapsible } from "@/components/surface/Collapsible";
import { useRotationGraph } from "@/hooks/useRotationGraph";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import { Schema$RotationFormData } from "@/types/schemas/form-data/rotation-form.schema";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import { useState } from "react";
import z from "zod/v4";

export const Route = createFileRoute("/rotation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<z.output<
    typeof Schema$RotationFormData
  > | null>(null);
  const { plotRotation, image } = useRotationGraph("#desmos");

  const form = AppFormHook.useAppForm({
    defaultValues: {
      direction: "1",
      angle: "90",
      center: { x: "0", y: "0" },
      points: [{ x: "1", y: "1" }],
    } as z.input<typeof Schema$RotationFormData>,
    validators: { onChange: Schema$RotationFormData },
    onSubmit: ({ value }) => {
      const parseResult = Schema$RotationFormData.safeParse(value);
      if (parseResult.success) {
        setResult(parseResult.data);
        plotRotation(parseResult.data);
      }
    },
  });

  return (
    <SplitLayout
      slots={{
        secondary: <Box id="desmos" sx={{ width: "100%", height: "100%" }} />,
        primary: (
          <Stack spacing={2}>
            <RouterLink
              to="/"
              color="textPrimary"
              underline="always"
              sx={{
                width: "fit-content",
              }}
            >
              {`กลับหน้าแรก`}
            </RouterLink>
            <Stack spacing={0.5}>
              <Typography
                variant="h5"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                {`การหมุน`}
              </Typography>
            </Stack>
            <RotationForm
              form={form}
              fields={{
                angle: "angle",
                center: "center",
                direction: "direction",
                points: "points",
              }}
            />
            <Collapsible
              title={
                <Typography sx={{ fontWeight: 700 }}>{"ผลลัพธ์"}</Typography>
              }
            >
              {result === null ? (
                <Typography color="textSecondary" sx={{ fontStyle: "italic" }}>
                  {`ไม่มีข้อมูลให้แสดง`}
                </Typography>
              ) : (
                <Stack>
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
                  <MathJax dynamic>
                    {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
                  </MathJax>
                  <CoordinateResultDisplay
                    preImages={result.points}
                    imageMap={image}
                  />
                </Stack>
              )}
            </Collapsible>
            <Collapsible
              title={
                <Typography sx={{ fontWeight: 700 }}>
                  {`สมบัติการหมุน`}
                </Typography>
              }
            >
              <RotationFormulaBlog />
            </Collapsible>
            <Collapsible
              title={
                <Typography sx={{ fontWeight: 700 }}>
                  {`สูตรการหมุน`}
                </Typography>
              }
            >
              <RotationPropertyBlog />
            </Collapsible>
          </Stack>
        ),
      }}
    />
  );
}
