import { useCallback, useEffect, useRef } from "react";

export const useDesmosGraph = (id: string) => {
  const desmosRef = useRef<Desmos.Calculator>(undefined);
  const circleIdRef = useRef(0);
  const pointIdRef = useRef(0);
  const polygonIdRef = useRef(0);

  useEffect(() => {
    const root = document.querySelector(id) as HTMLElement | null;
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
  }, [id]);

  const addPoint = useCallback(
    (label: string, point: string, color: string, name: string) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const id = pointIdRef.current;
      pointIdRef.current = id + 1;
      desmosRef.current.setExpression({
        id: `point-${id}`,
        showLabel: true,
        points: true,
        dragMode: "NONE",
        label: `\`${label}${point}\``,
        latex: `${name} = ${point}`,
        color,
      });
    },
    []
  );

  const makeCircle = useCallback(
    (center: string, point: string, color: string) => {
      if (desmosRef.current === undefined) {
        return;
      }
      const id = circleIdRef.current;
      circleIdRef.current = id + 1;
      desmosRef.current.setExpression({
        id: `circle-${id}`,
        latex: `(x - ${center}.x)^2 + (y - ${center}.y)^2 = (${point}.x - ${center}.x)^2 + (${point}.y - ${center}.y)^2`,
        dragMode: "NONE",
        showLabel: false,
        lineWidth: 2,
        lineOpacity: 0.2,
        color,
        lines: true,
        lineStyle: "SOLID",
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
    makeCircle,
    makePolygon,
  };
};
