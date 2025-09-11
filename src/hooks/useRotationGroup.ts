import type { Vec2D } from "@/types";
import { useCallback, useRef, useState } from "react";

export const validateNum = (n: string) => {
  const pN = Number(n);
  return n.trim().length > 0 && !isNaN(pN) && isFinite(pN);
};

export const validateVec = ({ x, y }: Vec2D<string>) => {
  return validateNum(x) && validateNum(y);
};

export const formatNumber = (n: number) => {
  return n.toLocaleString("fullwide", {
    useGrouping: false,
    maximumFractionDigits: 6,
    notation: "standard",
    signDisplay: "auto",
  });
};

export const formatVec = ({ x, y }: Vec2D<number>) => {
  return { x: formatNumber(x), y: formatNumber(y) };
};

export const formatCoord = (vec: Vec2D<number>) => {
  const { x, y } = formatVec(vec);
  return `\\left(${x},${y}\\right)`;
};

export const parseVec = ({ x, y }: Vec2D<string>): Vec2D<number> => {
  return {
    x: Number(x),
    y: Number(y),
  };
};

const PI_OVER_180 = Math.PI / 180;
const degToRad = (n: number) => n * PI_OVER_180;

const computeRotation = (
  preimage: Vec2D<number>, // preimage
  center: Vec2D<number>, // center
  angle: number
): Vec2D<number> => {
  const { x, y } = preimage;
  const { x: a, y: b } = center;

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
  const previousPointsRef = useRef<{ id: number; vec: Vec2D<string> }[]>([]);
  const [angle, setAngle] = useState("90");
  const [direction, setDirection] = useState(1);
  const [points, setPoints] = useState<{ id: number; vec: Vec2D<string> }[]>([
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
            point.id === id ? { id, vec: structuredClone(vec) } : point
          );
        }
        return prev;
      });
    },
    []
  );

  const getResult = useCallback(() => {
    if (!validateVec(center)) {
      return [];
    }
    if (!validateNum(angle)) {
      return [];
    }
    if (points.some((point) => !validateVec(point.vec))) {
      return [];
    }

    const pCenter = parseVec(center);
    const pAngle = Number(angle) * direction;

    const result: {
      id: number;
      preimage: Vec2D<number>;
      image: Vec2D<number>;
    }[] = [];
    for (const point of points) {
      const pPoint = parseVec(point.vec);
      result.push({
        id: point.id,
        preimage: pPoint,
        image: computeRotation(pPoint, pCenter, pAngle),
      });
    }
    return result;
  }, [angle, center, direction, points]);

  const reset = useCallback(() => {
    setAngle("90");
    setCenter({ x: "0", y: "0" });
    setDirection(1);
    setPoints((prev) =>
      prev.map(({ id }) => ({
        id,
        vec: { x: "0", y: "0" },
      }))
    );
  }, []);

  return {
    data: {
      angle,
      direction,
      points,
      center,
      previousPointsRef,
    },
    handlers: {
      setAngle,
      setCenter,
      setDirection,
      setPoints,
      removePoint,
      updatePointValue,
      addPoint,
      reset,
    },
    helper: {
      getResult,
    },
  };
};
