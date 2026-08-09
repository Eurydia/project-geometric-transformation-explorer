import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import type z from "zod/v4";
import { InlineMath } from "@/components/data-display/InlineMath";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import type { Schema$ReflectionFormData } from "@/types/schemas/form-data/reflection-form";

export const ReflectionForm = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof Schema$ReflectionFormData>,
  render: ({ group }) => {
    return (
      <Stack
        component="form"
        spacing={3}
        onSubmit={(event) => event.preventDefault()}
      >
        <Toolbar component="header">
          <group.AppForm>
            <group.FormResetButton />
          </group.AppForm>
        </Toolbar>
        <Stack component="section">
          <Typography component="h2">{`ประเภทของเส้นสะท้อน`}</Typography>
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
            <Stack component="section" spacing={3}>
              {values.type === "linear" && (
                <Stack component="section">
                  <Typography component="h2">{`สมการเส้นสะท้อน`}</Typography>
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
                <Stack component="section">
                  <Typography component="h2">{`เส้นสะท้อน (แนวตั้ง)`}</Typography>
                  <group.AppField name="value">
                    {(field) => <field.NumberTextField />}
                  </group.AppField>
                </Stack>
              )}
              {values.type === "horizontal" && (
                <Stack component="section">
                  <Typography component="h2">{`เส้นสะท้อน (แนวนอน)`}</Typography>
                  <group.AppField name="value">
                    {(field) => <field.NumberTextField />}
                  </group.AppField>
                </Stack>
              )}
            </Stack>
          )}
        </group.Subscribe>
        <Stack component="section" spacing={3}>
          <group.AppField name="points" mode="array">
            {(field) => (
              <Fragment>
                {field.state.value.map((_, index) => (
                  <Stack component="article" key={`translate-point-${index}`}>
                    <Stack
                      component="header"
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography component="h2">
                        <InlineMath>
                          {index === 0
                            ? `พิกัดที่ ${index + 1} $(x,y)$`
                            : `พิกัดที่ ${index + 1}`}
                        </InlineMath>
                      </Typography>
                      <field.ArrayItemRemoveButton index={index} />
                    </Stack>
                    <Stack component="section" spacing={0.5} direction="row">
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
        <Toolbar component="footer" sx={{ justifyContent: "space-between" }}>
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
