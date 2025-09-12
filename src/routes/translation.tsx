import { AttributionBlog } from "@/components/blogs/AttributionBlog";
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
              <Typography component={"div"} variant="h5" fontWeight={"700"}>
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component={"div"} fontWeight={700}>
                {`การเลื่อนขนาน`}
              </Typography>
              <TranslationForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={800}>{"ผลลัพท์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`ขนาดการเลื่อนขนาน: ไม่พร้อมแสดง`}</Typography>
                      <MathJax>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่: ไม่พร้อมแสดง`}</MathJax>
                    </>
                  )}
                  {result !== null && (
                    <>
                      <MathJax>{`ขนาดการเลื่อนขนาน: $(${result.translation.x}, ${result.translation.y})$`}</MathJax>
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
              <Collapsible
                title={
                  <Typography fontWeight={600}>สมบัติการเลื่อนขนาน</Typography>
                }
              >
                <Typography>ว่าง</Typography>
              </Collapsible>

              <Collapsible
                title={
                  <Typography fontWeight={600}>สูตรการเลื่อนขนาน</Typography>
                }
              >
                <Typography>ว่าง</Typography>
              </Collapsible>
              <AttributionBlog />
            </Stack>
          </Paper>
        ),
      }}
    />
  );
}
