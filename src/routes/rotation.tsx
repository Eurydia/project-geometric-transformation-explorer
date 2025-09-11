import { createFileRoute } from "@tanstack/react-router";
import { Paper, Stack, Typography } from "@mui/material";
import { AttributionBlog } from "@/components/blogs/AttributionBlog";
import { FormulaBlog } from "@/components/blogs/FormulaBlog";
import { PropertyBlog } from "@/components/blogs/PropertyBlog";
import { CalculatorForm } from "@/components/form/CalculatorForm";
import { SplitLayout } from "@/components/layouts/split-layout";

export const Route = createFileRoute("/rotation")({
  component: RouteComponent,
});

function RouteComponent() {
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
              <CalculatorForm onSubmit={() => {}} />
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
              variant="outlined"
              sx={{
                height: "100%",
              }}
            >
              <div
                id="desmos-graph"
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
