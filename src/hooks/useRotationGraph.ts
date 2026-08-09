import { useCallback, useEffect, useState } from "react";
import type z from "zod";
import { theme } from "@/theme";
import type { Schema$RotationFormData } from "@/types/schemas/form-data/rotation-form.schema";
import { useDesmos } from "./useDesmos";

export const useRotationGraph = (selector: string) => {
  const { addPoint, addPolygon, clearGraph, desmosRef } = useDesmos(selector);

  const plotRotation = useCallback(
    (v: z.output<typeof Schema$RotationFormData>) => {
      if (desmosRef.current === undefined) {
        return;
      }
      clearGraph();

      const { angle, center, direction, points } = v;
      const d = desmosRef.current;

      addPoint({
        texName: "O",
        tex: `(${center.x} , ${center.y})`,
        label: "O",
        color: theme.palette.scrapbook.graphLine,
      });
      d.setExpressions([
        {
          type: "expression",
          latex: "a=O.x",
          hidden: true,
        },
        {
          type: "expression",
          latex: "b=O.y",
          hidden: true,
        },
        {
          type: "expression",
          latex: `A_{rad} = (  (${direction})(${angle})(\\pi) ) / -180`,
          hidden: true,
        },
        {
          type: "expression",
          latex: `A_{sin} = \\sin(A_{rad})`,
          hidden: true,
        },
        {
          type: "expression",
          latex: `A_{cos} = \\cos(A_{rad})`,
          hidden: true,
        },
        {
          type: "expression",
          latex: `T(u,v)=(  
              a + (u-a)(A_{cos}) - (v-b)(A_{sin}) , 
              b + (u-a)(A_{sin}) + (v-b)(A_{cos}) 
          )`,
          hidden: true,
        },
      ]);

      for (const [i, p] of points.entries()) {
        const sym = String.fromCharCode(65 + i);
        const texSym = `(A_{${i}})`;

        d.setExpressions([
          {
            latex: `(x - O.x)^2 + (y - O.y)^2 = ( ${texSym}.x - O.x)^2 + ( ${texSym}.y - O.y)^2`,
            dragMode: "NONE",
            showLabel: false,
            lineWidth: 2,
            lineOpacity: 0.2,
            lines: true,
            lineStyle: "SOLID",
            color: theme.palette.scrapbook.graphLine,
          },
        ]);

        addPoint({
          index: i,
          texName: "A",
          tex: `(${p.x}, ${p.y})`,
          label: sym,
          color: theme.palette.scrapbook.graphPreimage,
        });
        addPoint({
          index: i,
          texName: "B",
          tex: `T(  ${texSym}.x , 
                    ${texSym}.y   
          )`,
          label: `${sym}^{\\prime}`,
          color: theme.palette.scrapbook.graphImage,
        });
      }
      if (points.length > 1) {
        addPolygon("A", points.length, theme.palette.scrapbook.graphPreimage);
        addPolygon("B", points.length, theme.palette.scrapbook.graphImage);
      }
    },
    [addPoint, addPolygon, clearGraph, desmosRef],
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
    return () => ref.destroy();
  }, [desmosRef]);

  return {
    plotRotation,
    image,
  };
};
