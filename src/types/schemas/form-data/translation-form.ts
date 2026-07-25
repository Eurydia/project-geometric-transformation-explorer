import { z } from "zod/v4";
import { Coord2D } from "../generic";

export const Schema$TranslationFormData = z.object({
  points: Coord2D.array().max(4),
  translation: Coord2D,
});
