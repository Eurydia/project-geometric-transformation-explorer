import { DoodleIconFrame } from "@/components/surface/DoodleIconFrame";
import { HeroNotebookSheet } from "@/components/surface/HeroNotebookSheet";
import { TopicCardFrame } from "@/components/surface/TopicCardFrame";
import type { FileRouteTypes } from "@/routeTree.gen";
import ArchitectureRounded from "@mui/icons-material/ArchitectureRounded";
import FlipRounded from "@mui/icons-material/FlipRounded";
import RotateRightRounded from "@mui/icons-material/RotateRightRounded";
import TextRotationNoneRounded from "@mui/icons-material/TextRotationNoneRounded";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

const ITEMS: {
  path: FileRouteTypes["fullPaths"];
  icon: ReactNode;
  label: string;
  tone: "yellowPale" | "green" | "pink";
  rotation: number;
}[] = [
  {
    label: "การสะท้อน",
    path: "/reflection",
    icon: <FlipRounded fontSize="inherit" />,
    tone: "yellowPale",
    rotation: 0.75,
  },
  {
    label: "การเลื่อนขนาน",
    path: "/translation",
    icon: <TextRotationNoneRounded fontSize="inherit" />,
    tone: "green",
    rotation: 0.35,
  },
  {
    label: "การหมุน",
    path: "/rotation",
    icon: <RotateRightRounded fontSize="inherit" />,
    tone: "pink",
    rotation: -0.4,
  },
] as const;

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <Box
      sx={(t) => ({
        minHeight: "100vh",
        padding: {
          xs: t.spacing(4, 2),
          sm: t.spacing(4, 3),
          md: t.spacing(7, 3),
          lg: t.spacing(7, 6),
        },
      })}
    >
      <HeroNotebookSheet>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Box
            sx={(t) => ({
              display: "flex",
              padding: { xs: t.spacing(1), md: t.spacing(1.5) },
              color: t.palette.primary.main,
              backgroundColor: t.alpha(t.palette.scrapbook.blueSoft, 0.18),
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: t.alpha(t.palette.scrapbook.blue, 0.54),
              borderRadius: "50%",
              fontSize: {
                xs: t.typography.h2.fontSize,
                md: t.typography.h1.fontSize,
              },
              filter: `drop-shadow(${t.spacing(0.375)} ${t.spacing(0.5)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.12)})`,
              transform: "rotate(-5deg)",
            })}
          >
            <ArchitectureRounded fontSize="inherit" />
          </Box>
          <Typography
            component="div"
            variant="h3"
            sx={(t) => ({
              display: "inline",
              textWrap: "pretty",
              fontWeight: 700,
              textDecorationColor: t.alpha(t.palette.scrapbook.yellow, 0.72),
              textDecorationLine: "underline",
              textDecorationSkipInk: "none",
              textDecorationThickness: t.spacing(2),
              textUnderlineOffset: t.spacing(-1.25),
              textShadow: `${t.spacing(0.125)} ${t.spacing(0.125)} 0 ${t.palette.scrapbook.paper}`,
            })}
          >
            {`การแปลงทางเรขาคณิต`}
          </Typography>
        </Stack>
      </HeroNotebookSheet>

      <Box
        sx={(t) => ({
          maxWidth: "xl",
          width: "100%",
          margin: t.spacing(0, "auto"),
          paddingTop: { xs: t.spacing(5), md: t.spacing(8) },
        })}
      >
        <Grid container columns={{ xs: 1, md: 3 }} spacing={{ xs: 4, md: 5 }}>
          {ITEMS.map(({ rotation, tone, icon, path, label }) => (
            <Grid key={path} size={1}>
              <TopicCardFrame tone={tone} rotation={rotation}>
                <CardActionArea
                  disableRipple
                  onClick={() => navigate({ to: path })}
                  sx={(t) => ({
                    padding: { xs: t.spacing(3), md: t.spacing(4) },
                  })}
                >
                  <Stack sx={{ alignItems: "center" }}>
                    <DoodleIconFrame>{icon}</DoodleIconFrame>
                    <Stack>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={(t) => ({
                          fontWeight: 700,
                          textDecorationColor: t.alpha(
                            t.palette.scrapbook.blueSoft,
                            0.68,
                          ),
                          textDecorationLine: "underline",
                          textDecorationSkipInk: "none",
                          textDecorationThickness: t.spacing(1.5),
                          textUnderlineOffset: t.spacing(-1),
                        })}
                      >
                        {label}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardActionArea>
              </TopicCardFrame>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
