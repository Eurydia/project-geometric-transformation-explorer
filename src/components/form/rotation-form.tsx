import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import type z from "zod/v4";
import { InlineMath } from "@/components/data-display/InlineMath";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import type { Schema$RotationFormData } from "@/types/schemas/form-data/rotation-form.schema";

export const RotationForm = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof Schema$RotationFormData>,
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
          <Typography component="h2">{`ทิศทางการหมุน`}</Typography>
          <group.AppField name="direction">
            {(field) => <field.RotationDirectionInput />}
          </group.AppField>
        </Stack>
        <Stack component="section">
          <Typography
            component="h2"
            sx={{ whiteSpace: "normal", textWrap: "wrap" }}
          >
            {`ขนาดของมุมที่หมุน (องศา)`}
          </Typography>
          <group.AppField name="angle">
            {(field) => (
              <Stack component="section" spacing={0.5}>
                <field.NumberTextField />
                <field.RotationAnglePresetInput />
              </Stack>
            )}
          </group.AppField>
        </Stack>
        <Stack component="section">
          <Typography component="h2">
            <InlineMath>{`จุดหมุน $(a,b)$`}</InlineMath>
          </Typography>
          <Stack component="section" spacing={0.5} direction={"row"}>
            <group.AppField name="center.x">
              {(field) => <field.NumberTextField />}
            </group.AppField>
            <group.AppField name="center.y">
              {(field) => <field.NumberTextField />}
            </group.AppField>
          </Stack>
        </Stack>
        <Stack component="section">
          <group.AppField name="points" mode="array">
            {(field) => (
              <Fragment>
                {field.state.value.map((_, index) => (
                  <Stack
                    component="article"
                    key={`point-${index}`}
                    spacing={0.5}
                  >
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
