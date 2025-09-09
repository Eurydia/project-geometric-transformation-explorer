import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { type TranslationFormData } from "@/types/translation";
import { Paper, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const { plotTranslation, addPolygon, addPoint, addLineSegment, clearGraph } =
    useTranslationGraph("#desmos");

  const handleSolve = useCallback(
    (value: TranslationFormData | null) => {
      if (value === null) {
        return;
      }
      clearGraph();

      plotTranslation({ points: value.points, translate: value.translation });
    },

    [clearGraph, plotTranslation]
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
            <TranslationForm onSubmit={handleSolve} />
          </Paper>
        ),
      }}
    />
  );
}
