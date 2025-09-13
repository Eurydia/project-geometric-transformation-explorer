import { fieldContext, formContext } from "@/contexts/app-form-context";
import {
  alpha,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { createFormHook } from "@tanstack/react-form";
import { MathJax } from "better-react-mathjax";
import { Fragment, type FC } from "react";
import z from "zod/v4";
import { FormResetButton } from "../form-input/form-reset-button";
import { FormSubmitButton } from "../form-input/form-submit-button";
import { NumberTextField } from "../form-input/NumberTextField";
import { ArrayItemAddButton } from "../form-input/array-item-add-button";
import { ArrayItemRemoveButton } from "../form-input/arrat-item-remove-button";
import { ReflectionEquationTypeInput } from "../form-input/reflection-equation-type-input";

const NumericString = z
  .string()
  .trim()
  .normalize()
  .nonempty()
  .refine((arg) => !isNaN(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

export const ReflectionFormDataSchema = z.discriminatedUnion("type", [
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

const { useAppForm } = createFormHook({
  fieldComponents: {
    NumberTextField,
    ArrayItemAddButton,
    ArrayItemRemoveButton,
    ReflectionEquationTypeInput,
  },
  formComponents: {
    FormResetButton,
    FormSubmitButton,
  },
  fieldContext: fieldContext,
  formContext: formContext,
});

type Props = {
  onSubmit: (v: z.output<typeof ReflectionFormDataSchema>) => unknown;
};
export const ReflectionForm: FC<Props> = ({ onSubmit }) => {
  const { AppField, AppForm, FormResetButton, FormSubmitButton, Subscribe } =
    useAppForm({
      defaultValues: {
        type: "horizontal",
        value: "0",
        points: [{ x: "1", y: "1" }],
      } as z.input<typeof ReflectionFormDataSchema>,
      validators: { onChange: ReflectionFormDataSchema },
      onSubmit: ({ value }) => {
        const res = ReflectionFormDataSchema.safeParse(value);
        if (res.success) {
          onSubmit(res.data);
        }
      },
    });

  return (
    <Stack spacing={0.5}>
      <Toolbar>
        <AppForm>
          <FormResetButton />
        </AppForm>
      </Toolbar>
      <Stack>
        <Typography>{`ประเภทของเส้นสะท้อน`}</Typography>
        <AppField name="type">
          {(field) => <field.ReflectionEquationTypeInput />}
        </AppField>
      </Stack>
      <Subscribe selector={({ values }) => ({ values })}>
        {({ values }) => (
          <Fragment>
            {values.type === "linear" && (
              <Stack
                padding={1}
                spacing={0.5}
                sx={{
                  backgroundColor: ({ palette }) =>
                    alpha(palette.primary.main, 0.08),
                }}
              >
                <Typography>สมการเส้นสะท้อน</Typography>
                <AppField name="value">
                  {({ state, handleBlur, handleChange }) => (
                    <OutlinedInput
                      fullWidth
                      placeholder="y=-x+2"
                      error={state.meta.errors.length > 0}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      slotProps={{
                        input: {
                          sx: { fontFamily: "monospace" },
                        },
                      }}
                    />
                  )}
                </AppField>
              </Stack>
            )}
            {values.type === "vertical" && (
              <Stack
                padding={1}
                spacing={0.5}
                sx={{
                  backgroundColor: ({ palette }) =>
                    alpha(palette.primary.main, 0.08),
                }}
              >
                <Typography>เส้นสะท้อน (แนวตั้ง)</Typography>
                <AppField name="value">
                  {(field) => <field.NumberTextField />}
                </AppField>
              </Stack>
            )}
            {values.type === "horizontal" && (
              <Stack
                padding={1}
                spacing={0.5}
                sx={{
                  backgroundColor: ({ palette }) =>
                    alpha(palette.primary.main, 0.08),
                }}
              >
                <Typography>เส้นสะท้อน (แนวนอน)</Typography>
                <AppField name="value">
                  {(field) => <field.NumberTextField />}
                </AppField>
              </Stack>
            )}
          </Fragment>
        )}
      </Subscribe>
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
                      index % 2 === 0 ? undefined : alpha(primary.light, 0.08),
                  }}
                >
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography>
                      <MathJax>
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
