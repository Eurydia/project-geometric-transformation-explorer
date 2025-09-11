import {
  alpha,
  Button,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { MathJax } from "better-react-mathjax";
import { Fragment, type FC } from "react";
import z from "zod/v4";

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

type Props = {
  onSubmit: (v: z.output<typeof ReflectionFormDataSchema>) => unknown;
};
export const ReflectionForm: FC<Props> = ({ onSubmit }) => {
  const { Field, Subscribe, handleSubmit, pushFieldValue, reset } = useForm({
    defaultValues: {
      type: "horizontal",
      value: "2",
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
        <Subscribe selector={({ isDefaultValue }) => ({ isDefaultValue })}>
          {({ isDefaultValue }) => (
            <Button
              disabled={isDefaultValue}
              color="error"
              variant="outlined"
              onClick={() => reset()}
            >
              {`คืนค่าเริ่มต้น`}
            </Button>
          )}
        </Subscribe>
      </Toolbar>
      <Grid container spacing={1}>
        <Grid size={{ lg: 4, xs: 12 }}>
          <Typography>ประเภทของเส้นสะท้อน</Typography>
        </Grid>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Field name="type">
            {({ state, handleBlur, handleChange }) => (
              <RadioGroup
                value={state.value}
                onChange={(_, value) =>
                  handleChange(
                    value as z.input<typeof ReflectionFormDataSchema>["type"]
                  )
                }
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value={"horizontal"}
                  control={<Radio />}
                  label={<MathJax>{`แนวแกน $x$`}</MathJax>}
                />
                <FormControlLabel
                  value={"vertical"}
                  control={<Radio />}
                  label={<MathJax>{`แนวแกน $y$`}</MathJax>}
                />
                <FormControlLabel
                  value={"linear"}
                  control={<Radio />}
                  label="สมการเส้นตรง"
                />
              </RadioGroup>
            )}
          </Field>
        </Grid>
      </Grid>
      <Subscribe selector={({ values }) => ({ values })}>
        {({ values }) =>
          values.type === "linear" && (
            <Grid
              padding={1}
              spacing={1}
              container
              sx={{
                backgroundColor: ({ palette }) =>
                  alpha(palette.primary.main, 0.08),
              }}
            >
              <Grid size={{ lg: 4 }}>
                <Typography>สมการเส้นสะท้อน</Typography>
              </Grid>
              <Grid size={{ lg: 8 }}>
                <Field name="value">
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
                </Field>
              </Grid>
            </Grid>
          )
        }
      </Subscribe>
      <Subscribe selector={({ values }) => ({ values })}>
        {({ values }) =>
          values.type === "vertical" && (
            <Grid
              padding={1}
              spacing={1}
              container
              sx={{
                backgroundColor: ({ palette }) =>
                  alpha(palette.primary.main, 0.08),
              }}
            >
              <Grid size={{ lg: 4 }}>
                <Typography>เส้นสะท้อน (แนวตั้ง)</Typography>
              </Grid>
              <Grid size={{ lg: 8 }}>
                <Field name="value">
                  {({ state, handleBlur, handleChange }) => (
                    <OutlinedInput
                      fullWidth
                      placeholder="x=2"
                      error={state.meta.errors.length > 0}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      slotProps={{
                        input: {
                          sx: { fontFamily: "monospace" },
                          type: "number",
                          inputMode: "numeric",
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          )
        }
      </Subscribe>
      <Subscribe selector={({ values }) => ({ values })}>
        {({ values }) =>
          values.type === "horizontal" && (
            <Grid
              spacing={1}
              container
              sx={{
                backgroundColor: ({ palette }) =>
                  alpha(palette.primary.main, 0.08),
              }}
              padding={1}
            >
              <Grid size={{ lg: 4 }}>
                <Typography>เส้นสะท้อน (แนวนอน)</Typography>
              </Grid>
              <Grid size={{ lg: 8 }}>
                <Field name="value">
                  {({ state, handleBlur, handleChange }) => (
                    <OutlinedInput
                      fullWidth
                      placeholder="y=2"
                      error={state.meta.errors.length > 0}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      slotProps={{
                        input: {
                          sx: { fontFamily: "monospace" },
                          type: "number",
                          inputMode: "numeric",
                        },
                      }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          )
        }
      </Subscribe>
      <Stack>
        <Field name="points" mode="array">
          {(field) => (
            <Fragment>
              {field.state.value.map((_, index) => (
                <Grid
                  key={`translate-point-${index}`}
                  spacing={0.5}
                  padding={1}
                  container
                  sx={{
                    backgroundColor: ({ palette: { primary } }) =>
                      index % 2 === 0 ? undefined : alpha(primary.light, 0.08),
                  }}
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
                      <Typography
                        sx={{
                          cursor:
                            field.state.value.length > 1
                              ? "pointer"
                              : undefined,
                        }}
                        color={
                          field.state.value.length > 1
                            ? "error"
                            : "textDisabled"
                        }
                        component={"div"}
                        tabIndex={0}
                        onClick={() => {
                          if (field.state.value.length > 1) {
                            field.removeValue(index);
                          }
                        }}
                        width={"fit-content"}
                      >
                        (ลบ)
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ sm: "grow", xs: 12 }}>
                    <Stack spacing={0.5} direction="row">
                      <Field name={`points[${index}].x`}>
                        {(subField) => (
                          <OutlinedInput
                            error={subField.state.meta.errors.length > 0}
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            onBlur={subField.handleBlur}
                            slotProps={{
                              input: {
                                sx: { fontFamily: "monospace" },
                                type: "number",
                              },
                            }}
                            sx={{ flexBasis: 0, flexGrow: 1 }}
                          />
                        )}
                      </Field>
                      <Field name={`points[${index}].y`}>
                        {(subField) => (
                          <OutlinedInput
                            error={subField.state.meta.errors.length > 0}
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            onBlur={subField.handleBlur}
                            slotProps={{
                              input: {
                                sx: { fontFamily: "monospace" },
                                type: "number",
                              },
                            }}
                            sx={{ flexBasis: 0, flexGrow: 1 }}
                          />
                        )}
                      </Field>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Fragment>
          )}
        </Field>
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
              disableTouchRipple
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
};
