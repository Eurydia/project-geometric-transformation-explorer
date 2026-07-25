import type { FileRouteTypes } from "@/routeTree.gen";
import { theme } from "@/theme";
import ArchitectureRounded from "@mui/icons-material/ArchitectureRounded";
import FlipRounded from "@mui/icons-material/FlipRounded";
import RotateRightRounded from "@mui/icons-material/RotateRightRounded";
import TextRotationNoneRounded from "@mui/icons-material/TextRotationNoneRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";

const ITEMS: {
  path: FileRouteTypes["fullPaths"];
  icon: ReactNode;
  label: string;
}[] = [
  {
    label: "การสะท้อน",
    path: "/reflection",
    icon: <FlipRounded fontSize="inherit" />,
  },
  {
    label: "การเลื่อนขนาน",
    path: "/translation",
    icon: <TextRotationNoneRounded fontSize="inherit" />,
  },
  {
    label: "การหมุน",
    path: "/rotation",
    icon: <RotateRightRounded fontSize="inherit" />,
  },
] as const;

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { palette } = useTheme();
  const navigate = Route.useNavigate();
  return (
    <Fragment>
      <Box
        sx={{
          backgroundColor: palette.common.white,
          paddingX: { xs: 2, lg: 0 },
          paddingY: 8,
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ marginX: "auto", maxWidth: "lg", alignItems: "center" }}
        >
          <ArchitectureRounded
            fontSize="inherit"
            sx={{ fontSize: ({ typography }) => typography.h3.fontSize }}
          />
          <Typography
            component={"div"}
            variant="h3"
            sx={{
              textWrap: "pretty",
              fontWeight: 700,
            }}
          >
            {`การแปลงทางเรขาคณิต`}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          maxWidth: "lg",
          width: "100%",
          marginX: { xs: 0, md: "auto" },
          paddingX: { xs: 2, lg: 0 },
          paddingY: 8,
        }}
      >
        <Grid container columns={{ xs: 1, md: 2 }} spacing={4}>
          {ITEMS.map(({ icon, path, label }) => (
            <Grid key={path} size={1}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.2s ease-out",
                  "&:hover": {
                    boxShadow: 20,
                  },
                }}
              >
                <CardActionArea
                  disableRipple
                  onClick={() => navigate({ to: path })}
                  sx={{ padding: 2, height: "100%" }}
                >
                  <Stack sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                        padding: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: theme.typography.h1.fontSize,
                      }}
                    >
                      {icon}
                    </Box>
                    <Stack
                      sx={{
                        flexGrow: 1,
                        flexBasis: 0,
                      }}
                    >
                      <Typography
                        variant="h5"
                        component={"div"}
                        sx={{ fontWeight: 700 }}
                      >
                        {label}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
}
