import { theme } from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MathJaxContext } from "better-react-mathjax";

export const Route = createRootRoute({ component: RouteComponent });

function RouteComponent() {
  return (
    <MathJaxContext
      config={{
        loader: { load: ["input/asciimath"] },
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
        },
        ignoreHtmlClass: "no-mathjax",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
        <TanStackRouterDevtools />
      </ThemeProvider>
    </MathJaxContext>
  );
}
