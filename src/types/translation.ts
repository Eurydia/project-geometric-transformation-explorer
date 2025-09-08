import z from "zod";

const NormalString = z
  .string()
  .refine((arg) => !isNaN(Number(arg)), { error: "non-numeric string" });

export const TranslationFormDataSchema = z.object({
  points: z
    .object({ x: NormalString, y: NormalString })
    .array()
    .min(3)
    .max(4)
    .default([
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
    ]),
  translation: z
    .object({ x: NormalString, y: NormalString })
    .default({ x: "", y: "" }),
});

export type TranslationFormData = z.output<typeof TranslationFormDataSchema>;
