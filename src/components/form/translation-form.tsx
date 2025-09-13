import { Fragment, type FC } from "react";
import { createFormHook } from "@tanstack/react-form";
import { alpha, Stack, Toolbar, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import z from "zod/v4";
import { fieldContext, formContext } from "@/contexts/app-form-context";
import { ArrayItemAddButton } from "../form-input/array-item-add-button";
import { ArrayItemRemoveButton } from "../form-input/arrat-item-remove-button";
import { FormResetButton } from "../form-input/form-reset-button";
import { FormSubmitButton } from "../form-input/form-submit-button";
import { NumberTextField } from "../form-input/NumberTextField";

const { useAppForm } = createFormHook({
  fieldComponents: {
    ArrayItemAddButton,
    ArrayItemRemoveButton,
    NumberTextField,
  },
  formComponents: {
    FormResetButton,
    FormSubmitButton,
  },
  fieldContext: fieldContext,
  formContext: formContext,
});

const NumericString = z
  .string()
  .trim()
  .nonempty()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

export const TranslationFormDataSchema = z.object({
  points: z.object({ x: NumericString, y: NumericString }).array().max(4),
  translation: z.object({ x: NumericString, y: NumericString }),
});

type Props = {
  onSubmit: (v: z.output<typeof TranslationFormDataSchema>) => unknown;
};
export const TranslationForm: FC<Props> = ({ onSubmit }) => {
  const { FormResetButton, FormSubmitButton, AppField, AppForm } = useAppForm({
    defaultValues: {
      points: [{ x: "1", y: "1" }],
      translation: { x: "2", y: "1" },
    } as z.input<typeof TranslationFormDataSchema>,
    validators: {
      onChange: TranslationFormDataSchema,
    },
    onSubmit: ({ value }) => {
      const r = TranslationFormDataSchema.safeParse(value);
      if (r.success) {
        onSubmit(r.data);
      }
    },
  });

  return (
    <Stack>
      <Toolbar>
        <AppForm>
          <FormResetButton />
        </AppForm>
      </Toolbar>
      <Stack spacing={0.5} padding={1}>
        <Typography>
          <MathJax dynamic>{`เวกเตอร์ของการเลื่อนขนาน $(a,b)$`}</MathJax>
        </Typography>
        <Stack useFlexGap spacing={0.5} direction={"row"} flexWrap={"nowrap"}>
          <AppField name="translation.x">
            {(field) => <field.NumberTextField />}
          </AppField>
          <AppField name="translation.y">
            {(field) => <field.NumberTextField />}
          </AppField>
        </Stack>
      </Stack>
      <Stack>
        <AppField name="points" mode="array">
          {(field) => (
            <Fragment>
              {field.state.value.map((_, index) => (
                <Stack
                  key={`translate-point-${index}`}
                  spacing={0.5}
                  padding={1}
                  sx={{
                    backgroundColor: ({ palette: { primary } }) =>
                      index % 2 === 1 ? undefined : alpha(primary.light, 0.08),
                  }}
                >
                  <Stack
                    width={"100%"}
                    spacing={0.5}
                    direction={"row"}
                    useFlexGap
                    justifyContent={"space-between"}
                  >
                    <Typography>
                      <MathJax dynamic>
                        {index === 0 && `พิกัดที่ ${index + 1} $(x,y)$`}
                        {index !== 0 && `พิกัดที่ ${index + 1}`}
                      </MathJax>
                    </Typography>
                    <field.ArrayItemRemoveButton index={index} />
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <AppField name={`points[${index}].x`}>
                      {(subField) => <subField.NumberTextField />}
                    </AppField>
                    <AppField name={`points[${index}].y`}>
                      {(subField) => <subField.NumberTextField />}
                    </AppField>
                  </Stack>
                </Stack>
              ))}
            </Fragment>
          )}
        </AppField>
      </Stack>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <AppForm>
          <FormSubmitButton />
        </AppForm>
        <AppField name="points">
          {(field) => <field.ArrayItemAddButton />}
        </AppField>
      </Toolbar>
    </Stack>
  );
};
