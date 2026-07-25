import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MathJax } from "better-react-mathjax";
import { Fragment } from "react";
import z from "zod/v4";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import type { Schema$ReflectionFormData } from "@/types/schemas/form-data/reflection-form";

export const ReflectionForm = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof Schema$ReflectionFormData>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Toolbar>
          <group.AppForm>
            <group.FormResetButton />
          </group.AppForm>
        </Toolbar>
        <Stack>
          <Typography>{`ประเภทของเส้นสะท้อน`}</Typography>
          <group.AppField
            name="type"
            listeners={{
              onChange: ({ value }) => {
                if (value === "linear") {
                  group.setFieldValue("value", "y=x");
                } else {
                  group.setFieldValue("value", "0");
                }
              },
            }}
          >
            {(field) => <field.ReflectionEquationTypeInput />}
          </group.AppField>
        </Stack>
        <group.Subscribe selector={({ values }) => ({ values })}>
          {({ values }) => (
            <Stack spacing={3}>
              {values.type === "linear" && (
                <Stack spacing={0.5}>
                  <Typography>{`สมการเส้นสะท้อน`}</Typography>
                  <group.AppField name="value">
                    {({ state, handleBlur, handleChange }) => (
                      <OutlinedInput
                        fullWidth
                        placeholder="y=-x+2"
                        error={state.meta.errors.length > 0}
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                      />
                    )}
                  </group.AppField>
                </Stack>
              )}
              {values.type === "vertical" && (
                <Stack spacing={0.5}>
                  <Typography>{`เส้นสะท้อน (แนวตั้ง)`}</Typography>
                  <group.AppField name="value">
                    {(field) => <field.NumberTextField />}
                  </group.AppField>
                </Stack>
              )}
              {values.type === "horizontal" && (
                <Stack spacing={0.5}>
                  <Typography>{`เส้นสะท้อน (แนวนอน)`}</Typography>
                  <group.AppField name="value">
                    {(field) => <field.NumberTextField />}
                  </group.AppField>
                </Stack>
              )}
            </Stack>
          )}
        </group.Subscribe>
        <Stack spacing={3}>
          <group.AppField name="points" mode="array">
            {(field) => (
              <Fragment>
                {field.state.value.map((_, index) => (
                  <Stack key={`translate-point-${index}`} spacing={0.5}>
                    <Stack
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography>
                        <MathJax>
                          {index === 0 && `พิกัดที่ ${index + 1} $(x,y)$`}
                          {index !== 0 && `พิกัดที่ ${index + 1}`}
                        </MathJax>
                      </Typography>
                      <field.ArrayItemRemoveButton index={index} />
                    </Stack>
                    <Stack spacing={0.5} direction="row">
                      <group.AppField name={`points[${index}].x`}>
                        {(subField) => <subField.NumberTextField />}
                      </group.AppField>
                      <group.AppField name={`points[${index}].y`}>
                        {(subField) => <subField.NumberTextField />}
                      </group.AppField>
                    </Stack>
                  </Stack>
                ))}
              </Fragment>
            )}
          </group.AppField>
        </Stack>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <group.AppForm>
            <group.FormSubmitButton />
          </group.AppForm>
          <group.AppField name="points">
            {(field) => <field.ArrayItemAddButton />}
          </group.AppField>
        </Toolbar>
      </Stack>
    );
  },
});
