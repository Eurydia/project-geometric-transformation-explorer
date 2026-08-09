import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type z from "zod/v4";
import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { TranslationFormulaBlog } from "@/components/blogs/translation-formula-blog";
import { TranslationPropertyBlog } from "@/components/blogs/translation-property-blog";
import { BlockMath } from "@/components/data-display/BlockMath";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { RouterLink } from "@/components/router/router-link";
import { Collapsible } from "@/components/surface/Collapsible";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import { Schema$TranslationFormData } from "@/types/schemas/form-data/translation-form";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const { image, plotTranslation } = useTranslationGraph("#desmos");
  const [result, setResult] = useState<z.output<
    typeof Schema$TranslationFormData
  > | null>(null);

  const form = AppFormHook.useAppForm({
    defaultValues: {
      points: [{ x: "1", y: "1" }],
      translation: { x: "2", y: "1" },
    } as z.input<typeof Schema$TranslationFormData>,
    validators: {
      onChange: Schema$TranslationFormData,
    },
    onSubmit: ({ value }) => {
      const parseResult = Schema$TranslationFormData.safeParse(value);
      if (parseResult.success) {
        setResult(parseResult.data);
        plotTranslation(parseResult.data);
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
      <Stack component="article" spacing={3}>
        <RouterLink
          to="/"
          color="textPrimary"
          sx={{
            width: "fit-content",
          }}
        >
          {`กลับหน้าแรก`}
        </RouterLink>
        <Stack component="header" spacing={0.5}>
          <Typography component="p" variant="h5">
            {`(การแปลงทางเรขาคณิต)`}
          </Typography>
          <Typography variant="h5" component="h1">
            {`การเลื่อนขนาน`}
          </Typography>
        </Stack>
        <TranslationForm
          form={form}
          fields={{ points: "points", translation: "translation" }}
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
                {`เวกเตอร์ของการเลื่อนขนาน: $\\begin{bmatrix} ${result.translation.x} \\\\ ${result.translation.y}\\end{bmatrix}$`}
              </BlockMath>
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
            <Typography
              component="h2"
              variant="subtitle1"
            >{`สมบัติการเลื่อนขนาน`}</Typography>
          }
        >
          <TranslationPropertyBlog />
        </Collapsible>
        <Collapsible
          title={
            <Typography
              component="h2"
              variant="subtitle1"
            >{`สูตรการเลื่อนขนาน`}</Typography>
          }
        >
          <TranslationFormulaBlog />
        </Collapsible>
        <AttributionBlog />
      </Stack>
    </SplitLayout>
  );
}
