import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import {
  ReflectionForm,
  ReflectionFormDataSchema,
} from "@/components/form/reflection-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Collapsible } from "@/components/surface/Collapsible";
import { useReflectionGraph } from "@/hooks/useReflectionGraph";
import { Stack, Paper, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import _ from "lodash";
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
          <Stack spacing={1} sx={{ height: "100%" }}>
            <Paper
              variant="outlined"
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
        primary: (
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              scrollbarGutter: "stable",
              scrollbarWidth: "thin",
            }}
          >
            <Stack spacing={2}>
              <Typography component={"div"} variant="h5" fontWeight={700}>
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component={"div"} fontWeight={700}>
                {`การสะท้อน`}
              </Typography>
              <ReflectionForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={800}>{"ผลลัพท์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`เส้นการสะท้อน: ไม่พร้อมแสดง`}</Typography>
                      <MathJax>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่: ไม่พร้อมแสดง`}</MathJax>
                    </>
                  )}
                  {result !== null && (
                    <>
                      {result.type === "horizontal" && (
                        <MathJax>{`เส้นการสะท้อน: $y=${result.value}$`}</MathJax>
                      )}
                      {result.type === "vertical" && (
                        <MathJax>{`เส้นการสะท้อน: $x=${result.value}$`}</MathJax>
                      )}
                      {result.type === "linear" && (
                        <MathJax>{`เส้นการสะท้อน: $${result.value}$`}</MathJax>
                      )}
                      <MathJax>{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
                      <MathJax>
                        {`$$
                          \\begin{align*}
                        ${result.points
                          .map(({ x, y }, i) => {
                            const char = String.fromCharCode(i + 65);
                            const preImageTex = `${char}(${x}, ${y})`;
                            const img = image[i];
                            if (img === undefined) {
                              return `${preImageTex} &\\rightarrow ${char}^{\\prime}(?,?)`;
                            }
                            const [ix, iy] = img;
                            return `${preImageTex} &\\rightarrow ${char}^{\\prime}(${ix},${iy})`;
                          })
                          .join("\\\\")}
                        \\end{align*}$$`}
                      </MathJax>
                    </>
                  )}
                </Stack>
              </Collapsible>
              <Collapsible
                title={
                  <Typography fontWeight={600}>สมบัติการสะท้อน</Typography>
                }
              >
                <Typography>ว่าง</Typography>
              </Collapsible>

              <Collapsible
                title={<Typography fontWeight={600}>สูตรการสะท้อน</Typography>}
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
