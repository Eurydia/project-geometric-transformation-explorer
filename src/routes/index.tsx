import { createFileRoute } from "@tanstack/react-router";
import {
  FlipRounded,
  RotateRightRounded,
  TextRotationNoneRounded,
} from "@mui/icons-material";
import type { FileRouteTypes } from "@/routeTree.gen";
import { theme } from "@/theme";
import {
  Box,
  Card,
  Grid,
  CardActionArea,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
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
        paddingX={{ xs: 2, lg: 0 }}
        paddingY={8}
        sx={{
          backgroundColor: palette.common.white,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          maxWidth="lg"
          marginX={"auto"}
          sx={{
            textWrap: "pretty",
          }}
        >
          {`การแปลงเรขาคณิต`}
        </Typography>
      </Box>
      <Box
        width="100%"
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, lg: 0 }}
        paddingY={8}
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
                        fontWeight={600}
                        component={"div"}
                      >
                        {label}
                      </Typography>
                      <Typography variant="h6" component={"div"}>
                        {`คำอธิบายเพิ่มเติม`}
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
