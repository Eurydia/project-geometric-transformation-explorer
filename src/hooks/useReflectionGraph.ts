import { useCallback, useEffect, useState } from "react";
import type z from "zod";
import { theme } from "@/theme";
import type { Schema$ReflectionFormData } from "@/types/schemas/form-data/reflection-form";
import { useDesmos } from "./useDesmos";

export const useReflectionGraph = (selector: string) => {
  const { clearGraph, desmosRef, addLine, addPoint, addPolygon } =
    useDesmos(selector);

  const plotVertical = useCallback((d: Desmos.Calculator, value: number) => {
    d.setExpressions([
      {
        latex: `T(x,y) = ( 
          (2)(${value}) - x ,
          y
        )`,
        hidden: true,
      },
      {
        latex: `x=${value}`,
        color: theme.palette.scrapbook.graphReference,
        lines: true,
        lineWidth: 4,
      },
    ]);
  }, []);

  const plotHorizontal = useCallback((d: Desmos.Calculator, value: number) => {
    d.setExpressions([
      {
        latex: `T(x,y) = (
          x , 
          (2)(${value}) - y
        )`,
        hidden: true,
      },
      {
        latex: `y=${value}`,
        color: theme.palette.scrapbook.graphReference,
        lines: true,
        lineWidth: 4,
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
          color: theme.palette.scrapbook.graphReference,
          lines: true,
          lineWidth: 4,
        },
      ]);
    },
    [],
  );

  const plotReflection = useCallback(
    (options: z.output<typeof Schema$ReflectionFormData>) => {
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

        addPoint({
          index: i,
          texName: `A`,
          tex: `(${p.x},${p.y})`,
          label: sym,
          color: theme.palette.scrapbook.graphPreimage,
        });
        addPoint({
          index: i,
          texName: `B`,
          tex: `T(
            (A_{${i}}).x, 
            (A_{${i}}).y   
          )`,
          label: `${sym}\\prime`,
          color: theme.palette.scrapbook.graphImage,
        });
      }

      if (points.length > 1) {
        addPolygon("A", points.length, theme.palette.scrapbook.graphPreimage);
        addPolygon("B", points.length, theme.palette.scrapbook.graphImage);
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
    ],
  );

  const [image, setImage] = useState<Record<number, number[] | undefined>>({});

  useEffect(() => {
    if (desmosRef.current === undefined) {
      return;
    }
    const ref = desmosRef.current;

    for (let i = 0; i < 4; i++) {
      const obs = ref.HelperExpression({ latex: `B_{${i}}` });
      obs.observe("listValue", () => {
        setImage((prev) => {
          const next = { ...prev };
          next[i] = [...obs.listValue];
          return next;
        });
      });
    }
    return () => {
      ref.destroy();
    };
  }, [desmosRef]);

  return {
    image,
    plotReflection,
  };
};
