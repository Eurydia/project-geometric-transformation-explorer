import type { Vec2D } from "@/types";
import { useCallback, useRef, useState } from "react";

export const validateNum = (n: string) => {
  const pN = Number(n);
  return n.trim().length > 0 && !isNaN(pN) && isFinite(pN);
};

export const validateVec = ({ x, y }: Vec2D<string>) => {
  return validateNum(x) && validateNum(y);
};

export const parseVec = ({
  x,
  y,
}: Vec2D<string>): Vec2D<number> => {
  return {
    x: Number(x),
    y: Number(y),
  };
};

const PI_OVER_180 = Math.PI / 180;
const degToRad = (n: number) => n * PI_OVER_180;

const computeRotation = (
  { x, y }: Vec2D<number>,
  { x: a, y: b }: Vec2D<number>,
  angle: number
): Vec2D<number> => {
  const shiftX = x - a;
  const shiftY = y - b;
  const angleRad = degToRad(angle);
  const sinTheta = Math.sin(angleRad);
  const cosTheta = Math.cos(angleRad);

  const xPrime = a + shiftX * cosTheta + shiftY * sinTheta;

  const yPrime = b - shiftX * sinTheta + shiftY * cosTheta;
  return { x: xPrime, y: yPrime };
};

export const useRotationGroup = () => {
  const pointIdRef = useRef(2);

  const [angle, setAngle] = useState("90");
  const [direction, setDirection] = useState(1);
  const [points, setPoints] = useState<
    { id: number; vec: Vec2D<string> }[]
  >([
    {
      id: 1,
      vec: { x: "1", y: "0" },
    },
  ]);
  const [center, setCenter] = useState<Vec2D<string>>({
    x: "0",
    y: "0",
  });

  const addPoint = useCallback(() => {
    setPoints((prev) => {
      return prev.concat({
        id: pointIdRef.current++,
        vec: { x: "0", y: "0" },
      });
    });
  }, []);

  const removePoint = useCallback(
    (id: number) => () => {
      setPoints((prev) => {
        if (prev.some((point) => point.id === id)) {
          return prev.filter((point) => point.id !== id);
        }
        return prev;
      });
    },
    []
  );

  const updatePointValue = useCallback(
    (id: number) => (vec: Vec2D<string>) => {
      setPoints((prev) => {
        if (prev.some((point) => point.id === id)) {
          return prev.map((point) =>
            point.id === id
              ? { id, vec: structuredClone(vec) }
              : point
          );
        }
        return prev;
      });
    },
    []
  );

  const getResult = useCallback(() => {
    if (!validateVec(center)) {
      return {};
    }
    if (!validateNum(angle)) {
      return {};
    }
    if (points.some((point) => !validateVec(point.vec))) {
      return {};
    }

    const pCenter = parseVec(center);
    const pAngle = Number(angle) * direction;

    const result: Record<
      number,
      [Vec2D<number>, Vec2D<number>]
    > = {};
    for (const point of points) {
      const pPoint = parseVec(point.vec);
      result[point.id] = [
        pPoint,
        computeRotation(pPoint, pCenter, pAngle),
      ];
    }
    return result;
  }, [angle, center, direction, points]);

  return {
    data: {
      angle,
      direction,
      points,
      center,
    },
    handlers: {
      setAngle,
      setCenter,
      setDirection,
      setPoints,
      removePoint,
      updatePointValue,
      addPoint,
    },
    helper: {
      getResult,
    },
  };
};
