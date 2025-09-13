import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { TranslationFormulaBlog } from "@/components/blogs/translation-formula-blog";
import { TranslationPropertyBlog } from "@/components/blogs/translation-property-blog";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import {
  TranslationForm,
  TranslationFormDataSchema,
} from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Collapsible } from "@/components/surface/Collapsible";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { Paper, Stack, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import { useCallback, useEffect, useState } from "react";
import type z from "zod/v4";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const { desmosRef, plotTranslation } = useTranslationGraph("#desmos");
  const [image, setImage] = useState<Record<number, number[] | undefined>>({});

  useEffect(() => {
    if (desmosRef.current === undefined) {
      return;
    }
    const ref = desmosRef.current;

    for (let i = 0; i < 4; i++) {
      const obs = ref.HelperExpression({ latex: `B_{${i}}` });
      obs.observe("listValue", () => {
        setImage((prev) => {
          const next = { ...prev };
          next[i] = [...obs.listValue];
          return next;
        });
      });
    }
    return () => ref.destroy();
  }, [desmosRef]);
  const [result, setResult] = useState<z.output<
    typeof TranslationFormDataSchema
  > | null>(null);

  const handleSolve = useCallback(
    (value: z.output<typeof TranslationFormDataSchema>) => {
      setResult(value);
      plotTranslation(value);
    },
    [plotTranslation]
  );

  return (
    <SplitLayout
      slots={{
        secondary: (
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
        ),
        primary: (
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Stack spacing={2}>
              <Typography
                color="textPrimary"
                sx={{ "&:hover": { textDecorationLine: "underline" } }}
              >
                <Link
                  to="/"
                  style={{ color: "inherit", textDecorationLine: "none" }}
                >
                  {`กลับหน้าแรก`}
                </Link>
              </Typography>
              <Stack spacing={0.5}>
                <Typography component={"div"} variant="h5" fontWeight={700}>
                  {`(การแปลงทางเรขาคณิต)`}
                </Typography>
                <Typography variant="h5" component={"div"} fontWeight={700}>
                  {`การเลื่อนขนาน`}
                </Typography>
              </Stack>
              <TranslationForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={700}>{"ผลลัพธ์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`เวกเตอร์ของการเลื่อนขนาน:`}</Typography>
                      <MathJax dynamic>
                        {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
                      </MathJax>
                    </>
                  )}
                  {result !== null && (
                    <>
                      <MathJax dynamic>
                        {`เวกเตอร์ของการเลื่อนขนาน: $\\begin{bmatrix} ${result.translation.x} \\\\ ${result.translation.y}\\end{bmatrix}$`}
                      </MathJax>
                      <MathJax dynamic>
                        {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
                      </MathJax>
                      <CoordinateResultDisplay
                        preImages={result.points}
                        imageMap={image}
                      />
                    </>
                  )}
                </Stack>
              </Collapsible>
              <Collapsible
                title={
                  <Typography fontWeight={600}>
                    {`สมบัติการเลื่อนขนาน`}
                  </Typography>
                }
              >
                <TranslationPropertyBlog />
              </Collapsible>

              <Collapsible
                title={
                  <Typography fontWeight={600}>
                    {`สูตรการเลื่อนขนาน`}
                  </Typography>
                }
              >
                <TranslationFormulaBlog />
              </Collapsible>
              <AttributionBlog />
            </Stack>
          </Paper>
        ),
      }}
    />
  );
}
