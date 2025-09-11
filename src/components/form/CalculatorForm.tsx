import { Button, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Fragment, memo, type FC } from "react";
import z from "zod/v4";
import { MathJax } from "better-react-mathjax";
import { NumberTextField } from "../form-input/NumberTextField";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "@/contexts/app-form-context";
import { RemoveArrayItemButton } from "../form-input/TypographyButton";
import { RotationAnglePresetInput } from "../form-input/rotation-angle-preset-input";
import { RotationDirectionInput } from "../form-input/rotation-direction-input";

const { useAppForm } = createFormHook({
  fieldComponents: {
    NumberTextField,
    RemoveArrayItemButton,
    RotationAnglePresetInput,
    RotationDirectionInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

const NumericString = z
  .string()
  .trim()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

const Coord2D = z.object({ x: NumericString, y: NumericString });

const RotationFormDataSchema = z.object({
  direction: NumericString,
  angle: NumericString,
  center: Coord2D,
  points: Coord2D.array().min(1).max(4),
});

type Props = {
  onSubmit: (v: z.output<typeof RotationFormDataSchema>) => unknown;
};
export const CalculatorForm: FC<Props> = memo(({ onSubmit }) => {
  const { handleSubmit, AppField, Subscribe, reset, pushFieldValue } =
    useAppForm({
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
  return (
    <Stack spacing={1}>
      <Toolbar>
        <Subscribe selector={({ isDefaultValue }) => ({ isDefaultValue })}>
          {({ isDefaultValue }) => (
            <Button
              disabled={isDefaultValue}
              variant="outlined"
              color="error"
              onClick={() => reset()}
            >
              {`คืนค่าเริ่มต้น`}
            </Button>
          )}
        </Subscribe>
      </Toolbar>
      <Grid container spacing={0.5} padding={1}>
        <Grid size={{ lg: 4, xs: 12 }}>
          <Typography>{`ทิศทางการหมุน`}</Typography>
        </Grid>
        <Grid size={{ lg: 8, xs: 12 }}>
          <AppField name="direction">
            {(field) => <field.RotationDirectionInput />}
          </AppField>
        </Grid>
      </Grid>
      <Grid container spacing={0.5} padding={1}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography>{`ขนาดของมุมที่หมุน (องศา)`}</Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppField name="angle">
            {(field) => (
              <Stack spacing={0.5}>
                <field.NumberTextField />
                <field.RotationAnglePresetInput />
              </Stack>
            )}
          </AppField>
        </Grid>
      </Grid>
      <Grid container spacing={0.5} padding={1}>
        <Grid size={{ lg: 4, xs: 12 }}>
          <Typography>
            <MathJax>{`จุดหมุน $(x,y)$`}</MathJax>
          </Typography>
        </Grid>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Stack useFlexGap spacing={0.5} direction={"row"} flexWrap={"nowrap"}>
            <AppField name="center.x">
              {(field) => <field.NumberTextField />}
            </AppField>
            <AppField name="center.y">
              {(field) => <field.NumberTextField />}
            </AppField>
          </Stack>
        </Grid>
      </Grid>
      <Stack>
        <AppField name="points" mode="array">
          {(field) => (
            <Fragment>
              {field.state.value.map((_, index) => (
                <Grid
                  key={`point-${index}`}
                  spacing={0.5}
                  padding={1}
                  container
                >
                  <Grid size={{ sm: 4, xs: 12 }}>
                    <Stack
                      width={"100%"}
                      spacing={0.5}
                      direction={{ xs: "row", sm: "column" }}
                      useFlexGap
                      justifyContent={{ xs: "space-between" }}
                    >
                      <Typography>
                        <MathJax>{`พิกัดที่ ${index + 1}`}</MathJax>
                      </Typography>
                      <field.RemoveArrayItemButton index={index} />
                    </Stack>
                  </Grid>
                  <Grid size={{ sm: "grow", xs: 12 }}>
                    <Stack spacing={0.5} direction="row">
                      <AppField name={`points[${index}].x`}>
                        {(subField) => <subField.NumberTextField />}
                      </AppField>
                      <AppField name={`points[${index}].y`}>
                        {(subField) => <subField.NumberTextField />}
                      </AppField>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Fragment>
          )}
        </AppField>
      </Stack>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
          {({ canSubmit }) => (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {`คำนวณ`}
            </Button>
          )}
        </Subscribe>
        <Subscribe selector={({ values }) => ({ values })}>
          {({ values }) => (
            <Button
              disabled={values.points.length >= 4}
              variant="outlined"
              onClick={() => pushFieldValue("points", { x: "", y: "" })}
            >
              {`เพิ่มพิกัด`}
            </Button>
          )}
        </Subscribe>
      </Toolbar>
    </Stack>
  );
});
