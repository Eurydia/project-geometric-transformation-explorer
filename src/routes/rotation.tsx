import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type z from "zod/v4";
import { RotationFormulaBlog } from "@/components/blogs/rotation-formula-blog";
import { RotationPropertyBlog } from "@/components/blogs/rotation-property-blog";
import { BlockMath } from "@/components/data-display/BlockMath";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import { RotationForm } from "@/components/form/rotation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { RouterLink } from "@/components/router/router-link";
import { Collapsible } from "@/components/surface/Collapsible";
import { useRotationGraph } from "@/hooks/useRotationGraph";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import { Schema$RotationFormData } from "@/types/schemas/form-data/rotation-form.schema";

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
      secondary={
        <Box
          component="figure"
          id="desmos"
          sx={{ width: "100%", height: "100%", margin: 0 }}
        />
      }
    >
      <Stack component="article" spacing={2}>
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
        <Stack component="header" spacing={0.5}>
          <Typography variant="h5" component="p">
            {`(การแปลงทางเรขาคณิต)`}
          </Typography>
          <Typography variant="h5" component="h1">
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
            <Typography component="h2" variant="subtitle1">
              {"ผลลัพธ์"}
            </Typography>
          }
        >
          {result === null ? (
            <Typography
              component="p"
              color="textSecondary"
              variant="emptyState"
            >
              {`ไม่มีข้อมูลให้แสดง`}
            </Typography>
          ) : (
            <Stack component="section">
              <BlockMath>
                {`จุดหมุน: $(${result.center.x} , ${result.center.y})$`}
              </BlockMath>
              <BlockMath>
                {`ขนาดของมุมที่หมุน: $${result.angle}^{\\circ}$`}
              </BlockMath>
              {result.direction === -1 && (
                <BlockMath>{`ทิศทาง: ทวนเข็มนาฬิกา`}</BlockMath>
              )}
              {result.direction === 1 && (
                <BlockMath>{`ทิศทาง: ตามเข็มนาฬิกา`}</BlockMath>
              )}
              <BlockMath>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</BlockMath>
              <CoordinateResultDisplay
                preImages={result.points}
                imageMap={image}
              />
            </Stack>
          )}
        </Collapsible>
        <Collapsible
          title={
            <Typography component="h2" variant="subtitle1">
              {`สมบัติการหมุน`}
            </Typography>
          }
        >
          <RotationPropertyBlog />
        </Collapsible>
        <Collapsible
          title={
            <Typography component="h2" variant="subtitle1">
              {`สูตรการหมุน`}
            </Typography>
          }
        >
          <RotationFormulaBlog />
        </Collapsible>
      </Stack>
    </SplitLayout>
  );
}
