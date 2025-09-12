import { Fragment, type FC } from "react";
import { useForm } from "@tanstack/react-form";
import {
  alpha,
  Button,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import z from "zod/v4";

const NumericString = z
  .string()
  .trim()
  .nonempty()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)));

export const TranslationFormDataSchema = z.object({
  points: z.object({ x: NumericString, y: NumericString }).array().max(4),
  translation: z.object({ x: NumericString, y: NumericString }),
});

type Props = {
  onSubmit: (v: z.output<typeof TranslationFormDataSchema>) => unknown;
};
export const TranslationForm: FC<Props> = ({ onSubmit }) => {
  const { Field, handleSubmit, Subscribe, reset, pushFieldValue } = useForm({
    defaultValues: {
      points: [{ x: "1", y: "1" }],
      translation: { x: "2", y: "1" },
    } as z.input<typeof TranslationFormDataSchema>,
    validators: {
      onChange: TranslationFormDataSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <Stack>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Subscribe selector={({ isDefaultValue }) => ({ isDefaultValue })}>
          {({ isDefaultValue }) => (
            <Button
              color="error"
              variant="outlined"
              onClick={() => reset()}
              disabled={isDefaultValue}
            >
              {`คืนค่าเริ่มต้น`}
            </Button>
          )}
        </Subscribe>
      </Toolbar>
      <Grid padding={1} container spacing={0.5}>
        <Grid size={{ sm: 4, xs: 12 }}>
          <Typography>
            <MathJax>{`ขนาดการเลื่อนขนาน $(x,y)$`}</MathJax>
          </Typography>
        </Grid>
        <Grid size={{ sm: 8, xs: 12 }}>
          <Stack useFlexGap spacing={0.5} direction={"row"} flexWrap={"nowrap"}>
            <Field name="translation.x">
              {(field) => (
                <TextField
                  error={field.state.meta.errors.length > 0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  slotProps={{
                    htmlInput: {
                      sx: { fontFamily: "monospace" },
                      type: "number",
                    },
                  }}
                  sx={{ flexBasis: 0, flexGrow: 1 }}
                />
              )}
            </Field>
            <Field name="translation.y">
              {(field) => (
                <TextField
                  error={field.state.meta.errors.length > 0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  slotProps={{
                    htmlInput: {
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
