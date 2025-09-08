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
  styles: z
    .object({
      color: z.string().optional().default(undefined),
    })
    .optional(),
});

const AddLineSegmentOptionsSchema = z.object({
  p1: Vec2DSchema,
  p2: Vec2DSchema,
  styles: z
    .object({
      color: z.string().optional().default(undefined),
    })
    .optional(),
});

export const useTranslationGraph = (selector: string) => {
  const desmosRef = useRef<Desmos.Calculator>(undefined);
  const pointIdRef = useRef(0);
  const polygonIdRef = useRef(0);

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

      const { name, point: pointRaw, label, styles } = result.data;
      const point = `(${pointRaw.x}, ${pointRaw.y})`;

      const id = pointIdRef.current;
      pointIdRef.current = id + 1;

      desmosRef.current.setExpression({
        latex: `${name} = ${point}`,
        id: `point-${id}`,
        showLabel: true,
        points: true,
        dragMode: "NONE",
        label: `\`${label}${point}\``,
        ...styles,
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

      const { p1, p2, styles } = result.data;
      const id = pointIdRef.current;
      pointIdRef.current = id + 1;

      desmosRef.current.setExpression({
        type: "table",
        columns: [
          {
            latex: "x",
            values: [p1.x, p2.x],
            points: false,
            dragMode: "NONE",
            lines: true,
            lineOpacity: "1",
            lineStyle: "DASHED",
            lineWidth: 2,
            ...styles,
          },
          {
            latex: "y",
            values: [p1.y, p2.y],
            points: false,
            dragMode: "NONE",
            lines: true,
            lineOpacity: "1",
            lineStyle: "DASHED",
            lineWidth: 2,
            ...styles,
          },
        ],
        // latex: `${name} = ${point}`,
        // id: `lineSegment-${id}`,
        // dragMode: "NONE",
        // ...styles,
      });
    },
    []
  );

  const makePolygon = useCallback((coords: string[], color: string) => {
    if (desmosRef.current === undefined) {
      return;
    }

    const id = polygonIdRef.current;
    polygonIdRef.current = id + 1;

    desmosRef.current.setExpression({
      id: `point-list-${id}`,
      latex: `P_{${id}} =
          \\left[
            ${coords.join(",")}
          \\right]`,
      hidden: true,
    });

    desmosRef.current.setExpression({
      id: `mean-x-${id}`,
      latex: `X_{${id}} = \\operatorname{mean}\\left(P_{${id}}.x\\right)`,
      hidden: true,
    });

    desmosRef.current.setExpression({
      id: `mean-y-${id}`,
      latex: `Y_{${id}} = \\operatorname{mean}\\left(P_{${id}}.y\\right)`,
      hidden: true,
    });

    desmosRef.current.setExpression({
      id: `point-theta-${id}`,
      latex: `Q_{${id}} =\\operatorname{arctan}\\left(P_{${id}}.y - Y_{${id}}, P_{${id}}.x - X_{${id}}\\right)`,
      hidden: true,
    });

    desmosRef.current.setExpression({
      id: `polygon-${id}`,
      latex: `\\operatorname{polygon}\\left(\\operatorname{sort}\\left(P_{${id}},Q_{${id}}\\right)\\right)`,
      dragMode: "NONE",
      color,
      fill: true,
      fillOpacity: 0.5,
    });
  }, []);
  return {
    desmosRef,
    addPoint,
    addLineSegment,
  };
};
