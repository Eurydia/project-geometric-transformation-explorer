import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { ReflectionFormulaBlog } from "@/components/blogs/reflection-formula-blog";
import { ReflectionPropertyBlog } from "@/components/blogs/reflection-property-blog";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import {
  ReflectionForm,
  ReflectionFormDataSchema,
} from "@/components/form/reflection-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Collapsible } from "@/components/surface/Collapsible";
import { useReflectionGraph } from "@/hooks/useReflectionGraph";
import { Stack, Paper, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import { useCallback, useEffect, useState } from "react";
import type z from "zod";

export const Route = createFileRoute("/reflection")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<z.output<
    typeof ReflectionFormDataSchema
  > | null>(null);
  const { plotReflection, desmosRef } = useReflectionGraph("#desmos");
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
  const handleSolve = useCallback(
    (v: z.output<typeof ReflectionFormDataSchema>) => {
      setResult(v);
      plotReflection(v);
    },
    [plotReflection]
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
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              scrollbarGutter: "stable",
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
              <Stack spacing={0.5}>
                <Typography variant="h5" component={"div"} fontWeight={700}>
                  {`(การแปลงทางเรขาคณิต)`}
                </Typography>
                <Typography variant="h5" component={"div"} fontWeight={700}>
                  {`การสะท้อน`}
                </Typography>
              </Stack>
              <ReflectionForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={800}>{"ผลลัพธ์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`เส้นการสะท้อน:`}</Typography>
                      <MathJax dynamic>
                        {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
                      </MathJax>
                    </>
                  )}
                  {result !== null && (
                    <>
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
                    </>
                  )}
                </Stack>
              </Collapsible>
              <Collapsible
                title={
                  <Typography fontWeight={600}>{`สมบัติการสะท้อน`}</Typography>
                }
              >
                <ReflectionPropertyBlog />
              </Collapsible>
              <Collapsible
                title={
                  <Typography fontWeight={600}>{`สูตรการสะท้อน`}</Typography>
                }
              >
                <ReflectionFormulaBlog />
              </Collapsible>
              <AttributionBlog />
            </Stack>
          </Paper>
        ),
      }}
    />
  );
}
