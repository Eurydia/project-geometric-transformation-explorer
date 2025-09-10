import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Collapsible } from "@/components/surface/Collapsible";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { type TranslationFormData } from "@/types/translation";
import { Paper, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { MathJax } from "better-react-mathjax";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const { plotTranslation } = useTranslationGraph("#desmos");
  const [result, setResult] = useState<TranslationFormData | null>(null);
  const handleSolve = useCallback(
    (value: TranslationFormData | null) => {
      if (value === null) {
        return;
      }
      setResult(value);
      plotTranslation({ points: value.points, translate: value.translation });
    },
    [plotTranslation]
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
              overflowY: "scroll",
              scrollbarWidth: "thin",
            }}
          >
            <Stack spacing={1}>
              <Typography component={"div"} variant="h5" fontWeight={"700"}>
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component={"div"} fontWeight={700}>
                {`การเลื่อนขนาน`}
              </Typography>
              <TranslationForm onSubmit={handleSolve} />
              <Collapsible
                title={<Typography fontWeight={800}>{"ผลลัพท์"}</Typography>}
                children={
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
                        <MathJax>
                          {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
                        </MathJax>
                        <MathJax>
                          {`$$
                          \\begin{align*}
                        ${result.points
                          .map(({ x, y }, i) => {
                            const dx = Number(result.translation.x);
                            const dy = Number(result.translation.y);
                            const char = String.fromCharCode(i + 65);
                            const preImage = `${char}(${x}, ${y})`;
                            const image = `${char}^{\\prime}(${
                              Number(x) + dx
                            }, ${Number(y) + dy})`;
                            return `${preImage} &\\rightarrow ${image}`;
                          })
                          .join("\\\\")}
                        \\end{align*}$$`}
                        </MathJax>
                      </>
                    )}
                  </Stack>
                }
              />
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
