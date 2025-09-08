import { type FC } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { NumberTextField } from "../form-input/NumberTextField";

type Props = {
  init: {
    points: { x: string; y: string }[];
    translation: { x: string; y: string };
  };
  onSubmit: (v: Props["init"]) => unknown;
};
export const TranslationForm: FC<Props> = ({ init, onSubmit }) => {
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: init,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
    canSubmitWhenInvalid: true,
    // validators: {
    //   onChange: z.object({
    //     translation: z.object({
    //       x: z.string().nonempty(),
    //       y: z.string().nonempty(),
    //     }),
    //     points: z
    //       .object({
    //         x: z.string().normalize().nonempty(),
    //         y: z.string().normalize().nonempty(),
    //       })
    //       .array()
    //       .min(3)
    //       .max(4),
    //   }),
    // },
  });
  return (
    <Stack spacing={2}>
      <Grid spacing={1} container>
        <Grid size={{ md: 4 }}>
          <Typography>Translation</Typography>
        </Grid>
        <Grid size={{ md: 8 }}>
          <Stack spacing={0.5} direction={"row"}>
            <Field name="translation.x">
              {(field) => (
                <NumberTextField
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors.length > 0}
                />
              )}
            </Field>
            <Field name="translation.y">
              {(field) => (
                <NumberTextField
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors.length > 0}
                />
              )}
            </Field>
          </Stack>
        </Grid>
      </Grid>
      <Field name="points" mode="array">
        {(field) => (
          <Stack spacing={1} width={"100%"} divider={<Divider flexItem />}>
            {field.state.value.map((_, index) => (
              <Grid key={index} spacing={1} container>
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
                  <Stack spacing={1} direction={"row"}>
                    <Field name={`points[${index}].x`}>
                      {(subField) => (
                        <TextField
                          placeholder="x"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          onBlur={subField.handleBlur}
                        />
                      )}
                    </Field>
                    <Field name={`points[${index}].y`}>
                      {(subField) => (
                        <TextField
                          placeholder="y"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          onBlur={subField.handleBlur}
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
        <Button onClick={handleSubmit}>QQ</Button>
      </Toolbar>
    </Stack>
  );
};
