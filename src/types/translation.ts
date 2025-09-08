import z from "zod";

const NumericString = z
  .string()
  .normalize()
  .trim()
  .refine((arg) => !isNaN(Number(arg)));

export const TranslationFormDataSchema = z.object({
  points: z
    .object({ x: NumericString, y: NumericString })
    .array()
    .min(3)
    .max(4),
  translation: z.object({ x: NumericString, y: NumericString }),
});

export type TranstionFormData = z.output<typeof TranslationFormDataSchema>;
