import { createFileRoute, Link } from "@tanstack/react-router";
import { Paper, Stack, Typography } from "@mui/material";
import {
  RotationForm,
  RotationFormDataSchema,
} from "@/components/form/rotation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useCallback, useEffect, useState } from "react";
import z from "zod/v4";
import { useRotationGraph } from "@/hooks/useRotationGraph";
import { Collapsible } from "@/components/surface/Collapsible";
import { MathJax } from "better-react-mathjax";
import { CoordinateResultDisplay } from "@/components/data-display/result-display";
import { RotationPropertyBlog } from "@/components/blogs/rotation-property-blog";
import { RotationFormulaBlog } from "@/components/blogs/rotation-formula-blog";

export const Route = createFileRoute("/rotation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<z.output<
    typeof RotationFormDataSchema
  > | null>(null);
  const { plotRotation, desmosRef } = useRotationGraph("#desmos");
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
              padding: 2,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
              maxHeight: "100%",
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
                <Typography variant="h5" component="div" fontWeight={700}>
                  {`(การแปลงทางเรขาคณิต)`}
                </Typography>
                <Typography variant="h5" component="div" fontWeight={700}>
                  {`การหมุน`}
                </Typography>
              </Stack>
              <RotationForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={700}>{"ผลลัพธ์"}</Typography>}
              >
                <Stack>
                  {result === null && (
                    <>
                      <Typography>{`จุดหมุน:`}</Typography>
                      <Typography>{`ขนาดของมุมที่หมุน:`}</Typography>
                      <Typography>{`ทิศทาง:`}</Typography>
                      <MathJax
                        dynamic
                      >{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
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
                      <MathJax
                        dynamic
                      >{`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}</MathJax>
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
                  <Typography fontWeight={600}>{`สูตรการหมุน`}</Typography>
                }
              >
                <RotationPropertyBlog />
              </Collapsible>
              <Collapsible
                title={
                  <Typography fontWeight={600}>{`สมบัติการหมุน`}</Typography>
                }
              >
                <RotationFormulaBlog />
              </Collapsible>
            </Stack>
          </Paper>
        ),
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
      }}
    />
  );
}
