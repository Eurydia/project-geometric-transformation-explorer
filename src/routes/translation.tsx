import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Collapsible } from "@/components/surface/Collapsible";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { type TranslationFormData } from "@/types/translation";
import { Paper, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
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
          <Paper variant="outlined" sx={{ height: "100%", padding: 2 }}>
            <Typography variant="h5" fontWeight={"700"}>
              {`(การแปลงเรขาคณิต) การเลื่อนขนาน`}
            </Typography>
            <TranslationForm onSubmit={handleSolve} />
            <Collapsible
              title={<Typography>{"result"}</Typography>}
              content={
                <Stack>
                  <Typography component={"span"}>
                    {"translation X:"}
                    {result === null ? (
                      <Typography>{`not ready`}</Typography>
                    ) : (
                      <Typography>
                        {result.translation.x === "0"
                          ? "none"
                          : `${result.translation.x} units`}
                      </Typography>
                    )}
                  </Typography>
                </Stack>
              }
            />
          </Paper>
        ),
      }}
    />
  );
}
