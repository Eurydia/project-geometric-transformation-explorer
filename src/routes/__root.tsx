import { theme } from "@/theme";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { MathJaxContext } from "better-react-mathjax";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        userSelect: "none",
      },
    }}
  />
);

const RouteComponent = () => (
  <>
    <MathJaxContext
      config={{
        loader: { load: ["input/asciimath"] },
        tex: {
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]],
        },
        ignoreHtmlClass: "no-mathjax",
      }}
      hideUntilTypeset="every"
    >
      <ThemeProvider theme={theme}>
        {globalStyles}
        <CssBaseline />
        <Outlet />
        <TanStackRouterDevtools />
      </ThemeProvider>
    </MathJaxContext>
  </>
);

export const Route = createRootRoute({ component: RouteComponent });
