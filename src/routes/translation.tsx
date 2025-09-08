import { TranslationForm } from "@/components/form/translation-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Paper } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/translation")({
  component: RouteComponent,
  validateSearch: z,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <SplitLayout
      slots={{
        secondary: <Paper variant="outlined" sx={{ height: "100%" }}></Paper>,
        primary: (
          <Paper variant="outlined" sx={{ height: "100%", padding: 2 }}>
            <TranslationForm
              init={{
                points: [],
                translation: {
                  x: "",
                  y: "",
                },
              }}
              onSubmit={async (e) => {
                console.debug(e);
                await navigate({ to: ".", search: e });
              }}
            />
          </Paper>
        ),
      }}
    />
  );
}
