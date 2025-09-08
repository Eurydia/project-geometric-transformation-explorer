import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useTranslationGraph } from "@/hooks/useTranslationGraph";
import { type TranslationFormData } from "@/types/translation";
import { Button, Paper, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<TranslationFormData | null>(null);
  const { addPoint, addLineSegment, desmosRef } =
    useTranslationGraph("#desmos");

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
            <TranslationForm
              onSubmit={(res) => {
                setResult(res);
              }}
            />
            <Button
              onClick={() => {
                if (desmosRef.current !== undefined) {
                  // addPoint({
                  //   point: { x: 3, y: 2 },
                  //   name: "X",
                  //   label: "K",
                  // });
                  // addPoint({
                  //   point: { x: 1, y: 2 },
                  //   name: "X",
                  //   label: "K",
                  // });
                  addLineSegment({
                    p1: { x: 1, y: 2 },
                    p2: { x: 3, y: 2 },
                    styles: { color: "#898989" },
                  });
                }
              }}
            >
              sdas
            </Button>
          </Paper>
        ),
      }}
    />
  );
}
