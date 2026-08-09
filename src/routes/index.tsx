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
import { RouterLink } from "@/components/router/router-link";
import { DoodleIconFrame } from "@/components/surface/DoodleIconFrame";
import { HeroNotebookSheet } from "@/components/surface/HeroNotebookSheet";
import { TopicCardFrame } from "@/components/surface/TopicCardFrame";
import type { FileRouteTypes } from "@/routeTree.gen";

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
    icon: <FlipRounded />,
    tone: "yellowPale",
    rotation: -0.7,
  },
  {
    label: "การเลื่อนขนาน",
    path: "/translation",
    icon: <TextRotationNoneRounded />,
    tone: "green",
    rotation: 1.3,
  },
  {
    label: "การหมุน",
    path: "/rotation",
    icon: <RotateRightRounded />,
    tone: "pink",
    rotation: -2,
  },
] as const;

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      component="main"
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
          component="section"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Typography
            component="figure"
            variant="h1"
            sx={(t) => ({
              display: "flex",
              padding: { xs: t.spacing(1), md: t.spacing(1.5) },
              color: t.palette.primary.main,
              backgroundColor: t.alpha(t.palette.scrapbook.blueSoft, 0.18),
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: t.alpha(t.palette.scrapbook.blue, 0.54),
              borderRadius: "50%",
              filter: `drop-shadow(${t.spacing(0.375)} ${t.spacing(0.5)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.12)})`,
              transform: "rotate(-5deg)",
            })}
          >
            <ArchitectureRounded />
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            sx={(t) => ({
              display: "inline",
              textWrap: "pretty",
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
        component="nav"
        sx={(t) => ({
          maxWidth: "xl",
          width: "100%",
          margin: t.spacing(0, "auto"),
          paddingTop: { xs: t.spacing(5), md: t.spacing(8) },
        })}
      >
        <Grid
          component="ul"
          container
          columns={{ xs: 1, md: 3 }}
          spacing={{ xs: 4, md: 5 }}
          sx={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {ITEMS.map(({ rotation, tone, icon, path, label }) => (
            <Grid component="li" key={path} size={1}>
              <TopicCardFrame tone={tone} rotation={rotation}>
                <CardActionArea
                  component={RouterLink}
                  to={path}
                  disableRipple
                  sx={(t) => ({
                    padding: { xs: t.spacing(3), md: t.spacing(4) },
                  })}
                >
                  <Stack
                    component="section"
                    sx={{ alignItems: "center" }}
                    spacing={2}
                  >
                    <DoodleIconFrame>{icon}</DoodleIconFrame>
                    <Stack component="header">
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={(t) => ({
                          textDecorationColor: t.alpha(
                            t.palette.scrapbook.blueSoft,
                            0.4,
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
