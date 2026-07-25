import z from "zod/v4";
import { NumericString } from "../generic";

export const Schema$ReflectionFormData = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("vertical"),
    value: NumericString,
    points: z
      .object({ x: NumericString, y: NumericString })
      .array()
      .max(4)
      .min(1),
  }),
  z.object({
    type: z.literal("horizontal"),
    value: NumericString,
    points: z
      .object({ x: NumericString, y: NumericString })
      .array()
      .max(4)
      .min(1),
  }),
  z.object({
    type: z.literal("linear"),
    value: z
      .string()
      .trim()
      .normalize()
      .nonempty()
      .refine((arg) => {
        const tokens = arg.split("=");
        return tokens.length === 2;
      })
      .pipe(z.transform((arg) => arg.split("=") as [string, string])),
    points: z
      .object({ x: NumericString, y: NumericString })
      .array()
      .max(4)
      .min(1),
  }),
]);
