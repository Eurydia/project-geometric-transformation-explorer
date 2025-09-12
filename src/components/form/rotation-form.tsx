import { alpha, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { Fragment, memo, useMemo, type FC } from "react";
import z from "zod/v4";
import { MathJax } from "better-react-mathjax";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "@/contexts/app-form-context";
import { NumberTextField } from "../form-input/NumberTextField";
import { RotationAnglePresetInput } from "../form-input/rotation-angle-preset-input";
import { RotationDirectionInput } from "../form-input/rotation-direction-input";
import { ArrayItemAddButton } from "../form-input/array-item-add-button";
import { ArrayItemRemoveButton } from "../form-input/arrat-item-remove-button";
import { FormResetButton } from "../form-input/form-reset-button";
import { FormSubmitButton } from "../form-input/form-submit-button";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    NumberTextField,
    ArrayItemAddButton,
    ArrayItemRemoveButton,
    RotationAnglePresetInput,
    RotationDirectionInput,
  },
  formComponents: {
    FormResetButton,
    FormSubmitButton,
  },
});

const NumericString = z
  .string()
  .trim()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

const Coord2D = z.object({ x: NumericString, y: NumericString });

export const RotationFormDataSchema = z.object({
  direction: NumericString,
  angle: NumericString,
  center: Coord2D,
  points: Coord2D.array().min(1).max(4),
});

type Props = {
  onSubmit: (v: z.output<typeof RotationFormDataSchema>) => unknown;
};
export const RotationForm: FC<Props> = memo(({ onSubmit }) => {
  const { AppForm, FormResetButton, FormSubmitButton, AppField } = useAppForm({
    defaultValues: {
      direction: "1",
      angle: "90",
      center: { x: "0", y: "0" },
      points: [{ x: "1", y: "1" }],
    } as z.input<typeof RotationFormDataSchema>,
    validators: { onChange: RotationFormDataSchema },
    onSubmit: ({ value }) => {
      const r = RotationFormDataSchema.safeParse(value);
      if (r.success) {
        onSubmit(r.data);
      }
    },
  });
  const theme = useTheme();

  const alternateColor = useMemo(() => {
    return alpha(theme.palette.primary.light, 0.1);
  }, [theme.palette.primary.light]);

  return (
    <Stack spacing={0.5}>
      <Toolbar>
        <AppForm>
          <FormResetButton />
        </AppForm>
      </Toolbar>
      <Stack spacing={0.5} padding={1}>
        <Typography>{`ทิศทางการหมุน`}</Typography>
        <AppField name="direction">
          {(field) => <field.RotationDirectionInput />}
        </AppField>
      </Stack>
      <Stack spacing={0.5} padding={1} sx={{ backgroundColor: alternateColor }}>
        <Typography sx={{ whiteSpace: "normal", textWrap: "wrap" }}>
          {`ขนาดของมุมที่หมุน (องศา)`}
        </Typography>
        <AppField name="angle">
          {(field) => (
            <Stack spacing={0.5}>
              <field.NumberTextField />
              <field.RotationAnglePresetInput />
            </Stack>
          )}
        </AppField>
      </Stack>
      <Stack spacing={0.5} padding={1}>
        <Typography>
          <MathJax dynamic>{`จุดหมุน $(x,y)$`}</MathJax>
        </Typography>
        <Stack useFlexGap spacing={0.5} direction={"row"} flexWrap={"nowrap"}>
          <AppField name="center.x">
            {(field) => <field.NumberTextField />}
          </AppField>
          <AppField name="center.y">
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
                  key={`point-${index}`}
                  spacing={0.5}
                  padding={1}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? alternateColor : undefined,
                  }}
                >
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography>{`พิกัดที่ ${index + 1}`}</Typography>
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
});
