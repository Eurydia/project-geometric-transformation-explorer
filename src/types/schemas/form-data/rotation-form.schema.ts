import z from "zod";
import { NumericString, Coord2D } from "../generic";

export const Schema$RotationFormData = z.object({
  direction: NumericString,
  angle: NumericString,
  center: Coord2D,
  points: Coord2D.array().min(1).max(4),
});
