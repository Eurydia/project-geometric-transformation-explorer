import {
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  blue,
  deepOrange,
  grey,
} from "@mui/material/colors";
import { useCallback, useEffect, useState } from "react";
import { AngleInput } from "./components/AngleInput";
import { AttributionBlog } from "./components/AttributionBlog";
import { CoordinateForm } from "./components/CoordinateForm";
import { DirectionInput } from "./components/DirectionInput";
import { FormulaBlog } from "./components/FormulaBlog";
import { PropertyBlog } from "./components/PropertyBlog";
import { TransformResultList } from "./components/TransformResultList";
import { useDesmosGraph } from "./hooks/useDesmosGraph";
import {
  formatCoord,
  parseVec,
  useRotationGroup,
  validateNum,
  validateVec,
} from "./hooks/useRotationGroup";
import type { Vec2D } from "./types";

export const App = () => {
  const { data, handlers, helper } = useRotationGroup();
  const { desmosRef, makePoint, makeCircle, makePolygon } =
    useDesmosGraph("#desmos-graph");
  const [result, setResult] = useState<
    | {
        center: Vec2D<number>;
        result: ReturnType<typeof helper.getResult>;
        angle: number;
        direction: number;
      }
    | undefined
  >();

  useEffect(() => {
    if (desmosRef.current === undefined) {
      return;
    }
    if (result === undefined) {
      return;
    }

    const centerCoord = formatCoord(result.center);

    makePoint("O", centerCoord, grey["A700"], "O");

    const imgCoords: string[] = [];
    const preimgCoords: string[] = [];
    for (const { id, image, preimage } of result.result) {
      const preimgCoord = formatCoord(preimage);
      preimgCoords.push(preimgCoord);
      makePoint(
        `A_{${id}}`,
        preimgCoord,
        blue["A400"],
        `A_{${id}}`
      );

      const imgCoord = formatCoord(image);
      imgCoords.push(imgCoord);
      makePoint(
        `A_{${id}}^{\\prime}`,
        imgCoord,
        deepOrange["A700"],
        `B_{${id}}`
      );
      makeCircle("O", `A_{${id}}`, grey["A700"]);
    }
    if (preimgCoords.length >= 3) {
      makePolygon(preimgCoords, blue["A200"]);
      makePolygon(imgCoords, deepOrange["A400"]);
    }
  }, [
    desmosRef,
    makeCircle,
    makePoint,
    makePolygon,
    result,
  ]);

  const handleSolve = useCallback(() => {
    desmosRef.current?.removeExpressions(
      desmosRef.current
        .getExpressions()
        .filter(({ id }) => id !== undefined)
        .map(({ id }) => ({ id: id! }))
    );
    if (
      !validateNum(data.angle) ||
      !validateVec(data.center)
    ) {
      setResult(undefined);
    }

    setResult({
      result: structuredClone(helper.getResult()),
      direction: data.direction,
      angle: Number(data.angle),
      center: parseVec(data.center),
    });
  }, [
    data.angle,
    data.center,
    data.direction,
    desmosRef,
    helper,
  ]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, height: { md: "100vh" } }}
    >
      <Grid
        size={{ md: 4 }}
        sx={{
          maxHeight: { md: "100%" },
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            flexDirection: "column",
            gap: 1,
            display: "flex",
            height: { md: "100%" },
            maxHeight: { md: "100%" },
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            fontWeight={700}
          >
            {`การแปลงทางเรขาคณิต (การหมุน)`}
          </Typography>
          <Toolbar>
            <Button
              variant="outlined"
              color="error"
              onClick={handlers.reset}
            >
              {`คืนค่าเริ่มต้น`}
            </Button>
          </Toolbar>
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
              <CoordinateForm
                key={`point-input-${id}`}
                label={`พิกัดที่ ${id}`}
                value={vec}
                onChange={handlers.updatePointValue(id)}
                endIcon={
                  <Typography
                    component="div"
                    color={
                      data.points.length === 1
                        ? "textDisabled"
                        : "error"
                    }
                    onClick={handlers.removePoint(id)}
                    sx={{
                      "cursor":
                        data.points.length > 1
                          ? "pointer"
                          : "auto",
                      "pointerEvents":
                        data.points.length === 1
                          ? "none"
                          : "auto",
                      "&:hover": {
                        textDecorationLine: "underline",
                      },
                    }}
                  >
                    {`(ลบ)`}
                  </Typography>
                }
              />
            );
          })}

          <Toolbar
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
              disabled={data.points.length >= 4}
              onClick={handlers.addPoint}
            >
              เพิ่มพิกัด
            </Button>
          </Toolbar>
          <TransformResultList data={result} />
          <PropertyBlog />
          <FormulaBlog />
          <AttributionBlog />
        </Paper>
      </Grid>
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          height: { md: "100%" },
        }}
      >
        <Paper
          variant="outlined"
          sx={{ height: "100%" }}
        >
          <div
            id="desmos-graph"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
