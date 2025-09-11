import { useCallback, useEffect, useRef } from "react";
import { useDesmos } from "./useDesmos";
import { SwipeableDrawer } from "@mui/material";

export const useRotationGraph = (selector: string) => {
  const { addLine, addPoint, addPolygon, clearGraph, desmosRef } =
    useDesmos(selector);

  const makeCircle = useCallback(
    (center: string, point: string, color: string) => {
      if (desmosRef.current === undefined) {
        return;
      }
      desmosRef.current.setExpression({
        latex: `(x - ${center}.x)^2 + (y - ${center}.y)^2 = (${point}.x - ${center}.x)^2 + (${point}.y - ${center}.y)^2`,
        dragMode: "NONE",
        showLabel: false,
        lineWidth: 2,
        lineOpacity: 0.2,
        color,
        lines: true,
        lineStyle: "SOLID",
      });
    },
    []
  );
  const plotRotation = useCallback(() => {
    if (desmosRef.current === undefined) {
      return;
    }

    makePoint("O", centerCoord, grey["A700"], "O");

    const imgCoords: string[] = [];
    const preimgCoords: string[] = [];
    for (const { id, image, preimage } of result.result) {
      const preimgCoord = formatCoord(preimage);
      preimgCoords.push(preimgCoord);
      makePoint(`A_{${id}}`, preimgCoord, blue["A400"], `A_{${id}}`);

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
      makePolygon(imgCoords, deepOrange["A200"]);
    }
  }, [desmosRef, makeCircle, makePoint, makePolygon, result]);

  return {
    desmosRef,
  };
};
