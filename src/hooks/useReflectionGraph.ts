import { useCallback } from "react";
import z from "zod";
import { useDesmos } from "./useDesmos";
import type { ReflectionFormDataSchema } from "@/components/form/reflection-form";
import { blue, deepOrange, grey } from "@mui/material/colors";

export const useReflectionGraph = (selector: string) => {
  const { clearGraph, desmosRef, addLine, addPoint, addPolygon } =
    useDesmos(selector);

  const plotVertical = useCallback((d: Desmos.Calculator, value: number) => {
    d.setExpressions([
      {
        latex: `T(x,y)=((2)(${value}) - x,y)`,
        hidden: true,
      },
      {
        latex: `x=${value}`,
        color: grey["A400"],
        lines: true,
        lineStyle: "DASHED",
        lineWidth: 3,
      },
    ]);
  }, []);

  const plotHorizontal = useCallback((d: Desmos.Calculator, value: number) => {
    d.setExpressions([
      {
        latex: `T(x,y)=(x, (2)(${value})-y)`,
        hidden: true,
      },
      {
        latex: `y=${value}`,
        color: grey["A400"],
        lines: true,
        lineStyle: "DASHED",
        lineWidth: 3,
      },
    ]);
  }, []);

  const plotLinearFromString = useCallback(
    (d: Desmos.Calculator, expr: [string, string]) => {
      const [lhs, rhs] = expr;
      d.setExpressions([
        { latex: `G(x,y)=${lhs}-(${rhs})`, hidden: true },
        { latex: `H_{x}(x) = G(x,0)`, hidden: true },
        { latex: `H_{y}(y) = G(0,y)`, hidden: true },
        { latex: `W = H_{x}'(0)`, hidden: true },
        { latex: `X = H_{y}'(0)`, hidden: true },
        { latex: `Y = G(0,0)`, hidden: true },
        { latex: `Z = W^{2} + X^{2}`, hidden: true },
        {
          latex: `T(u,v) = (u - 2W(Wu + Xv + Y)/Z , v - 2X(Wu + Xv + Y)/Z )`,
          hidden: true,
        },
        {
          latex: `${lhs}=${rhs}`,
          lines: true,
          lineStyle: "DASHED",
          lineWidth: 3,
          color: grey["A400"],
        },
      ]);
    },
    []
  );

  const plotReflection = useCallback(
    (options: z.output<typeof ReflectionFormDataSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }
      clearGraph();

      const { points, type, value } = options;
      const d = desmosRef.current;
      switch (type) {
        case "horizontal":
          plotHorizontal(d, value);
          break;
        case "linear":
          plotLinearFromString(d, value);
          break;
        case "vertical":
          plotVertical(d, value);
          break;
      }

      for (const [i, p] of points.entries()) {
        const sym = String.fromCharCode(65 + i);
        addLine([`A_{${i}}`, `B_{${i}}`]);
        addPoint(`A`, i, sym, `(${p.x},${p.y})`, blue["A400"]);
        addPoint(
          `B`,
          i,
          `${sym}\\prime`,
          `T(      (A_{${i}}).x   ,  (A_{${i}}).y   )`,
          deepOrange["A400"]
        );
      }

      if (points.length > 1) {
        addPolygon("A", points.length, blue["A400"]);
        addPolygon("B", points.length, deepOrange["A400"]);
      }
    },
    [
      desmosRef,
      addLine,
      addPoint,
      addPolygon,
      clearGraph,
      plotHorizontal,
      plotLinearFromString,
      plotVertical,
    ]
  );

  return {
    plotReflection,
    desmosRef,
  };
};
