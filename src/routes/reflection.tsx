import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { ReflectionFormulaBlog } from "@/components/blogs/reflection-formula-blog";
import { ReflectionPropertyBlog } from "@/components/blogs/reflection-property-blog";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import { ReflectionForm } from "@/components/form/reflection-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { RouterLink } from "@/components/router/router-link";
import { Collapsible } from "@/components/surface/Collapsible";
import { useReflectionGraph } from "@/hooks/useReflectionGraph";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import { Schema$ReflectionFormData } from "@/types/schemas/form-data/reflection-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import { useState } from "react";
import type z from "zod";

export const Route = createFileRoute("/reflection")({
  component: RouteComponent,
});

function RouteComponent() {
  const { plotReflection, image } = useReflectionGraph("#desmos");

  const form = AppFormHook.useAppForm({
    defaultValues: {
      type: "horizontal",
      value: "0",
      points: [{ x: "1", y: "1" }],
    } as z.input<typeof Schema$ReflectionFormData>,
    validators: { onChange: Schema$ReflectionFormData },
    onSubmit: ({ value }) => {
      const res = Schema$ReflectionFormData.safeParse(value);
      if (res.success) {
        setResult(res.data);
        plotReflection(res.data);
      }
    },
  });

  const [result, setResult] = useState<z.output<
    typeof Schema$ReflectionFormData
  > | null>(null);

  return (
    <SplitLayout
      slots={{
        secondary: <Box id="desmos" sx={{ width: "100%", height: "100%" }} />,
        primary: (
          <Stack spacing={2}>
            <RouterLink to="/" color="textPrimary">
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
                {`การสะท้อน`}
              </Typography>
            </Stack>
            <ReflectionForm
              form={form}
              fields={{ points: "points", type: "type", value: "value" }}
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
                  {result.type === "horizontal" && (
                    <MathJax dynamic>
                      {`เส้นการสะท้อน: $y=${result.value}$`}
                    </MathJax>
                  )}
                  {result.type === "vertical" && (
                    <MathJax dynamic>
                      {`เส้นการสะท้อน: $x=${result.value}$`}
                    </MathJax>
                  )}
                  {result.type === "linear" && (
                    <MathJax dynamic>
                      {`เส้นการสะท้อน: $${result.value.join("=")}$`}
                    </MathJax>
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
                  {`สมบัติการสะท้อน`}
                </Typography>
              }
            >
              <ReflectionPropertyBlog />
            </Collapsible>
            <Collapsible
              title={
                <Typography sx={{ fontWeight: 700 }}>
                  {`สูตรการสะท้อน`}
                </Typography>
              }
            >
              <ReflectionFormulaBlog />
            </Collapsible>
            <AttributionBlog />
          </Stack>
        ),
      }}
    />
  );
}
