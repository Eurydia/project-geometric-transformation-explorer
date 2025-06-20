import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  blue,
  deepOrange,
  grey,
} from "@mui/material/colors";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AngleInput } from "./components/AngleInput";
import { CoordinateForm } from "./components/CoordinateForm";
import { DirectionInput } from "./components/DirectionInput";
import { TransformResultList } from "./components/TransformResultList";
import { useRotationGroup } from "./hooks/useRotationGroup";
import type { Vec2D } from "./types";

export const App = () => {
  const { data, handlers, helper } = useRotationGroup();

  const desmosRef = useRef<Desmos.Calculator>(undefined);
  const [result, setResult] = useState<{
    center?: Vec2D<string>;
    result: ReturnType<typeof helper.getResult>;
    angle?: string;
    direction: number;
  }>({
    result: [],
    direction: 0,
  });

  useEffect(() => {
    const root = document.querySelector(
      "#desmos-graph"
    ) as HTMLDivElement | null;
    if (root === null) {
      return;
    }

    desmosRef.current = Desmos.GraphingCalculator(root, {
      expressions: false, // hide the expression list
      keypad: false, // hide the on-screen keypad
      settingsMenu: false, // hide the wrench menu
    });

    return () => {
      if (desmosRef.current !== undefined) {
        desmosRef.current!.destroy();
      }
      desmosRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (desmosRef.current === undefined) {
      return;
    }

    if (result.center === undefined) {
      return;
    }

    desmosRef.current.removeExpressions(
      desmosRef.current
        .getExpressions()
        .map(({ id }) => id)
        .filter((id) => id !== undefined)
        .map((id) => ({ id }))
    );
    const { x, y } = result.center;

    desmosRef.current.setExpression({
      id: "pivot",
      label: `\`P(${x}, ${y})\``,
      showLabel: true,
      points: true,
      latex: `P = (${x}, ${y})`,
      dragMode: "NONE",
      color: grey.A700,
    });
    const primeCoords: string[] = [];
    const pointCoords: string[] = [];
    for (const [id, [point, prime]] of Object.entries(
      result.result
    )) {
      const pointXStr = point.x.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 6,
        notation: "standard",
      });
      const pointYStr = point.y.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 6,
        notation: "standard",
      });
      const pointCoord = `\\left(${pointXStr}, ${pointYStr}\\right)`;
      pointCoords.push(pointCoord);
      desmosRef.current.setExpression({
        id: `A${id}-point`,
        showLabel: true,
        label: `\`A_{${id}}${pointCoord}\``,
        points: true,
        latex: `A_{${id}} = ${pointCoord}`,
        dragMode: "NONE",
        color: blue.A200,
      });

      const primeXStr = prime.x.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 6,
        notation: "standard",
      });
      const primeYStr = prime.y.toLocaleString("fullwide", {
        useGrouping: false,
        maximumFractionDigits: 6,
        notation: "standard",
      });
      const primeCoord = `\\left(${primeXStr}, ${primeYStr}\\right)`;
      primeCoords.push(primeCoord);
      desmosRef.current.setExpression({
        id: `A${id}-prime`,
        showLabel: true,
        label: `\`A^{\\prime}_{${id}}${primeCoord}\``,
        points: true,
        latex: primeCoord,
        dragMode: "NONE",
        color: deepOrange.A700,
      });

      desmosRef.current.setExpression({
        id: `A${id}-circle`,
        latex: `(x - P.x)^2 + (y - P.y)^2 = (A_{${id}}.x - P.x)^2 + (A_{${id}}.y - P.y)^2`,
        dragMode: "NONE",
        lineOpacity: 0.5,
        color: grey.A700,
      });
      if (pointCoords.length === 3) {
        desmosRef.current.setExpression({
          id: `point-polygon`,
          latex: `\\operatorname{polygon}\\left(${pointCoords.join(
            ", "
          )}\\right)`,
          dragMode: "NONE",
          fill: true,
          color: blue.A200,
          fillOpacity: 0.7,
        });
        desmosRef.current.setExpression({
          id: `prime-polygon`,
          latex: `\\operatorname{polygon}\\left(${primeCoords.join(
            ","
          )}\\right)`,
          dragMode: "NONE",
          color: deepOrange.A700,
          fill: true,
          fillOpacity: 0.7,
        });
      }
    }
  }, [result]);

  const handleSolve = useCallback(
    () =>
      setResult({
        result: structuredClone(helper.getResult()),
        direction: data.direction,
        angle: data.angle,
        center: structuredClone(data.center),
      }),
    [data.angle, data.center, data.direction, helper]
  );

  return (
    <Box>
      <Grid container>
        <Grid size={{ md: 4 }}>
          <Paper
            square
            variant="outlined"
            sx={{
              maxHeight: "100vh",
              height: "100vh",
              overflowY: "auto",
              scrollbarGutter: "stable",
              scrollbarWidth: "thin",
            }}
          >
            <Stack
              spacing={2}
              sx={{ padding: 2 }}
            >
              <Paper
                variant="outlined"
                square
                sx={{
                  padding: 2,
                  flexDirection: "column",
                  gap: 2,
                  display: "flex",
                }}
              >
                <DirectionInput
                  value={data.direction}
                  onChange={handlers.setDirection}
                />
                <AngleInput
                  value={data.angle}
                  onChange={handlers.setAngle}
                />
                <CoordinateForm
                  label="จุดหมุน $(x,y)$"
                  value={data.center}
                  onChange={handlers.setCenter}
                />
                {data.points.map(({ vec, id }) => {
                  return (
                    <Grid
                      container
                      key={`t-point-${id}`}
                      spacing={0.5}
                    >
                      <Grid size={{ md: 10 }}>
                        <CoordinateForm
                          label={`พิกัดที่ ${id}`}
                          value={vec}
                          onChange={handlers.updatePointValue(
                            id
                          )}
                        />
                      </Grid>
                      <Grid
                        size={{ md: 2 }}
                        sx={{
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Button
                          color="error"
                          disabled={
                            data.points.length === 1
                          }
                          disableElevation
                          disableRipple
                          onClick={handlers.removePoint(id)}
                        >
                          ลบ
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
                <Toolbar
                  variant="dense"
                  disableGutters
                  sx={{
                    justifyContent: "space-between",
                    gap: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    disableRipple
                    onClick={handleSolve}
                  >
                    คำนวณ
                  </Button>
                  <Button
                    variant="outlined"
                    disableElevation
                    disableRipple
                    disabled={data.points.length >= 3}
                    onClick={handlers.addPoint}
                  >
                    เพิ่มพิกัด
                  </Button>
                </Toolbar>
              </Paper>
              <Paper
                square
                sx={{ padding: 2 }}
                variant="outlined"
              >
                <Typography variant="h5">
                  {`ผลลัพธ์`}
                </Typography>
                <TransformResultList {...result} />
              </Paper>
            </Stack>
          </Paper>
        </Grid>
        <Grid
          size={{ md: 8 }}
          sx={{ height: "100vh" }}
        >
          <div
            id="desmos-graph"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

