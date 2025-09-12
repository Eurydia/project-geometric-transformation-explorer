import { useCallback } from "react";
import { useDesmos } from "./useDesmos";
import type z from "zod";
import type { RotationFormDataSchema } from "@/components/form/rotation-form";
import { blue, deepOrange, grey } from "@mui/material/colors";

export const useRotationGraph = (selector: string) => {
  const { image, addPoint, addPolygon, clearGraph, desmosRef } =
    useDesmos(selector);

  const plotRotation = useCallback(
    (v: z.output<typeof RotationFormDataSchema>) => {
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
        color: grey["A700"],
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
            color: grey["A700"],
          },
        ]);

        addPoint({
          index: i,
          texName: "A",
          tex: `(${p.x}, ${p.y})`,
          label: sym,
          color: blue["A400"],
        });
        addPoint({
          index: i,
          texName: "B",
          tex: `T(  ${texSym}.x , 
                    ${texSym}.y   
          )`,
          label: `${sym}^{\\prime}`,
          color: deepOrange["A400"],
        });
      }
      if (points.length > 1) {
        addPolygon("A", points.length, blue["A400"]);
        addPolygon("B", points.length, deepOrange["A400"]);
      }
    },
    [addPoint, addPolygon, clearGraph, desmosRef]
  );

  return {
    plotRotation,
    image,
  };
};
