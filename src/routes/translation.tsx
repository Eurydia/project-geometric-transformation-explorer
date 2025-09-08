import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { type TranslationFormData } from "@/types/translation";
import { Paper, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<TranslationFormData | null>(null);

  return (
    <SplitLayout
      slots={{
        secondary: (
          <Paper variant="outlined" sx={{ height: "100%" }}>
            <Typography component="pre">
              {JSON.stringify(result, null, 4)}
            </Typography>
          </Paper>
        ),
        primary: (
          <Paper variant="outlined" sx={{ height: "100%", padding: 2 }}>
            <TranslationForm
              onSubmit={(res) => {
                setResult(res);
              }}
            />
          </Paper>
        ),
      }}
    />
  );
}
