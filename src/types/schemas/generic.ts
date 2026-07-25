import { z } from "zod/v4";

export const NumericString = z
  .string()
  .trim()
  .normalize()
  .nonempty()
  .refine((arg) => Number.isFinite(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

export const Coord2D = z.object({ x: NumericString, y: NumericString });
