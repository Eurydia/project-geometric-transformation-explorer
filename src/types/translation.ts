import z from "zod";

const NormalString = z
  .string()
  .trim()
  .nonempty()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)), { error: "non-numeric string" });

export const TranslationFormDataSchema = z.object({
  points: z
    .object({ x: NormalString, y: NormalString })
    .optional()
    .array()
    .max(4)
    .optional()
    .default([{ x: "1", y: "1" }]),
  translation: z
    .object({ x: NormalString, y: NormalString })
    .optional()
    .default({ x: "2", y: "3" }),
});

export type TranslationFormData = z.output<typeof TranslationFormDataSchema>;
