import { type FC } from "react";
import { useForm } from "@tanstack/react-form";
import {
  alpha,
  Button,
  Grid,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  TranslationFormDataSchema,
  type TranslationFormData,
} from "@/types/translation";

type Props = {
  onSubmit: (v: TranslationFormData) => unknown;
};
export const TranslationForm: FC<Props> = ({ onSubmit }) => {
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: TranslationFormDataSchema.parse({}),
    validators: {
      onChange: TranslationFormDataSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <Stack>
      <Grid spacing={1} container padding={1}>
        <Grid size={{ md: 4 }}>
          <Typography>
            <MathJax>{`Translation $(x,y)$`}</MathJax>
          </Typography>
        </Grid>
        <Grid size={{ md: 8 }}>
          <Stack spacing={0.5} direction={"row"}>
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
      <Field name="points" mode="array">
        {(field) => (
          <Stack width={"100%"}>
            {field.state.value.map((_, index) => (
              <Grid
                key={`translate-point-${index}`}
                spacing={1}
                container
                padding={1}
                sx={{
                  backgroundColor: ({ palette: { primary } }) =>
                    index % 2 === 1 ? undefined : alpha(primary.light, 0.1),
                }}
              >
                <Grid size={{ md: 4 }}>
                  <Stack spacing={0.5}>
                    <Typography>
                      <MathJax>{`Point ${index + 1}`}</MathJax>
                    </Typography>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      color="error"
                      component={"div"}
                      tabIndex={0}
                      onClick={() => field.removeValue(index)}
                      width={"fit-content"}
                    >
                      (remove)
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ md: 8 }}>
                  <Stack spacing={0.5} direction="row">
                    <Field name={`points[${index}].x`}>
                      {(subField) => (
                        <TextField
                          error={subField.state.meta.errors.length > 0}
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          onBlur={subField.handleBlur}
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
                    <Field name={`points[${index}].y`}>
                      {(subField) => (
                        <TextField
                          error={subField.state.meta.errors.length > 0}
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          onBlur={subField.handleBlur}
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
            ))}
            <Toolbar>
              <Subscribe selector={({ values }) => ({ values })}>
                {({ values }) => (
                  <Button
                    disabled={values.points.length >= 4}
                    variant="outlined"
                    onClick={() => field.pushValue({ x: "", y: "" })}
                  >
                    add point
                  </Button>
                )}
              </Subscribe>
            </Toolbar>
          </Stack>
        )}
      </Field>

      <Toolbar>
        <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
          {({ canSubmit }) => (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              submit
            </Button>
          )}
        </Subscribe>
      </Toolbar>
    </Stack>
  );
};
