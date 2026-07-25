import { theme } from "@/theme";
import { useCallback, useEffect, useState } from "react";
import z from "zod/v4";
import { useDesmos } from "./useDesmos";
import type { Schema$TranslationFormData } from "@/types/schemas/form-data/translation-form";

export const useTranslationGraph = (selector: string) => {
  const { addLine, addPoint, addPolygon, clearGraph, desmosRef } =
    useDesmos(selector);

  const plotTranslation = useCallback(
    (options: z.output<typeof Schema$TranslationFormData>) => {
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
          color: theme.palette.scrapbook.graphPreimage,
        });

        addPoint({
          index: i,
          texName: "B",
          tex: `T(
            ${texName}.x, 
            ${texName}.y
          )`,
          label: `${labelSym}^{\\prime}`,
          color: theme.palette.scrapbook.graphImage,
        });
      }

      if (points.length > 1) {
        addPolygon("A", points.length, theme.palette.scrapbook.graphPreimage);
        addPolygon("B", points.length, theme.palette.scrapbook.graphImage);
      }
    },
    [addLine, addPoint, addPolygon, clearGraph, desmosRef],
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
    plotTranslation,
    image,
  };
};
