import { grey } from "@mui/material/colors";
import _ from "lodash";
import { useRef, useEffect, useCallback } from "react";

type AddPointOptions = {
  texName: string;
  index?: string | number;
  label: string;
  tex: string;
  color?: string;
};

export const useDesmos = (selector: string) => {
  const desmosRef = useRef<Desmos.Calculator>(undefined);

  const addPolygon = useCallback(
    (varName: string, pointCount: number, color: string) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const d = desmosRef.current;
      d.setExpression({
        latex: `P_{${varName}} =
          \\left[
            ${_.range(pointCount)
              .map((index) => `${varName}_{${index}}`)
              .join(",")}
          \\right]`,
        hidden: true,
      });

      d.setExpression({
        latex: `M_{X${varName}} = \\operatorname{mean}((P_{${varName}}).x)`,
        hidden: true,
      });

      d.setExpression({
        latex: `M_{Y${varName}} = \\operatorname{mean}((P_{${varName}}).y)`,
        hidden: true,
      });

      d.setExpression({
        latex: `Q_{${varName}} =\\operatorname{arctan}((P_{${varName}}).y - M_{Y${varName}}, (P_{${varName}}).x - M_{X${varName}})`,
        hidden: true,
      });

      d.setExpression({
        latex: `\\operatorname{polygon}(\\operatorname{sort}(P_{${varName}},Q_{${varName}}))`,
        dragMode: "NONE",
        fill: true,
        color,
      });
    },
    []
  );

  const addPoint = useCallback(
    ({ texName, index = undefined, label, tex, color }: AddPointOptions) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const d = desmosRef.current;
      const iden = (sym: string | undefined = undefined) =>
        index === undefined && sym === undefined
          ? texName
          : `${texName}_{${index ?? ""}${sym ?? ""}}`;

      d.setExpressions([
        {
          latex: `${iden("t")} = ${tex}`,
          hidden: true,
        },
        {
          latex: `${iden("x")} = (${iden("t")}).x`,
          hidden: true,
        },
        {
          latex: `${iden("y")} = (${iden("t")}).y`,
          hidden: true,
        },
      ]);

      const pos = `(\${${iden("x")}}, \${${iden("y")}} )`;

      d.setExpression({
        latex: `${iden()} = ${tex}`,
        label: `\`${label}${pos}\``,
        showLabel: true,
        points: true,
        color,
        dragMode: "NONE",
      });
      return iden();
    },
    []
  );

  const addLine = useCallback((names: string[]) => {
    if (desmosRef.current === undefined) {
      return;
    }
    const d = desmosRef.current;
    d.setExpression({
      type: "table",
      columns: [
        {
          latex: "x",
          values: names.map((name) => `(${name}).x`),
          lines: true,
          points: false,
          color: grey["A400"],
          lineStyle: "DASHED",
        },
        {
          latex: "y",
          values: names.map((name) => `(${name}).y`),
          lines: true,
          color: grey["A400"],
          points: false,
          lineStyle: "DASHED",
        },
      ],
    });
  }, []);

  useEffect(() => {
    const root = document.querySelector(selector) as HTMLElement | null;
    if (root === null) {
      return;
    }

    desmosRef.current = Desmos.GraphingCalculator(root, {
      expressions: false, // hide the expression list
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

  const clearGraph = useCallback(() => {
    if (desmosRef.current !== undefined) {
      desmosRef.current.removeExpressions(
        desmosRef.current
          .getExpressions()
          .filter(({ id }) => id !== undefined)
          .map(({ id }) => ({ id: id! }))
      );
    }
  }, [desmosRef]);

  return { desmosRef, clearGraph, addLine, addPoint, addPolygon };
};
