import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import type { Vec2D } from "@/types";
import { type TranslationFormData } from "@/types/translation";
import { Paper, Stack, useTheme } from "@mui/material";
import { blue, deepOrange, grey } from "@mui/material/colors";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const { addPolygon, addPoint, addLineSegment, clearGraph } =
    useTranslationGraph("#desmos");
  const { palette } = useTheme();

  const handleSolve = useCallback(
    (value: TranslationFormData | null) => {
      if (value === null) {
        return;
      }
      clearGraph();

      addPolygon({ points: value.points, color: blue["A100"] });
      addPolygon({
        points: value.points.map((p) => ({
          x: Number(p.x) + Number(value.translation.x),
          y: Number(p.y) + Number(value.translation.y),
        })),
        color: deepOrange["A100"],
      });

      for (const [index, p] of value.points.entries()) {
        const imageP = {
          x: Number(p.x) + Number(value.translation.x),
          y: Number(p.y) + Number(value.translation.y),
        } satisfies Vec2D<number>;

        addLineSegment({
          p,
          lineColor: grey["A400"],
          lineOpacity: 0.4,
        });

        addPoint({
          point: p,
          name: `A_{${index + 1}}`,
          label: `A_{${index + 1}}`,
          color: blue["A200"],
        });

        addPoint({
          point: imageP,
          name: `B_{${index + 1}}`,
          label: `A_{${index + 1}}^{\\prime}`,
          color: deepOrange["A400"],
        });
      }
    },

    [addLineSegment, addPoint, addPolygon, clearGraph]
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
