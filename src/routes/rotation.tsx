import { createFileRoute } from "@tanstack/react-router";
import { Paper, Stack, Typography } from "@mui/material";
import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { FormulaBlog } from "@/components/blogs/FormulaBlog";
import { PropertyBlog } from "@/components/blogs/PropertyBlog";
import {
  RotationForm,
  RotationFormDataSchema,
} from "@/components/form/rotation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { useState } from "react";
import z from "zod/v4";
import { useRotationGraph } from "@/hooks/useRotationGraph";
import { useDesmos } from "@/hooks/useDesmos";

export const Route = createFileRoute("/rotation")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState<z.output<
    typeof RotationFormDataSchema
  > | null>(null);

  const { desmosRef, plotRotation } = useRotationGraph("#desmos");

  return (
    <SplitLayout
      slots={{
        primary: (
          <Paper
            sx={{
              height: "100%",
              padding: 2,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5" component="div" fontWeight={700}>
                {`(การแปลงทางเรขาคณิต)`}
              </Typography>
              <Typography variant="h5" component="div" fontWeight={700}>
                {`การหมุน`}
              </Typography>
              <RotationForm onSubmit={plotRotation} />
              {/* <ResultDisplay data={result} /> */}
              <PropertyBlog />
              <FormulaBlog />
              <AttributionBlog />
            </Stack>
          </Paper>
        ),
        secondary: (
          <Stack spacing={1} sx={{ height: "100%" }}>
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
          </Stack>
        ),
      }}
    />
  );
}
