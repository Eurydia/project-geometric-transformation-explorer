import { blue, deepOrange } from "@mui/material/colors";
import { useCallback } from "react";
import z from "zod/v4";
import { useDesmos } from "./useDesmos";
import type { TranslationFormDataSchema } from "@/components/form/translation-form";

export const useTranslationGraph = (selector: string) => {
  const { addLine, addPoint, addPolygon, clearGraph, desmosRef } =
    useDesmos(selector);

  const plotTranslation = useCallback(
    (options: z.output<typeof TranslationFormDataSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }

      clearGraph();

      const d = desmosRef.current;
      const { points, translation } = options;

      d.setExpressions([
        {
          latex: `T(x,y) = (  
              x + ${translation.x} , 
              y + ${translation.y}
          )`,
          hidden: true,
        },
      ]);

      for (const [i, p] of points.entries()) {
        const labelSym = String.fromCharCode(65 + i);

        addLine([`A_{${i}}`, `B_{${i}}`]);

        const texName = addPoint({
          index: i,
          texName: "A",
          tex: `(${p.x}, ${p.y})`,
          label: labelSym,
          color: blue["A400"],
        });

        addPoint({
          index: i,
          texName: "B",
          tex: `T(
            ${texName}.x, 
            ${texName}.y
          )`,
          label: `${labelSym}^{\\prime}`,
          color: deepOrange["A400"],
        });
      }

      if (points.length > 1) {
        addPolygon("A", points.length, blue["A400"]);
        addPolygon("B", points.length, deepOrange["A400"]);
      }
    },
    [addLine, addPoint, addPolygon, clearGraph, desmosRef]
  );

  return {
    plotTranslation,
    desmosRef,
  };
};
