import { blue, deepOrange, grey } from "@mui/material/colors";
import { useCallback } from "react";
import z from "zod";
import { useDesmos } from "./useDesmos";

const StringOrNumber = z
  .union([z.string().pipe(z.transform((arg) => Number(arg))), z.number()])
  .refine((arg) => !isNaN(arg))
  .pipe(z.transform((arg) => arg.toString()));

const Vec2DSchema = z.object({
  x: StringOrNumber,
  y: StringOrNumber,
});

const PlotTranslationOptionSchema = z.object({
  points: Vec2DSchema.array(),
  translate: Vec2DSchema,
});

export const useReflectionGraph = (selector: string) => {
  const desmos = useDesmos(selector);

  const clearGraph = useCallback(() => {
    desmos?.removeExpressions(
      desmos
        .getExpressions()
        .filter(({ id }) => id !== undefined)
        .map(({ id }) => ({ id: id! }))
    );
  }, [desmos]);

  const plotTranslation = useCallback(
    (options: z.input<typeof PlotTranslationOptionSchema>) => {
      if (desmos === undefined) {
        return;
      }
      const result = PlotTranslationOptionSchema.safeParse(options);
      if (!result.success) {
        return;
      }
      clearGraph();
      const { points, translate } = result.data;

      const pointsLatex = points.map(({ x, y }) => `(${x},${y})`);
      const pointsImageLatex = points.map(
        ({ x, y }) => `(${+x + +translate.x},${+y + +translate.y})`
      );

      desmos.setExpression({
        latex: `t(x,y)=(x+${translate.x},y+${translate.y})`,
      });

      for (const [i, p] of pointsLatex.entries()) {
        desmos.setExpression({
          type: "table",
          columns: [
            {
              latex: "x",
              values: [`(A_{${i}}).x`, `(B_{${i}}).x`],
              lines: true,
              points: false,
              color: grey["A400"],
              lineStyle: "DASHED",
            },
            {
              latex: "y",
              values: [`(A_{${i}}).y`, `(B_{${i}}).y`],
              lines: true,
              color: grey["A400"],
              points: false,
              lineStyle: "DASHED",
            },
          ],
        });
        desmos.setExpression({
          latex: `A_{${i}}=${p}`,
          label: `\`${String.fromCharCode(65 + i)}${p}\``,
          showLabel: true,
          dragMode: "NONE",
          color: blue["A200"],
          points: true,
        });

        desmos.setExpression({
          latex: `B_{${i}}=t((A_{${i}}).x,(A_{${i}}).y)`,
          label: `\`${String.fromCharCode(65 + i)}^{\\prime}${
            pointsImageLatex[i]
          }\``,
          showLabel: true,
          color: deepOrange["A400"],
          points: true,
        });
      }

      if (points.length > 1) {
        desmos.setExpression({
          latex: `P_{A} =
          \\left[
            ${points.map((_, index) => `A_{${index}}`).join(",")}
          \\right]`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `M_{XA} = \\operatorname{mean}((P_{A}).x)`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `M_{YA} = \\operatorname{mean}((P_{A}).y)`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `Q_{A} =\\operatorname{arctan}((P_{A}).y - M_{YA}, (P_{A}).x - M_{XA})`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `\\operatorname{polygon}(\\operatorname{sort}(P_{A},Q_{A}))`,
          dragMode: "NONE",
          fill: true,
          color: blue["A200"],
        });

        desmos.setExpression({
          latex: `P_{B} =
          \\left[
            ${points.map((_, index) => `B_{${index}}`).join(",")}
          \\right]`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `M_{XB} = \\operatorname{mean}((P_{B}).x)`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `M_{YB} = \\operatorname{mean}((P_{B}).y)`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `Q_{B} =\\operatorname{arctan}((P_{B}).y - M_{YB}, (P_{B}).x - M_{XB})`,
          hidden: true,
        });

        desmos.setExpression({
          latex: `\\operatorname{polygon}(\\operatorname{sort}(P_{B},Q_{B}))`,
          dragMode: "NONE",
          color: deepOrange["A400"],
          fill: true,
        });
      }
    },
    [clearGraph, desmos]
  );

  return {
    clearGraph,
    plotTranslation,
  };
};
