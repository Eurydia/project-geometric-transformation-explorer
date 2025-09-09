import { useCallback, useEffect, useRef } from "react";
import z from "zod";

const StringOrNumber = z
  .union([z.string().pipe(z.transform((arg) => Number(arg))), z.number()])
  .refine((arg) => !isNaN(arg))
  .pipe(z.transform((arg) => arg.toString()));

const Vec2DSchema = z.object({
  x: StringOrNumber,
  y: StringOrNumber,
});

const AddPointOptionsSchema = z.object({
  point: Vec2DSchema,
  name: z.string().nonempty().trim().normalize(),
  label: z.string().nonempty().trim().nonempty(),
  color: z.string().optional().default(undefined),
});

const AddLineSegmentOptionsSchema = z.object({
  p1: Vec2DSchema,
  p2: Vec2DSchema,
  lineColor: z.string().optional().default(undefined),
  lineOpacity: z.number().min(0).max(1).optional(),
});

const AddPolygonOptionsSchema = z.object({
  points: Vec2DSchema.array(),
  color: z.string().optional().default(undefined),
});

const PlotTranslationOptionSchema = z.object({
  points: Vec2DSchema.array(),
  translate: Vec2DSchema,
});

export const useTranslationGraph = (selector: string) => {
  const desmosRef = useRef<Desmos.Calculator>(undefined);
  const pointIdRef = useRef(0);
  const polygonIdRef = useRef(0);
  const lineIdRef = useRef(0);

  useEffect(() => {
    const root = document.querySelector(selector) as HTMLElement | null;
    if (root === null) {
      return;
    }

    desmosRef.current = Desmos.GraphingCalculator(root, {
      // expressions: false, // hide the expression list
      keypad: false, // hide the on-screen keypad
      settingsMenu: false, // hide the wrench menu
    });

    return () => {
      if (desmosRef.current !== undefined) {
        desmosRef.current!.destroy();
      }
      desmosRef.current = undefined;
    };
  }, [selector]);

  const addPoint = useCallback(
    (options: z.input<typeof AddPointOptionsSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const result = AddPointOptionsSchema.safeParse(options);
      if (!result.success) {
        return;
      }

      const { name, point: pointRaw, label, color } = result.data;
      const point = `(${pointRaw.x}, ${pointRaw.y})`;

      const id = pointIdRef.current;
      pointIdRef.current = id + 1;

      desmosRef.current.setExpression({
        id: `point_${id}`,
        latex: `${name} = ${point}`,
        showLabel: true,
        points: true,
        dragMode: "NONE",
        label: `\`${label}${point}\``,
        color,
      });
    },
    []
  );

  const addLineSegment = useCallback(
    (options: z.input<typeof AddLineSegmentOptionsSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const result = AddLineSegmentOptionsSchema.safeParse(options);
      if (!result.success) {
        return;
      }

      const { p1, p2, lineColor, lineOpacity } = result.data;
      const id = lineIdRef.current;
      lineIdRef.current = id + 1;

      desmosRef.current.setExpression({
        type: "table",
        id: `lineSegment_${id}`,
        columns: [
          {
            latex: "x",
            values: [p1.x, p2.x],
            points: false,
            dragMode: "NONE",
            lines: true,
            lineOpacity,
            color: lineColor,
          },
          {
            latex: "y",
            values: [p1.y, p2.y],
            points: false,
            dragMode: "NONE",
            lines: true,
            lineOpacity,
            color: lineColor,
          },
        ],
      });
    },
    []
  );

  const addPolygon = useCallback(
    (option: z.input<typeof AddPolygonOptionsSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }

      const result = AddPolygonOptionsSchema.safeParse(option);
      if (!result.success) {
        return;
      }

      const id = polygonIdRef.current;
      polygonIdRef.current = id + 1;

      const { color, points: pointsRaw } = result.data;

      const points = pointsRaw.map(({ x, y }) => `(${x}, ${y})`);

      desmosRef.current.setExpression({
        id: `pointList_${id}`,
        type: "expression",
        latex: `P_{${id}} =
          \\left[
            ${points.join(",")}
          \\right]`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        id: `pointListMeanX_${id}`,
        latex: `X_{${id}} = \\operatorname{mean}\\left(P_{${id}}.x\\right)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        id: `pointListMeanY_${id}`,
        latex: `Y_{${id}} = \\operatorname{mean}\\left(P_{${id}}.y\\right)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        id: `pointListTheta_${id}`,
        latex: `Q_{${id}} =\\operatorname{arctan}\\left(P_{${id}}.y - Y_{${id}}, P_{${id}}.x - X_{${id}}\\right)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        id: `polygon_${id}`,
        latex: `\\operatorname{polygon}\\left(\\operatorname{sort}\\left(P_{${id}},Q_{${id}}\\right)\\right)`,
        dragMode: "NONE",
        color,
        fill: true,
        fillOpacity: 0.5,
      });
    },
    []
  );

  const clearGraph = useCallback(() => {
    desmosRef.current?.removeExpressions(
      desmosRef.current
        .getExpressions()
        .filter(({ id }) => id !== undefined)
        .map(({ id }) => ({ id: id! }))
    );
  }, []);

  const plotTranslation = useCallback(
    (options: z.input<typeof PlotTranslationOptionSchema>) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const result = PlotTranslationOptionSchema.safeParse(options);
      if (!result.success) {
        return;
      }
      clearGraph();
      const desmos = desmosRef.current;
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
          latex: `A_{${i}}=${p}`,
          label: `\`A_{${i}}${p}\``,
          showLabel: true,
        });

        desmos.setExpression({
          latex: `B_{${i}}=t((A_{${i}}).x,(A_{${i}}).y)`,
          label: `\`A_{${i}}^{\\prime}${pointsImageLatex[i]}\``,
          showLabel: true,
        });

        desmos.setExpression({
          type: "table",
          columns: [
            {
              latex: "x",
              values: [`(A_{${i}}).x`, `(B_{${i}}).x`],
              lines: true,
            },
            {
              latex: "y",
              values: [`(A_{${i}}).y`, `(B_{${i}}).y`],
              lines: true,
            },
          ],
        });
      }

      desmosRef.current.setExpression({
        latex: `P_{A} =
          \\left[
            ${points.map((_, index) => `A_{${index}}`).join(",")}
          \\right]`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `M_{XA} = \\operatorname{mean}((P_{A}).x)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `M_{YA} = \\operatorname{mean}((P_{A}).y)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `Q_{A} =\\operatorname{arctan}((P_{A}).y - M_{YA}, (P_{A}).x - M_{XA})`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `\\operatorname{polygon}(\\operatorname{sort}(P_{A},Q_{A}))`,
        dragMode: "NONE",
        fill: true,
        fillOpacity: 0.5,
      });

      desmosRef.current.setExpression({
        latex: `P_{B} =
          \\left[
            ${points.map((_, index) => `B_{${index}}`).join(",")}
          \\right]`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `M_{XB} = \\operatorname{mean}((P_{B}).x)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `M_{YB} = \\operatorname{mean}((P_{B}).y)`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `Q_{B} =\\operatorname{arctan}((P_{B}).y - M_{YB}, (P_{B}).x - M_{XB})`,
        hidden: true,
      });

      desmosRef.current.setExpression({
        latex: `\\operatorname{polygon}(\\operatorname{sort}(P_{B},Q_{B}))`,
        dragMode: "NONE",
        fill: true,
        fillOpacity: 0.5,
      });
    },
    [clearGraph]
  );

  return {
    desmosRef,
    addPoint,
    addLineSegment,
    addPolygon,
    clearGraph,
    plotTranslation,
  };
};
